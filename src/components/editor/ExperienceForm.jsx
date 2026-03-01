import { Plus, Trash2 } from 'lucide-react'

const emptyEntry = {
    company: '',
    role: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
}

export default function ExperienceForm({ entries, onAdd, onUpdate, onRemove }) {
    return (
        <div className="space-y-4">
            {entries.map((entry, index) => (
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
                            value={entry.role || ''}
                            onChange={e => onUpdate(entry.id, { role: e.target.value })}
                            placeholder="Job Title"
                            className="sm:col-span-2 px-3 py-2 text-sm font-medium bg-white border border-surface-200
                         rounded-lg hover:border-surface-300 transition-smooth placeholder:text-surface-300"
                        />
                        <input
                            value={entry.company || ''}
                            onChange={e => onUpdate(entry.id, { company: e.target.value })}
                            placeholder="Company"
                            className="px-3 py-2 text-sm bg-white border border-surface-200 rounded-lg
                         hover:border-surface-300 transition-smooth placeholder:text-surface-300"
                        />
                        <input
                            value={entry.location || ''}
                            onChange={e => onUpdate(entry.id, { location: e.target.value })}
                            placeholder="Location"
                            className="px-3 py-2 text-sm bg-white border border-surface-200 rounded-lg
                         hover:border-surface-300 transition-smooth placeholder:text-surface-300"
                        />
                        <div className="flex items-center gap-2">
                            <input
                                type="month"
                                value={entry.startDate || ''}
                                onChange={e => onUpdate(entry.id, { startDate: e.target.value })}
                                className="flex-1 px-3 py-2 text-sm bg-white border border-surface-200 rounded-lg
                           hover:border-surface-300 transition-smooth"
                            />
                            <span className="text-surface-400 text-xs">to</span>
                            <input
                                type="month"
                                value={entry.endDate || ''}
                                onChange={e => onUpdate(entry.id, { endDate: e.target.value })}
                                disabled={entry.current}
                                className="flex-1 px-3 py-2 text-sm bg-white border border-surface-200 rounded-lg
                           hover:border-surface-300 transition-smooth disabled:opacity-40
                           disabled:cursor-not-allowed"
                            />
                        </div>
                        <label className="flex items-center gap-2 text-sm text-surface-600 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={entry.current || false}
                                onChange={e => onUpdate(entry.id, { current: e.target.checked, endDate: '' })}
                                className="w-4 h-4 rounded border-surface-300 text-primary-600
                           focus:ring-primary-500 accent-primary-600"
                            />
                            Currently working here
                        </label>
                    </div>
                    <textarea
                        value={entry.description || ''}
                        onChange={e => onUpdate(entry.id, { description: e.target.value })}
                        placeholder="Key achievements and responsibilities (one per line)..."
                        rows={3}
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
                Add Experience
            </button>
        </div>
    )
}
