// src/Settings.js
import { useEffect, useState } from 'react'

const STORAGE_KEY = 'in5320.settings'

const DEFAULTS = {
  datasetId: 'aLpVgfXiz0f',   // Population
  orgUnit: 'KiheEgvUZ0i',     // Bo
  period: '2020',
}

export function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : {}
    return { ...DEFAULTS, ...parsed }
  } catch {
    return { ...DEFAULTS }
  }
}

export function saveSettings(next) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
}

export function useSettings() {
  const [settings, setSettings] = useState(loadSettings())

  // persist to localStorage whenever something changes
  useEffect(() => { saveSettings(settings) }, [settings])

  return [settings, setSettings] // {datasetId, orgUnit, period}, setSettings
}
