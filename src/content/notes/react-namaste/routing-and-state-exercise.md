---
title: "Routing and State Exercise"
slug: "routing-and-state-exercise"
description: "Build nested routes, detail pages, and shared app state."
track: "React / Namaste React"
priority: "Important"
---

# Routing and State Exercise

Build a small notes dashboard with routes.

This tests React Router, params, layout routes, and state placement.

## Requirements

Routes:

```text
/notes
/notes/:noteId
/settings
```

The app should:

- show notes list,
- open note details,
- highlight selected note,
- show a shared layout,
- handle missing note id,
- preserve search/filter state where appropriate.

## Component structure

```text
App
NotesLayout
NotesList
NoteDetails
Settings
NotFound
```

## Route params

```jsx
function NoteDetails() {
  const { noteId } = useParams()
  // load or find note by noteId
}
```

## What to practice

- nested routes,
- route params,
- layout components,
- not found state,
- where shared state should live,
- when URL should store state.

## Interview angle

Explain that route state belongs in the URL when users should be able to refresh, share, or bookmark it. Temporary UI state can stay inside React component state.

