import { Plus, Trash2 } from 'lucide-react'

const emptyEntry = {
    name: '',
    description: '',
    technologies: '',
    link: '',
}

export default function ProjectsForm({ entries, onAdd, onUpdate, onRemove }) {
    return (
        <div className="space-y-4">
            {entries.map((entry) => (
                <div
                    key={entry.id}
                    className="relative p-4 bg-surface-50 border border-surface-200 rounded-xl
                     animate-fade-in"
                >
                    <button
                        onClick={() => onRemove(entry.id)}
                        className="absolute top-3 right-3 p-1.5 text-surface-400 hover:text-danger
                       hover:bg-red-50 rounded-lg transition-smooth"
                        title="Remove entry"
                    >
                        <Trash2 size={14} />
                    </button>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-8">
                        <input
                            value={entry.name || ''}
                            onChange={e => onUpdate(entry.id, { name: e.target.value })}
                            placeholder="Project Name"
                            className="sm:col-span-2 px-3 py-2 text-sm font-medium bg-white border border-surface-200
                         rounded-lg hover:border-surface-300 transition-smooth placeholder:text-surface-300"
                        />
                        <input
                            value={entry.technologies || ''}
                            onChange={e => onUpdate(entry.id, { technologies: e.target.value })}
                            placeholder="Technologies (e.g., React, Node.js)"
                            className="px-3 py-2 text-sm bg-white border border-surface-200 rounded-lg
                         hover:border-surface-300 transition-smooth placeholder:text-surface-300"
                        />
                        <input
                            value={entry.link || ''}
                            onChange={e => onUpdate(entry.id, { link: e.target.value })}
                            placeholder="Link (optional)"
                            className="px-3 py-2 text-sm bg-white border border-surface-200 rounded-lg
                         hover:border-surface-300 transition-smooth placeholder:text-surface-300"
                        />
                    </div>
                    <textarea
                        value={entry.description || ''}
                        onChange={e => onUpdate(entry.id, { description: e.target.value })}
                        placeholder="Brief project description..."
                        rows={2}
                        className="w-full mt-3 px-3 py-2 text-sm bg-white border border-surface-200 rounded-lg
                       hover:border-surface-300 transition-smooth placeholder:text-surface-300
                       resize-none"
                    />
                </div>
            ))}

            <button
                onClick={() => onAdd(emptyEntry)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm
                   font-medium text-primary-600 bg-primary-50 hover:bg-primary-100
                   border border-dashed border-primary-200 rounded-xl
                   transition-smooth"
            >
                <Plus size={16} />
                Add Project
            </button>
        </div>
    )
}
