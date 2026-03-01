import { Plus, Trash2 } from 'lucide-react'

const emptyEntry = {
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    description: '',
}

export default function EducationForm({ entries, onAdd, onUpdate, onRemove }) {
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
                            value={entry.institution || ''}
                            onChange={e => onUpdate(entry.id, { institution: e.target.value })}
                            placeholder="Institution"
                            className="sm:col-span-2 px-3 py-2 text-sm font-medium bg-white border border-surface-200
                         rounded-lg hover:border-surface-300 transition-smooth placeholder:text-surface-300"
                        />
                        <input
                            value={entry.degree || ''}
                            onChange={e => onUpdate(entry.id, { degree: e.target.value })}
                            placeholder="Degree (e.g., Bachelor of Science)"
                            className="px-3 py-2 text-sm bg-white border border-surface-200 rounded-lg
                         hover:border-surface-300 transition-smooth placeholder:text-surface-300"
                        />
                        <input
                            value={entry.field || ''}
                            onChange={e => onUpdate(entry.id, { field: e.target.value })}
                            placeholder="Field of Study"
                            className="px-3 py-2 text-sm bg-white border border-surface-200 rounded-lg
                         hover:border-surface-300 transition-smooth placeholder:text-surface-300"
                        />
                        <input
                            type="month"
                            value={entry.startDate || ''}
                            onChange={e => onUpdate(entry.id, { startDate: e.target.value })}
                            className="px-3 py-2 text-sm bg-white border border-surface-200 rounded-lg
                         hover:border-surface-300 transition-smooth"
                        />
                        <input
                            type="month"
                            value={entry.endDate || ''}
                            onChange={e => onUpdate(entry.id, { endDate: e.target.value })}
                            className="px-3 py-2 text-sm bg-white border border-surface-200 rounded-lg
                         hover:border-surface-300 transition-smooth"
                        />
                    </div>
                    <textarea
                        value={entry.description || ''}
                        onChange={e => onUpdate(entry.id, { description: e.target.value })}
                        placeholder="Additional details (GPA, honors, coursework)..."
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
                Add Education
            </button>
        </div>
    )
}
