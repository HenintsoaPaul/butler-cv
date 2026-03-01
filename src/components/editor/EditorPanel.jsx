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
import { User } from 'lucide-react'

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
        <div className="h-full overflow-y-auto p-5 no-print">
            {/* Personal Info */}
            <div className="mb-3 bg-white border border-surface-200 rounded-xl shadow-sm
                      hover:shadow-md transition-smooth overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 bg-surface-50/50">
                    <User size={16} className="text-primary-500" />
                    <h3 className="text-sm font-semibold text-surface-700">Personal Information</h3>
                </div>
                <div className="px-4 pb-4 pt-2">
                    <PersonalInfoForm
                        personal={cv.personal}
                        onUpdate={updatePersonal}
                    />
                </div>
            </div>

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
                    {cv.sections.map(section => (
                        <SectionWrapper
                            key={section.id}
                            section={section}
                            onToggleVisibility={toggleSectionVisibility}
                        >
                            {renderSectionForm(section)}
                        </SectionWrapper>
                    ))}
                </SortableContext>
            </DndContext>
        </div>
    )
}
