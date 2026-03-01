import { useState, useEffect, useCallback, useRef } from 'react'
import { defaultCv, generateId } from '../data/defaultCv'

const STORAGE_KEY = 'butler-cv-data'
const SAVE_DELAY = 500

function loadFromStorage() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
            return JSON.parse(stored)
        }
    } catch (e) {
        console.warn('Failed to load CV data from localStorage:', e)
    }
    return defaultCv
}

export function useCvStore() {
    const [cv, setCv] = useState(loadFromStorage)
    const [saveStatus, setSaveStatus] = useState('saved') // 'saved' | 'saving' | 'error'
    const saveTimerRef = useRef(null)

    // Autosave with debounce
    useEffect(() => {
        if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
        setSaveStatus('saving')

        saveTimerRef.current = setTimeout(() => {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(cv))
                setSaveStatus('saved')
            } catch (e) {
                console.error('Failed to save CV data:', e)
                setSaveStatus('error')
            }
        }, SAVE_DELAY)

        return () => {
            if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
        }
    }, [cv])

    const updatePersonal = useCallback((field, value) => {
        setCv(prev => ({
            ...prev,
            personal: { ...prev.personal, [field]: value },
        }))
    }, [])

    const updateSection = useCallback((sectionId, updates) => {
        setCv(prev => ({
            ...prev,
            sections: prev.sections.map(s =>
                s.id === sectionId ? { ...s, ...updates } : s
            ),
        }))
    }, [])

    const addEntry = useCallback((sectionId, entry) => {
        setCv(prev => ({
            ...prev,
            sections: prev.sections.map(s =>
                s.id === sectionId
                    ? { ...s, entries: [...s.entries, { ...entry, id: generateId() }] }
                    : s
            ),
        }))
    }, [])

    const updateEntry = useCallback((sectionId, entryId, updates) => {
        setCv(prev => ({
            ...prev,
            sections: prev.sections.map(s =>
                s.id === sectionId
                    ? {
                        ...s,
                        entries: s.entries.map(e =>
                            e.id === entryId ? { ...e, ...updates } : e
                        ),
                    }
                    : s
            ),
        }))
    }, [])

    const removeEntry = useCallback((sectionId, entryId) => {
        setCv(prev => ({
            ...prev,
            sections: prev.sections.map(s =>
                s.id === sectionId
                    ? { ...s, entries: s.entries.filter(e => e.id !== entryId) }
                    : s
            ),
        }))
    }, [])

    const reorderSections = useCallback((newOrder) => {
        setCv(prev => ({
            ...prev,
            sections: newOrder,
        }))
    }, [])

    const toggleSectionVisibility = useCallback((sectionId) => {
        setCv(prev => ({
            ...prev,
            sections: prev.sections.map(s =>
                s.id === sectionId ? { ...s, visible: !s.visible } : s
            ),
        }))
    }, [])

    const setTemplate = useCallback((templateId) => {
        setCv(prev => ({ ...prev, templateId }))
    }, [])

    const resetCv = useCallback(() => {
        setCv(defaultCv)
    }, [])

    return {
        cv,
        saveStatus,
        updatePersonal,
        updateSection,
        addEntry,
        updateEntry,
        removeEntry,
        reorderSections,
        toggleSectionVisibility,
        setTemplate,
        resetCv,
    }
}
