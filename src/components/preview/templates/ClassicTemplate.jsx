import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react'

function formatDate(dateStr) {
    if (!dateStr) return ''
    const [year, month] = dateStr.split('-')
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return `${months[parseInt(month) - 1]} ${year}`
}

function SectionTitle({ title }) {
    return (
        <div className="mb-2 mt-4 first:mt-0">
            <h2 style={{
                fontSize: '11pt',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: '#1e293b',
                borderBottom: '1.5px solid #1e293b',
                paddingBottom: '3px',
                marginBottom: '8px',
            }}>
                {title}
            </h2>
        </div>
    )
}

function ExperienceSection({ entries }) {
    return entries.map(entry => (
        <div key={entry.id} style={{ marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: '10.5pt', color: '#1e293b' }}>{entry.role}</strong>
                <span style={{ fontSize: '9pt', color: '#64748b' }}>
                    {formatDate(entry.startDate)} — {entry.current ? 'Present' : formatDate(entry.endDate)}
                </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: '9.5pt', color: '#475569', fontStyle: 'italic' }}>{entry.company}</span>
                {entry.location && (
                    <span style={{ fontSize: '9pt', color: '#94a3b8' }}>{entry.location}</span>
                )}
            </div>
            {entry.description && (
                <ul style={{ marginTop: '4px', paddingLeft: '16px', fontSize: '9.5pt', color: '#334155', lineHeight: '1.5' }}>
                    {entry.description.split('\n').filter(Boolean).map((line, i) => (
                        <li key={i}>{line}</li>
                    ))}
                </ul>
            )}
        </div>
    ))
}

function EducationSection({ entries }) {
    return entries.map(entry => (
        <div key={entry.id} style={{ marginBottom: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: '10.5pt', color: '#1e293b' }}>{entry.institution}</strong>
                <span style={{ fontSize: '9pt', color: '#64748b' }}>
                    {formatDate(entry.startDate)} — {formatDate(entry.endDate)}
                </span>
            </div>
            <div style={{ fontSize: '9.5pt', color: '#475569', fontStyle: 'italic' }}>
                {entry.degree}{entry.field ? ` in ${entry.field}` : ''}
            </div>
            {entry.description && (
                <div style={{ fontSize: '9pt', color: '#64748b', marginTop: '2px' }}>{entry.description}</div>
            )}
        </div>
    ))
}

function SkillsSection({ entries }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {entries.map(entry => (
                <div key={entry.id} style={{ fontSize: '9.5pt', lineHeight: '1.5' }}>
                    <strong style={{ color: '#1e293b' }}>{entry.category}: </strong>
                    <span style={{ color: '#475569' }}>{(entry.skills || []).join(', ')}</span>
                </div>
            ))}
        </div>
    )
}

function ProjectsSection({ entries }) {
    return entries.map(entry => (
        <div key={entry.id} style={{ marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <strong style={{ fontSize: '10pt', color: '#1e293b' }}>{entry.name}</strong>
                {entry.link && (
                    <span style={{ fontSize: '8.5pt', color: '#3b82f6' }}>{entry.link}</span>
                )}
            </div>
            {entry.description && (
                <div style={{ fontSize: '9.5pt', color: '#475569', marginTop: '2px' }}>{entry.description}</div>
            )}
            {entry.technologies && (
                <div style={{ fontSize: '8.5pt', color: '#94a3b8', marginTop: '2px' }}>
                    <em>{entry.technologies}</em>
                </div>
            )}
        </div>
    ))
}

function CertificationsSection({ entries }) {
    return entries.map(entry => (
        <div key={entry.id} style={{ marginBottom: '6px', fontSize: '9.5pt' }}>
            <strong style={{ color: '#1e293b' }}>{entry.name}</strong>
            {entry.issuer && <span style={{ color: '#475569' }}> — {entry.issuer}</span>}
            {entry.date && <span style={{ color: '#94a3b8' }}> ({formatDate(entry.date)})</span>}
        </div>
    ))
}

const SECTION_RENDERERS = {
    experience: ExperienceSection,
    education: EducationSection,
    skills: SkillsSection,
    projects: ProjectsSection,
    certifications: CertificationsSection,
}

export default function ClassicTemplate({ cv }) {
    const { personal, sections } = cv
    const contactItems = [
        personal.email && { icon: '✉', text: personal.email },
        personal.phone && { icon: '☎', text: personal.phone },
        personal.location && { icon: '📍', text: personal.location },
        personal.linkedin && { icon: '🔗', text: personal.linkedin },
        personal.website && { icon: '🌐', text: personal.website },
    ].filter(Boolean)

    return (
        <div className="a4-page" style={{ padding: '32px 36px', fontFamily: "'Inter', sans-serif" }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '12px' }}>
                <h1 style={{
                    fontSize: '20pt',
                    fontWeight: 700,
                    color: '#0f172a',
                    letterSpacing: '-0.01em',
                    marginBottom: '2px',
                }}>
                    {personal.name || 'Your Name'}
                </h1>
                {personal.title && (
                    <div style={{ fontSize: '11pt', color: '#475569', fontWeight: 400, marginBottom: '8px' }}>
                        {personal.title}
                    </div>
                )}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    gap: '12px',
                    fontSize: '8.5pt',
                    color: '#64748b',
                }}>
                    {contactItems.map((item, i) => (
                        <span key={i}>{item.text}</span>
                    ))}
                </div>
            </div>

            {/* Summary */}
            {personal.summary && (
                <div style={{
                    fontSize: '9.5pt',
                    color: '#475569',
                    lineHeight: '1.5',
                    textAlign: 'center',
                    borderTop: '1px solid #e2e8f0',
                    borderBottom: '1px solid #e2e8f0',
                    padding: '8px 0',
                    margin: '4px 0 8px',
                }}>
                    {personal.summary}
                </div>
            )}

            {/* Sections */}
            {sections.filter(s => s.visible && s.entries.length > 0).map(section => {
                const Renderer = SECTION_RENDERERS[section.type]
                if (!Renderer) return null
                return (
                    <div key={section.id}>
                        <SectionTitle title={section.title} />
                        <Renderer entries={section.entries} />
                    </div>
                )
            })}
        </div>
    )
}
