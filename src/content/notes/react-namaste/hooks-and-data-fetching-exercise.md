---
title: "Hooks and Data Fetching Exercise"
slug: "hooks-and-data-fetching-exercise"
description: "Build loading, error, empty, and success states around API data."
track: "React / Namaste React"
priority: "Must Know"
---

# Hooks and Data Fetching Exercise

Build a users page that fetches data from an API.

This tests `useState`, `useEffect`, conditional rendering, and UI states.

## Requirements

Show:

- loading state,
- error state,
- empty state,
- user list,
- retry button,
- search filter after data loads.

## State design

```js
const [users, setUsers] = useState([])
const [isLoading, setIsLoading] = useState(false)
const [error, setError] = useState(null)
const [search, setSearch] = useState('')
```

## Fetch flow

```js
useEffect(() => {
  async function loadUsers() {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch('/api/users')

      if (!response.ok) {
        throw new Error('Failed to load users')
      }

      const result = await response.json()
      setUsers(result.data)
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  loadUsers()
}, [])
```

## What to explain

- why loading state exists,
- why errors need UI,
- why empty state is different from loading,
- why API response shape matters,
- why derived filtered data does not need separate state.

