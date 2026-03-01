export const defaultCv = {
    personal: {
        name: 'John Doe',
        title: 'Senior Software Engineer',
        email: 'john.doe@email.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        linkedin: 'linkedin.com/in/johndoe',
        website: 'johndoe.dev',
        summary:
            'Experienced software engineer with 8+ years building scalable web applications. Passionate about clean code, performance optimization, and mentoring junior developers. Strong track record of delivering projects on time in agile environments.',
    },
    sections: [
        {
            id: 'experience',
            type: 'experience',
            title: 'Professional Experience',
            visible: true,
            entries: [
                {
                    id: 'exp-1',
                    company: 'TechCorp Inc.',
                    role: 'Senior Software Engineer',
                    location: 'San Francisco, CA',
                    startDate: '2021-01',
                    endDate: '',
                    current: true,
                    description:
                        'Led a team of 5 engineers building a real-time analytics platform.\nReduced API response times by 40% through caching and query optimization.\nDesigned and implemented microservices architecture serving 2M+ daily users.',
                },
                {
                    id: 'exp-2',
                    company: 'StartupXYZ',
                    role: 'Full Stack Developer',
                    location: 'New York, NY',
                    startDate: '2018-06',
                    endDate: '2020-12',
                    current: false,
                    description:
                        'Built the core product from scratch using React and Node.js.\nImplemented CI/CD pipelines reducing deployment time by 60%.\nMentored 3 junior developers and conducted code reviews.',
                },
            ],
        },
        {
            id: 'education',
            type: 'education',
            title: 'Education',
            visible: true,
            entries: [
                {
                    id: 'edu-1',
                    institution: 'University of California, Berkeley',
                    degree: 'Bachelor of Science',
                    field: 'Computer Science',
                    startDate: '2014-09',
                    endDate: '2018-05',
                    description: 'Graduated with honors. GPA: 3.8/4.0',
                },
            ],
        },
        {
            id: 'skills',
            type: 'skills',
            title: 'Skills',
            visible: true,
            entries: [
                { id: 'skill-1', category: 'Languages', skills: ['JavaScript', 'TypeScript', 'Python', 'Go'] },
                { id: 'skill-2', category: 'Frontend', skills: ['React', 'Next.js', 'Vue.js', 'Tailwind CSS'] },
                { id: 'skill-3', category: 'Backend', skills: ['Node.js', 'Express', 'PostgreSQL', 'Redis'] },
                { id: 'skill-4', category: 'Tools', skills: ['Git', 'Docker', 'AWS', 'CI/CD'] },
            ],
        },
        {
            id: 'projects',
            type: 'projects',
            title: 'Projects',
            visible: true,
            entries: [
                {
                    id: 'proj-1',
                    name: 'Open Source CLI Tool',
                    description: 'Built a developer productivity CLI with 2k+ GitHub stars.',
                    technologies: 'Go, Cobra, GitHub Actions',
                    link: 'github.com/johndoe/cli-tool',
                },
            ],
        },
        {
            id: 'certifications',
            type: 'certifications',
            title: 'Certifications',
            visible: false,
            entries: [
                {
                    id: 'cert-1',
                    name: 'AWS Solutions Architect',
                    issuer: 'Amazon Web Services',
                    date: '2023-03',
                    link: '',
                },
            ],
        },
    ],
    templateId: 'classic',
}

let idCounter = Date.now()
export const generateId = () => `id-${idCounter++}`
