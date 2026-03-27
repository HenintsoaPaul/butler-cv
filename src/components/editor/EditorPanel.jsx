import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core'
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import {
    Box,
    Typography,
    Paper,
    Stack,
    Divider
} from '@mui/material'
import { User as UserIcon, Briefcase, GraduationCap, Award, Star, FolderOpen } from 'lucide-react'

import SectionWrapper from './SectionWrapper'
import PersonalInfoForm from './PersonalInfoForm'
import ExperienceForm from './ExperienceForm'
import EducationForm from './EducationForm'
import SkillsForm from './SkillsForm'
import ProjectsForm from './ProjectsForm'
import CertificationsForm from './CertificationsForm'

const SECTION_FORMS = {
    experience: ExperienceForm,
    education: EducationForm,
    skills: SkillsForm,
    projects: ProjectsForm,
    certifications: CertificationsForm,
}

const CategoryHeader = ({ title, icon: Icon }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 3, mb: 1.5, px: 0.5 }}>
        <Icon size={16} style={{ color: '#64748b' }} />
        <Typography 
            variant="caption" 
            fontWeight={800} 
            sx={{ 
                textTransform: 'uppercase', 
                letterSpacing: '0.1em', 
                color: 'text.secondary',
                fontSize: '0.7rem' 
            }}
        >
            {title}
        </Typography>
    </Box>
)

export default function EditorPanel({
    cv,
    updatePersonal,
    updateSection,
    addEntry,
    updateEntry,
    removeEntry,
    reorderSections,
    toggleSectionVisibility,
}) {
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    )

    const handleDragEnd = (event) => {
        const { active, over } = event
        if (active.id !== over?.id) {
            const oldIndex = cv.sections.findIndex(s => s.id === active.id)
            const newIndex = cv.sections.findIndex(s => s.id === over.id)
            reorderSections(arrayMove(cv.sections, oldIndex, newIndex))
        }
    }

    const renderSectionForm = (section) => {
        const FormComponent = SECTION_FORMS[section.type]
        if (!FormComponent) return null

        return (
            <FormComponent
                entries={section.entries}
                onAdd={(entry) => addEntry(section.id, entry)}
                onUpdate={(entryId, updates) => updateEntry(section.id, entryId, updates)}
                onRemove={(entryId) => removeEntry(section.id, entryId)}
            />
        )
    }

    // Grouping sections for display
    const coreSections = cv.sections.filter(s => ['experience', 'education'].includes(s.type))
    const extraSections = cv.sections.filter(s => !['experience', 'education'].includes(s.type))

    return (
        <Box
            className="no-print"
            sx={{
                height: '100%',
                overflowY: 'auto',
                p: 2.5,
                bgcolor: 'background.default',
                '&::-webkit-scrollbar': { width: 6 },
                '&::-webkit-scrollbar-thumb': { bgcolor: 'divider', borderRadius: 3 }
            }}
        >
            {/* Category: Profile */}
            <CategoryHeader title="Identity & Contact" icon={UserIcon} />
            <Paper
                sx={{
                    mb: 2,
                    borderRadius: 3,
                    overflow: 'hidden',
                    border: 1,
                    borderColor: 'divider',
                    '&:hover': { borderColor: 'primary.light', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' },
                    transition: 'all 0.2s ease-in-out'
                }}
            >
                <Box sx={{ p: 2 }}>
                    <PersonalInfoForm
                        personal={cv.personal}
                        onUpdate={updatePersonal}
                    />
                </Box>
            </Paper>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                {/* Category: Professional Background */}
                <CategoryHeader title="Professional Background" icon={Briefcase} />
                <SortableContext
                    items={coreSections.map(s => s.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <Stack spacing={2}>
                        {coreSections.map(section => (
                            <SectionWrapper
                                key={section.id}
                                section={section}
                                onToggleVisibility={toggleSectionVisibility}
                            >
                                {renderSectionForm(section)}
                            </SectionWrapper>
                        ))}
                    </Stack>
                </SortableContext>

                {/* Category: Skills & More */}
                <CategoryHeader title="Skills & Achievements" icon={Award} />
                <SortableContext
                    items={extraSections.map(s => s.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <Stack spacing={2}>
                        {extraSections.map(section => (
                            <SectionWrapper
                                key={section.id}
                                section={section}
                                onToggleVisibility={toggleSectionVisibility}
                            >
                                {renderSectionForm(section)}
                            </SectionWrapper>
                        ))}
                    </Stack>
                </SortableContext>
            </DndContext>
            
            <Box sx={{ height: 40 }} /> {/* Spacer at bottom */}
        </Box>
    )
}
