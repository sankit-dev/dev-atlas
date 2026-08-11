import { useEffect, useRef, useState } from 'react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import type { Note } from './data/tracks'
import { Contribute } from './components/Contribute'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Library } from './components/Library'
import { NoteReader } from './components/NoteReader'
import { PageShell } from './components/PageShell'
import { Roadmap } from './components/Roadmap'
import { Statement } from './components/Statement'
import { tracks } from './data/tracks'

export type Theme = 'light' | 'dark'

const themeStorageKey = 'learning-atlas-theme'

function getHashRoute() {
  if (typeof window === 'undefined') {
    return ''
  }

  return window.location.hash
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
  const [theme, setTheme] = useState<Theme>(getInitialTheme)
  const [hashRoute, setHashRoute] = useState(getHashRoute)
  const [transitionTitle, setTransitionTitle] = useState<string | null>(null)
  const transitionTimers = useRef<number[]>([])

  const activeNoteSlug = hashRoute.startsWith('#/notes/')
    ? hashRoute.replace('#/notes/', '')
    : null
  const activeNoteMatch = tracks
    .flatMap((track) =>
      track.topics.map((note) => ({
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

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem(themeStorageKey, theme)
  }, [theme])

  useEffect(() => {
    const syncRoute = () => setHashRoute(getHashRoute())

    window.addEventListener('hashchange', syncRoute)

    return () => window.removeEventListener('hashchange', syncRoute)
  }, [])

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
    <PageShell>
      <Header
        theme={theme}
        onThemeToggle={() =>
          setTheme((currentTheme) =>
            currentTheme === 'light' ? 'dark' : 'light',
          )
        }
      />
      {activeNoteMatch ? (
        <NoteReader
          note={activeNoteMatch.note}
          track={activeNoteMatch.track}
          nextTrack={nextTrack}
          onNavigateNote={navigateToNote}
        />
      ) : (
        <main>
          <Hero />
          <Statement />
          <Library />
          <Roadmap />
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
    </PageShell>
  )
}

export default App
