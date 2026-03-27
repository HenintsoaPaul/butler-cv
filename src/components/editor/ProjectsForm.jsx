import { useState } from 'react'
import { Plus, Trash2, ChevronDown, ChevronRight, FolderOpen } from 'lucide-react'

const emptyEntry = {
    name: '',
    description: '',
    technologies: '',
    link: '',
}

export default function ProjectsForm({ entries, onAdd, onUpdate, onRemove }) {
    const [expandedId, setExpandedId] = useState(entries[0]?.id || null)

    const handleToggle = (id) => {
        setExpandedId(expandedId === id ? null : id)
    }

    const handleAdd = () => {
        const id = crypto.randomUUID()
        onAdd({ ...emptyEntry, id })
        setExpandedId(id)
    }

    return (
        <div className="space-y-3">
            {entries.map((entry) => (
                <div
                    key={entry.id}
                    className={`border rounded-xl overflow-hidden transition-all duration-200 ${
                        expandedId === entry.id ? 'border-primary-300 ring-1 ring-primary-100' : 'border-surface-200'
                    }`}
                >
                    {/* Header Summary */}
                    <div
                        className={`flex items-center p-3 cursor-pointer hover:bg-surface-50 transition-colors ${
                            expandedId === entry.id ? 'bg-primary-50/30' : 'bg-white'
                        }`}
                        onClick={() => handleToggle(entry.id)}
                    >
                        <div className={`mr-3 p-1.5 rounded-lg ${entry.name ? 'text-primary-600 bg-primary-50' : 'text-surface-300'}`}>
                            <FolderOpen size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className={`text-sm font-semibold truncate ${entry.name ? 'text-surface-900' : 'text-surface-400'}`}>
                                {entry.name || 'New Project'}
                            </h4>
                            {entry.technologies && (
                                <p className="text-xs text-surface-500 truncate">{entry.technologies}</p>
                            )}
                        </div>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    onRemove(entry.id)
                                }}
                                className="p-1.5 text-surface-400 hover:text-danger hover:bg-red-50 rounded-lg transition-smooth"
                                title="Remove entry"
                            >
                                <Trash2 size={14} />
                            </button>
                            <div className="text-surface-400 ml-1">
                                {expandedId === entry.id ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                            </div>
                        </div>
                    </div>

                    {/* Form Fields */}
                    {expandedId === entry.id && (
                        <div className="p-4 bg-white border-t border-surface-100 animate-fade-in">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="sm:col-span-2">
                                    <label className="block text-[10px] font-bold uppercase tracking-wider text-surface-400 mb-1 ml-1">Project Name</label>
                                    <input
                                        value={entry.name || ''}
                                        onChange={e => onUpdate(entry.id, { name: e.target.value })}
                                        placeholder="e.g. Personal Portfolio"
                                        className="w-full px-3 py-2 text-sm bg-surface-50 border border-surface-200 rounded-lg focus:bg-white transition-smooth"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-wider text-surface-400 mb-1 ml-1">Technologies</label>
                                    <input
                                        value={entry.technologies || ''}
                                        onChange={e => onUpdate(entry.id, { technologies: e.target.value })}
                                        placeholder="e.g. React, Tailwind"
                                        className="w-full px-3 py-2 text-sm bg-surface-50 border border-surface-200 rounded-lg focus:bg-white transition-smooth"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-wider text-surface-400 mb-1 ml-1">Link</label>
                                    <input
                                        value={entry.link || ''}
                                        onChange={e => onUpdate(entry.id, { link: e.target.value })}
                                        placeholder="e.g. github.com/..."
                                        className="w-full px-3 py-2 text-sm bg-surface-50 border border-surface-200 rounded-lg focus:bg-white transition-smooth"
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-[10px] font-bold uppercase tracking-wider text-surface-400 mb-1 ml-1">Description</label>
                                    <textarea
                                        value={entry.description || ''}
                                        onChange={e => onUpdate(entry.id, { description: e.target.value })}
                                        placeholder="Brief project description..."
                                        rows={2}
                                        className="w-full px-3 py-2 text-sm bg-surface-50 border border-surface-200 rounded-lg focus:bg-white transition-smooth resize-none"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ))}

            <button
                onClick={handleAdd}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm
                   font-semibold text-primary-600 bg-primary-50/50 hover:bg-primary-50
                   border border-dashed border-primary-200 rounded-xl
                   transition-smooth"
            >
                <Plus size={16} />
                Add Project
            </button>
        </div>
    )
}
