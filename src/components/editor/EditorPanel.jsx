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
import { User as UserIcon } from 'lucide-react'

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
            {/* Personal Info */}
            <Paper
                sx={{
                    mb: 2,
                    borderRadius: 3,
                    overflow: 'hidden',
                    '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.05)' },
                    transition: 'box-shadow 0.2s ease-in-out'
                }}
            >
                <Box sx={{ px: 2, py: 1.5, bgcolor: 'rgba(0,0,0,0.02)', display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <UserIcon size={18} style={{ color: '#3b82f6' }} />
                    <Typography variant="subtitle2" fontWeight={700} color="text.primary">
                        Personal Information
                    </Typography>
                </Box>
                <Box sx={{ p: 2 }}>
                    <PersonalInfoForm
                        personal={cv.personal}
                        onUpdate={updatePersonal}
                    />
                </Box>
            </Paper>

            <Divider sx={{ mb: 2, borderStyle: 'dashed' }} />

            {/* Sortable Sections */}
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={cv.sections.map(s => s.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <Stack spacing={2}>
                        {cv.sections.map(section => (
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
        </Box>
    )
}
