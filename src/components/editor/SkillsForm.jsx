import { useState } from 'react'
import { Plus, X, Trash2 } from 'lucide-react'

export default function SkillsForm({ entries, onAdd, onUpdate, onRemove }) {
    const [newSkill, setNewSkill] = useState({})
    const [newCategory, setNewCategory] = useState('')

    const handleAddSkill = (entryId, skill) => {
        if (!skill.trim()) return
        const entry = entries.find(e => e.id === entryId)
        if (entry && !entry.skills.includes(skill.trim())) {
            onUpdate(entryId, { skills: [...entry.skills, skill.trim()] })
        }
        setNewSkill(prev => ({ ...prev, [entryId]: '' }))
    }

    const handleRemoveSkill = (entryId, skillToRemove) => {
        const entry = entries.find(e => e.id === entryId)
        if (entry) {
            onUpdate(entryId, { skills: entry.skills.filter(s => s !== skillToRemove) })
        }
    }

    const handleAddCategory = () => {
        if (!newCategory.trim()) return
        onAdd({ category: newCategory.trim(), skills: [] })
        setNewCategory('')
    }

    return (
        <div className="space-y-4">
            {entries.map((entry) => (
                <div
                    key={entry.id}
                    className="p-4 bg-surface-50 border border-surface-200 rounded-xl animate-fade-in"
                >
                    <div className="flex items-center justify-between mb-3">
                        <input
                            value={entry.category || ''}
                            onChange={e => onUpdate(entry.id, { category: e.target.value })}
                            placeholder="Category name"
                            className="px-2 py-1 text-sm font-medium bg-transparent border-b border-transparent
                         hover:border-surface-300 focus:border-primary-400
                         transition-smooth placeholder:text-surface-300"
                        />
                        <button
                            onClick={() => onRemove(entry.id)}
                            className="p-1.5 text-surface-400 hover:text-danger hover:bg-red-50
                         rounded-lg transition-smooth"
                        >
                            <Trash2 size={14} />
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                        {(entry.skills || []).map(skill => (
                            <span
                                key={skill}
                                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium
                           bg-primary-50 text-primary-700 rounded-full"
                            >
                                {skill}
                                <button
                                    onClick={() => handleRemoveSkill(entry.id, skill)}
                                    className="p-0.5 hover:bg-primary-100 rounded-full transition-smooth"
                                >
                                    <X size={11} />
                                </button>
                            </span>
                        ))}
                    </div>

                    <div className="flex gap-2">
                        <input
                            value={newSkill[entry.id] || ''}
                            onChange={e => setNewSkill(prev => ({ ...prev, [entry.id]: e.target.value }))}
                            onKeyDown={e => {
                                if (e.key === 'Enter') {
                                    e.preventDefault()
                                    handleAddSkill(entry.id, newSkill[entry.id] || '')
                                }
                            }}
                            placeholder="Add a skill..."
                            className="flex-1 px-3 py-1.5 text-sm bg-white border border-surface-200 rounded-lg
                         hover:border-surface-300 transition-smooth placeholder:text-surface-300"
                        />
                        <button
                            onClick={() => handleAddSkill(entry.id, newSkill[entry.id] || '')}
                            className="px-3 py-1.5 text-sm text-primary-600 bg-white border border-surface-200
                         rounded-lg hover:bg-primary-50 transition-smooth"
                        >
                            <Plus size={14} />
                        </button>
                    </div>
                </div>
            ))}

            <div className="flex gap-2">
                <input
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            e.preventDefault()
                            handleAddCategory()
                        }
                    }}
                    placeholder="New category name..."
                    className="flex-1 px-3 py-2 text-sm bg-white border border-surface-200 rounded-lg
                     hover:border-surface-300 transition-smooth placeholder:text-surface-300"
                />
                <button
                    onClick={handleAddCategory}
                    className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-primary-600
                     bg-primary-50 hover:bg-primary-100 border border-dashed border-primary-200
                     rounded-xl transition-smooth"
                >
                    <Plus size={16} />
                    Add Category
                </button>
            </div>
        </div>
    )
}
