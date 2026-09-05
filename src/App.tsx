import { useEffect, useRef, useState } from 'react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { Analytics } from '@vercel/analytics/react'
import type { Note } from './data/tracks'
import { Contribute } from './components/Contribute'
import { DsaCourse } from './components/DsaCourse'
import { Footer } from './components/Footer'
import { FocusedLearningSection } from './components/FocusedLearningSection'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Library } from './components/Library'
import { NoteReader } from './components/NoteReader'
import { PageShell } from './components/PageShell'
import { Roadmap } from './components/Roadmap'
import { flattenNotes, tracks } from './data/tracks'
import {
  getCurrentLearningStep,
  getLastCompletedNote,
  getOverallProgress,
} from './data/learningPath'
import { authClient } from './lib/auth'
import {
  fetchCompletedNoteSlugs,
  markNoteComplete,
  syncCompletedNoteSlugs,
} from './lib/noteProgress'

export type Theme = 'light' | 'dark'

const themeStorageKey = 'learning-atlas-theme'
const completedNotesStorageKey = 'learning-atlas-completed-notes'

function getHashRoute() {
  if (typeof window === 'undefined') {
    return ''
  }

  return window.location.hash
}

function getNoteSlugFromHash(hashRoute: string) {
  return hashRoute.startsWith('#/notes/')
    ? hashRoute.replace('#/notes/', '')
    : null
}

function getDsaQuestIdFromHash(hashRoute: string) {
  if (!hashRoute.startsWith('#/dsa/')) {
    return null
  }

  const questId = hashRoute.replace('#/dsa/', '').trim()
  return questId || null
}

function isDsaRoute(hashRoute: string) {
  return hashRoute === '#/dsa' || hashRoute.startsWith('#/dsa/')
}

function isLibraryRoute(hashRoute: string) {
  return hashRoute === '#/library'
}

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'light'
  }

  const savedTheme = window.localStorage.getItem(themeStorageKey)

  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function getInitialCompletedNotes() {
  if (typeof window === 'undefined') {
    return new Set<string>()
  }

  try {
    const savedNotes = window.localStorage.getItem(completedNotesStorageKey)

    if (!savedNotes) {
      return new Set<string>()
    }

    const parsedNotes: unknown = JSON.parse(savedNotes)

    if (!Array.isArray(parsedNotes)) {
      return new Set<string>()
    }

    return new Set(
      parsedNotes.filter((note): note is string => typeof note === 'string'),
    )
  } catch {
    return new Set<string>()
  }
}

function playTransitionTone() {
  const audioWindow = window as Window &
    typeof globalThis & {
      webkitAudioContext?: typeof AudioContext
    }
  const AudioContextConstructor =
    audioWindow.AudioContext || audioWindow.webkitAudioContext

  if (!AudioContextConstructor) {
    return
  }

  const audioContext = new AudioContextConstructor()
  const gain = audioContext.createGain()
  gain.gain.setValueAtTime(0.0001, audioContext.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.045, audioContext.currentTime + 0.08)
  gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 1.2)
  gain.connect(audioContext.destination)

  ;[261.63, 329.63, 392].forEach((frequency, index) => {
    const oscillator = audioContext.createOscillator()
    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)
    oscillator.detune.setValueAtTime(index * 4, audioContext.currentTime)
    oscillator.connect(gain)
    oscillator.start(audioContext.currentTime + index * 0.04)
    oscillator.stop(audioContext.currentTime + 1.25)
  })

  window.setTimeout(() => {
    void audioContext.close()
  }, 1400)
}

function scrollToPageTop() {
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}

type NoteNavigationOptions = {
  animateCourseSwitch?: boolean
  transitionTitle?: string
}

