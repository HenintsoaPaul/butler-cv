function formatDate(dateStr) {
    if (!dateStr) return ''
    const [year, month] = dateStr.split('-')
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return `${months[parseInt(month) - 1]} ${year}`
}

function ExperienceSection({ entries }) {
    return entries.map(entry => (
        <div key={entry.id} style={{ marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: '10.5pt', color: '#1e293b' }}>{entry.role}</strong>
                <span style={{ fontSize: '8.5pt', color: '#94a3b8' }}>
                    {formatDate(entry.startDate)} — {entry.current ? 'Present' : formatDate(entry.endDate)}
                </span>
            </div>
            <div style={{ fontSize: '9.5pt', color: '#64748b', fontStyle: 'italic' }}>
                {entry.company}{entry.location ? ` · ${entry.location}` : ''}
            </div>
            {entry.description && (
                <ul style={{ marginTop: '4px', paddingLeft: '14px', fontSize: '9pt', color: '#475569', lineHeight: '1.5' }}>
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
            <strong style={{ fontSize: '10pt', color: '#1e293b' }}>{entry.institution}</strong>
            <div style={{ fontSize: '9pt', color: '#64748b' }}>
                {entry.degree}{entry.field ? ` in ${entry.field}` : ''} · {formatDate(entry.startDate)} — {formatDate(entry.endDate)}
            </div>
            {entry.description && (
                <div style={{ fontSize: '8.5pt', color: '#94a3b8', marginTop: '2px' }}>{entry.description}</div>
            )}
        </div>
    ))
}

function SkillsSection({ entries }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {entries.map(entry => (
                <div key={entry.id}>
                    <div style={{ fontSize: '9pt', fontWeight: 600, color: '#f8fafc', marginBottom: '3px' }}>
                        {entry.category}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {(entry.skills || []).map(skill => (
                            <span
                                key={skill}
                                style={{
                                    fontSize: '8pt',
                                    padding: '2px 8px',
                                    background: 'rgba(255,255,255,0.15)',
                                    borderRadius: '4px',
                                    color: '#e2e8f0',
                                }}
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

function ProjectsSection({ entries }) {
    return entries.map(entry => (
        <div key={entry.id} style={{ marginBottom: '10px' }}>
            <strong style={{ fontSize: '10pt', color: '#1e293b' }}>{entry.name}</strong>
            {entry.description && (
                <div style={{ fontSize: '9pt', color: '#475569', marginTop: '2px' }}>{entry.description}</div>
            )}
            {entry.technologies && (
                <div style={{ fontSize: '8.5pt', color: '#94a3b8', marginTop: '2px', fontStyle: 'italic' }}>
                    {entry.technologies}
                </div>
            )}
            {entry.link && (
                <div style={{ fontSize: '8pt', color: '#3b82f6', marginTop: '1px' }}>{entry.link}</div>
            )}
        </div>
    ))
}

function CertificationsSection({ entries }) {
    return entries.map(entry => (
        <div key={entry.id} style={{ marginBottom: '6px' }}>
            <strong style={{ fontSize: '9.5pt', color: '#1e293b' }}>{entry.name}</strong>
            {entry.issuer && <span style={{ fontSize: '9pt', color: '#64748b' }}> — {entry.issuer}</span>}
            {entry.date && <span style={{ fontSize: '8.5pt', color: '#94a3b8' }}> ({formatDate(entry.date)})</span>}
        </div>
    ))
}

const SIDEBAR_SECTIONS = ['skills']
const MAIN_RENDERERS = {
    experience: ExperienceSection,
    education: EducationSection,
    projects: ProjectsSection,
    certifications: CertificationsSection,
}

export default function ModernTemplate({ cv }) {
    const { personal, sections } = cv
    const PRIMARY = '#2563eb'

    const sidebarSections = sections.filter(s => s.visible && SIDEBAR_SECTIONS.includes(s.type) && s.entries.length > 0)
    const mainSections = sections.filter(s => s.visible && !SIDEBAR_SECTIONS.includes(s.type) && s.entries.length > 0)

    return (
        <div className="a4-page" style={{
            display: 'flex',
            fontFamily: "'Inter', sans-serif",
            overflow: 'hidden',
        }}>
            {/* Sidebar */}
            <div style={{
                width: '200px',
                flexShrink: 0,
                background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
                color: '#f1f5f9',
                padding: '28px 20px',
            }}>
                {/* Name & Title */}
                <div style={{ marginBottom: '20px' }}>
                    <h1 style={{
                        fontSize: '16pt',
                        fontWeight: 700,
                        color: '#ffffff',
                        lineHeight: '1.2',
                        marginBottom: '4px',
                    }}>
                        {personal.name || 'Your Name'}
                    </h1>
                    {personal.title && (
                        <div style={{
                            fontSize: '9pt',
                            color: PRIMARY,
                            fontWeight: 500,
                            letterSpacing: '0.03em',
                        }}>
                            {personal.title}
                        </div>
                    )}
                </div>

                {/* Contact */}
                <div style={{ marginBottom: '20px' }}>
                    <h2 style={{
                        fontSize: '8.5pt',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        color: PRIMARY,
                        marginBottom: '8px',
                        paddingBottom: '4px',
                        borderBottom: `1px solid ${PRIMARY}40`,
                    }}>
                        Contact
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '8.5pt', color: '#cbd5e1' }}>
                        {personal.email && <div>📧 {personal.email}</div>}
                        {personal.phone && <div>📱 {personal.phone}</div>}
                        {personal.location && <div>📍 {personal.location}</div>}
                        {personal.linkedin && <div>🔗 {personal.linkedin}</div>}
                        {personal.website && <div>🌐 {personal.website}</div>}
                    </div>
                </div>

                {/* Sidebar sections (skills) */}
                {sidebarSections.map(section => (
                    <div key={section.id} style={{ marginBottom: '16px' }}>
                        <h2 style={{
                            fontSize: '8.5pt',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            color: PRIMARY,
                            marginBottom: '8px',
                            paddingBottom: '4px',
                            borderBottom: `1px solid ${PRIMARY}40`,
                        }}>
                            {section.title}
                        </h2>
                        <SkillsSection entries={section.entries} />
                    </div>
                ))}
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, padding: '28px 28px 28px 24px' }}>
                {/* Summary */}
                {personal.summary && (
                    <div style={{
                        fontSize: '9.5pt',
                        color: '#475569',
                        lineHeight: '1.6',
                        marginBottom: '16px',
                        paddingBottom: '12px',
                        borderBottom: '1px solid #e2e8f0',
                    }}>
                        {personal.summary}
                    </div>
                )}

                {/* Main sections */}
                {mainSections.map(section => {
                    const Renderer = MAIN_RENDERERS[section.type]
                    if (!Renderer) return null
                    return (
                        <div key={section.id} style={{ marginBottom: '14px' }}>
                            <h2 style={{
                                fontSize: '11pt',
                                fontWeight: 700,
                                color: PRIMARY,
                                textTransform: 'uppercase',
                                letterSpacing: '0.04em',
                                marginBottom: '8px',
                                paddingBottom: '4px',
                                borderBottom: `2px solid ${PRIMARY}`,
                            }}>
                                {section.title}
                            </h2>
                            <Renderer entries={section.entries} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
