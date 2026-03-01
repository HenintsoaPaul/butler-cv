import { User, Mail, Phone, MapPin, Linkedin, Globe, FileText } from 'lucide-react'

export default function PersonalInfoForm({ personal, onUpdate }) {
    const fields = [
        { key: 'name', label: 'Full Name', icon: User, placeholder: 'John Doe' },
        { key: 'title', label: 'Professional Title', icon: FileText, placeholder: 'Senior Software Engineer' },
        { key: 'email', label: 'Email', icon: Mail, placeholder: 'john@example.com', type: 'email' },
        { key: 'phone', label: 'Phone', icon: Phone, placeholder: '+1 (555) 123-4567', type: 'tel' },
        { key: 'location', label: 'Location', icon: MapPin, placeholder: 'San Francisco, CA' },
        { key: 'linkedin', label: 'LinkedIn', icon: Linkedin, placeholder: 'linkedin.com/in/johndoe' },
        { key: 'website', label: 'Website', icon: Globe, placeholder: 'johndoe.dev' },
    ]

    return (
        <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {fields.map(({ key, label, icon: Icon, placeholder, type }) => (
                    <div key={key} className={key === 'name' || key === 'title' ? 'sm:col-span-2' : ''}>
                        <label className="flex items-center gap-1.5 text-xs font-medium text-surface-500 mb-1">
                            <Icon size={13} />
                            {label}
                        </label>
                        <input
                            type={type || 'text'}
                            value={personal[key] || ''}
                            onChange={e => onUpdate(key, e.target.value)}
                            placeholder={placeholder}
                            className="w-full px-3 py-2 text-sm bg-white border border-surface-200 rounded-lg
                         hover:border-surface-300 focus:border-primary-400
                         transition-smooth placeholder:text-surface-300"
                        />
                    </div>
                ))}
            </div>
            <div>
                <label className="flex items-center gap-1.5 text-xs font-medium text-surface-500 mb-1">
                    <FileText size={13} />
                    Professional Summary
                </label>
                <textarea
                    value={personal.summary || ''}
                    onChange={e => onUpdate('summary', e.target.value)}
                    placeholder="Brief summary of your professional background..."
                    rows={3}
                    className="w-full px-3 py-2 text-sm bg-white border border-surface-200 rounded-lg
                     hover:border-surface-300 focus:border-primary-400
                     transition-smooth placeholder:text-surface-300 resize-none"
                />
            </div>
        </div>
    )
}