function App() {
  const { data: session } = authClient.useSession()
  const [theme, setTheme] = useState<Theme>(getInitialTheme)
  const [hashRoute, setHashRoute] = useState(getHashRoute)
  const [completedNoteSlugs, setCompletedNoteSlugs] = useState(
    getInitialCompletedNotes,
  )
  const [transitionTitle, setTransitionTitle] = useState<string | null>(null)
  const transitionTimers = useRef<number[]>([])
  const hasLoadedRemoteProgress = useRef(false)
  const syncedProgressSignature = useRef('')
  const savedRemoteNoteSlugs = useRef(new Set<string>())

  const activeNoteSlug = getNoteSlugFromHash(hashRoute)
  const activeDsaQuestId = getDsaQuestIdFromHash(hashRoute)
  const isDsa = isDsaRoute(hashRoute)
  const isLibrary = isLibraryRoute(hashRoute)
  const activeNoteMatch = tracks
    .flatMap((track) =>
      flattenNotes(track.topics).map((note) => ({
        note,
        track,
      })),
    )
    .find(({ note }) => note.slug === activeNoteSlug)
  const activeTrackIndex = activeNoteMatch
    ? tracks.findIndex((track) => track.title === activeNoteMatch.track.title)
    : -1
  const nextTrack =
    activeTrackIndex >= 0 ? tracks[activeTrackIndex + 1] : undefined
  const currentLearningStep = getCurrentLearningStep(completedNoteSlugs)
  const lastCompletedNote = getLastCompletedNote(completedNoteSlugs)
  const overallProgress = getOverallProgress(completedNoteSlugs)

  const navigateToNote = (
    targetNote: Note,
    options: NoteNavigationOptions = {},
  ) => {
    transitionTimers.current.forEach((timer) => window.clearTimeout(timer))

    if (targetNote.slug === activeNoteSlug) {
      setTransitionTitle(null)
      scrollToPageTop()
      return
    }

    if (!options.animateCourseSwitch) {
      setTransitionTitle(null)
      window.location.hash = `#/notes/${targetNote.slug}`
      scrollToPageTop()
      return
    }

    setTransitionTitle(options.transitionTitle ?? targetNote.title)
    playTransitionTone()

    const routeTimer = window.setTimeout(() => {
      window.location.hash = `#/notes/${targetNote.slug}`
      scrollToPageTop()
    }, 420)

    const clearTimer = window.setTimeout(() => {
      setTransitionTitle(null)
      scrollToPageTop()
    }, 980)

    transitionTimers.current = [routeTimer, clearTimer]
  }

  const completeNote = (noteSlug: string) => {
    setCompletedNoteSlugs((currentSlugs) => {
      if (currentSlugs.has(noteSlug)) {
        return currentSlugs
      }

      return new Set(currentSlugs).add(noteSlug)
    })

    if (session?.user && !savedRemoteNoteSlugs.current.has(noteSlug)) {
      savedRemoteNoteSlugs.current.add(noteSlug)
      void markNoteComplete(noteSlug).catch(() => {
        savedRemoteNoteSlugs.current.delete(noteSlug)
      })
    }
  }

  const navigateToDsaQuest = (questId: string) => {
    window.location.hash = `#/dsa/${questId}`
    scrollToPageTop()
  }

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem(themeStorageKey, theme)
  }, [theme])

  useEffect(() => {
    window.localStorage.setItem(
      completedNotesStorageKey,
      JSON.stringify([...completedNoteSlugs]),
    )
  }, [completedNoteSlugs])

  useEffect(() => {
    const syncRoute = () => {
      const nextHashRoute = getHashRoute()
      setHashRoute(nextHashRoute)
    }

    window.addEventListener('hashchange', syncRoute)

    return () => window.removeEventListener('hashchange', syncRoute)
  }, [session?.user])

  useEffect(() => {
    if (!session?.user || hasLoadedRemoteProgress.current) {
      return
    }

    hasLoadedRemoteProgress.current = true

    void fetchCompletedNoteSlugs()
      .then((remoteCompletedNoteSlugs) => {
        remoteCompletedNoteSlugs.forEach((noteSlug) => {
          savedRemoteNoteSlugs.current.add(noteSlug)
        })

        setCompletedNoteSlugs((currentSlugs) => {
          const nextSlugs = new Set(currentSlugs)
          remoteCompletedNoteSlugs.forEach((noteSlug) => nextSlugs.add(noteSlug))
          return nextSlugs
        })
      })
      .catch(() => undefined)
  }, [session?.user])

  useEffect(() => {
    if (!session?.user || completedNoteSlugs.size === 0) {
      return
    }

    const progressSignature = [...completedNoteSlugs].sort().join('|')

    if (syncedProgressSignature.current === progressSignature) {
      return
    }

    syncedProgressSignature.current = progressSignature

    void syncCompletedNoteSlugs(completedNoteSlugs).catch(() => {
      syncedProgressSignature.current = ''
    })
  }, [completedNoteSlugs, session?.user])

  useEffect(() => {
    if (activeNoteSlug) {
      scrollToPageTop()
    }
  }, [activeNoteSlug])

  useEffect(
    () => () => {
      transitionTimers.current.forEach((timer) => window.clearTimeout(timer))
    },
    [],
  )

  return (
    <PageShell variant={isDsa ? 'dsa' : 'default'}>
      <Header
        theme={theme}
        onThemeToggle={() =>
          setTheme((currentTheme) =>
            currentTheme === 'light' ? 'dark' : 'light',
          )
        }
      />
      {isDsa ? (
        <DsaCourse
          activeQuestId={activeDsaQuestId}
          onNavigateQuest={navigateToDsaQuest}
        />
      ) : isLibrary ? (
        <main>
          <Library completedNoteSlugs={completedNoteSlugs} />
          <Footer />
        </main>
      ) : activeNoteMatch ? (
        <NoteReader
          note={activeNoteMatch.note}
          track={activeNoteMatch.track}
          completedNoteSlugs={completedNoteSlugs}
          nextTrack={nextTrack}
          onCompleteNote={completeNote}
          onNavigateNote={navigateToNote}
        />
      ) : (
        <main>
          <Hero
            completedNoteSlugs={completedNoteSlugs}
            currentStep={currentLearningStep}
            lastCompletedNote={lastCompletedNote}
            overallProgress={overallProgress}
          />
          <FocusedLearningSection />
          <Roadmap completedNoteSlugs={completedNoteSlugs} />
          <Contribute />
          <Footer />
        </main>
      )}
      {transitionTitle && (
        <div className="note-route-transition" aria-live="polite">
          <div className="note-route-transition__title">{transitionTitle}</div>
        </div>
      )}
      <SpeedInsights />
      <Analytics />
    </PageShell>
  )
}

export default App
