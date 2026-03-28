import { Layout, Columns } from 'lucide-react'

const templates = [
    {
        id: 'classic',
        name: 'Classic',
        description: 'Clean & ATS-friendly',
        icon: Layout,
        preview: (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', padding: '6px' }}>
                <div style={{ height: '8px', background: '#1e293b', borderRadius: '2px', width: '60%', margin: '0 auto' }} />
                <div style={{ height: '4px', background: '#94a3b8', borderRadius: '1px', width: '40%', margin: '0 auto' }} />
                <div style={{ height: '1px', background: '#e2e8f0', margin: '3px 0' }} />
                <div style={{ height: '4px', background: '#cbd5e1', borderRadius: '1px', width: '90%' }} />
                <div style={{ height: '4px', background: '#e2e8f0', borderRadius: '1px', width: '85%' }} />
                <div style={{ height: '4px', background: '#e2e8f0', borderRadius: '1px', width: '70%' }} />
                <div style={{ height: '1px', background: '#e2e8f0', margin: '3px 0' }} />
                <div style={{ height: '4px', background: '#cbd5e1', borderRadius: '1px', width: '80%' }} />
                <div style={{ height: '4px', background: '#e2e8f0', borderRadius: '1px', width: '75%' }} />
            </div>
        ),
    },
    {
        id: 'modern',
        name: 'Modern',
        description: 'Sidebar & color accents',
        icon: Columns,
        preview: (
            <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
                <div style={{ width: '30%', background: '#0f172a', padding: '6px 4px' }}>
                    <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '1px', width: '80%', marginBottom: '4px' }} />
                    <div style={{ height: '3px', background: '#2563eb', borderRadius: '1px', width: '60%', marginBottom: '6px' }} />
                    <div style={{ height: '3px', background: '#475569', borderRadius: '1px', width: '90%', marginBottom: '2px' }} />
                    <div style={{ height: '3px', background: '#475569', borderRadius: '1px', width: '70%' }} />
                </div>
                <div style={{ flex: 1, padding: '6px 4px' }}>
                    <div style={{ height: '4px', background: '#cbd5e1', borderRadius: '1px', width: '90%', marginBottom: '3px' }} />
                    <div style={{ height: '4px', background: '#e2e8f0', borderRadius: '1px', width: '80%', marginBottom: '3px' }} />
                    <div style={{ height: '1px', background: '#2563eb', marginBottom: '3px' }} />
                    <div style={{ height: '4px', background: '#e2e8f0', borderRadius: '1px', width: '85%', marginBottom: '2px' }} />
                    <div style={{ height: '4px', background: '#e2e8f0', borderRadius: '1px', width: '70%' }} />
                </div>
            </div>
        ),
    },
]

export default function TemplateSelector({ activeTemplate, onSelect }) {
    return (
        <div className="flex gap-3">
            {templates.map(t => (
                <button
                    key={t.id}
                    onClick={() => onSelect(t.id)}
                    className={`group relative flex flex-col items-center gap-1.5 transition-smooth ${activeTemplate === t.id ? '' : 'opacity-60 hover:opacity-90'
                        }`}
                >
                    <div
                        className={`w-[72px] h-[92px] rounded-lg overflow-hidden border-2 transition-smooth ${activeTemplate === t.id
                                ? 'border-primary-500 shadow-md shadow-primary-100'
                                : 'border-surface-200 group-hover:border-surface-300'
                            }`}
                        style={{ background: '#fff' }}
                    >
                        {t.preview}
                    </div>
                    <span className={`text-[10px] font-medium ${activeTemplate === t.id ? 'text-primary-600' : 'text-surface-500'
                        }`}>
                        {t.name}
                    </span>
                </button>
            ))}
        </div>
    )
}
