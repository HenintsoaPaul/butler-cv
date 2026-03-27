import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useCvStore } from './useCvStore'
import { defaultCv } from '../data/defaultCv'

describe('useCvStore', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        localStorage.clear()
    })

    it('should initialize with default CV data if storage is empty', () => {
        localStorage.getItem.mockReturnValue(null)
        const { result } = renderHook(() => useCvStore())
        expect(result.current.cv).toEqual(defaultCv)
    })

    it('should update personal field', () => {
        const { result } = renderHook(() => useCvStore())
        
        act(() => {
            result.current.updatePersonal('name', 'John Doe')
        })

        expect(result.current.cv.personal.name).toBe('John Doe')
    })

    it('should update section data', () => {
        const { result } = renderHook(() => useCvStore())
        const sectionId = defaultCv.sections[0].id

        act(() => {
            result.current.updateSection(sectionId, { title: 'Updated Title' })
        })

        const section = result.current.cv.sections.find(s => s.id === sectionId)
        expect(section.title).toBe('Updated Title')
    })

    it('should add an entry to a section', () => {
        const { result } = renderHook(() => useCvStore())
        const sectionId = 'experience'
        const initialCount = result.current.cv.sections.find(s => s.id === sectionId).entries.length

        act(() => {
            result.current.addEntry(sectionId, { company: 'New Company', role: 'Dev' })
        })

        const section = result.current.cv.sections.find(s => s.id === sectionId)
        expect(section.entries).toHaveLength(initialCount + 1)
        expect(section.entries[initialCount].company).toBe('New Company')
    })

    it('should remove an entry from a section', () => {
        const { result } = renderHook(() => useCvStore())
        const sectionId = 'experience'
        const sectionBefore = result.current.cv.sections.find(s => s.id === sectionId)
        const initialCount = sectionBefore.entries.length
        const entryId = sectionBefore.entries[0].id

        // Remove the first entry
        act(() => {
            result.current.removeEntry(sectionId, entryId)
        })

        const sectionAfter = result.current.cv.sections.find(s => s.id === sectionId)
        expect(sectionAfter.entries).toHaveLength(initialCount - 1)
        expect(sectionAfter.entries.find(e => e.id === entryId)).toBeUndefined()
    })

    it('should toggle section visibility', () => {
        const { result } = renderHook(() => useCvStore())
        const sectionId = 'experience'

        const initialVisibility = result.current.cv.sections.find(s => s.id === sectionId).visible

        act(() => {
            result.current.toggleSectionVisibility(sectionId)
        })

        expect(result.current.cv.sections.find(s => s.id === sectionId).visible).toBe(!initialVisibility)
    })

    it('should reset CV to default', () => {
        const { result } = renderHook(() => useCvStore())

        act(() => {
            result.current.updatePersonal('name', 'Changed Name')
            result.current.resetCv()
        })

        expect(result.current.cv.personal.name).toBe(defaultCv.personal.name)
    })
})
