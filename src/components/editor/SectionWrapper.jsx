import { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Eye, EyeOff, ChevronDown, ChevronRight } from 'lucide-react'

export default function SectionWrapper({
    section,
    onToggleVisibility,
    children,
}) {
    const [collapsed, setCollapsed] = useState(false)

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: section.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 10 : 'auto',
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`mb-3 bg-white border border-surface-200 rounded-xl overflow-hidden
                  transition-smooth ${isDragging ? 'shadow-lg' : 'shadow-sm hover:shadow-md'}`}
        >
            {/* Header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-surface-50/50">
                <button
                    {...attributes}
                    {...listeners}
                    className="p-1 text-surface-400 hover:text-surface-600 cursor-grab active:cursor-grabbing
                     rounded transition-smooth"
                    title="Drag to reorder"
                >
                    <GripVertical size={16} />
                </button>

                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="flex items-center gap-2 flex-1 text-left"
                >
                    {collapsed ? (
                        <ChevronRight size={16} className="text-surface-400" />
                    ) : (
                        <ChevronDown size={16} className="text-surface-400" />
                    )}
                    <h3 className="text-sm font-semibold text-surface-700">
                        {section.title}
                    </h3>
                    {!section.visible && (
                        <span className="text-[10px] font-medium text-surface-400 bg-surface-100
                             px-2 py-0.5 rounded-full">
                            Hidden
                        </span>
                    )}
                </button>

                <button
                    onClick={() => onToggleVisibility(section.id)}
                    className={`p-1.5 rounded-lg transition-smooth ${section.visible
                            ? 'text-primary-500 hover:bg-primary-50'
                            : 'text-surface-400 hover:bg-surface-100'
                        }`}
                    title={section.visible ? 'Hide section' : 'Show section'}
                >
                    {section.visible ? <Eye size={15} /> : <EyeOff size={15} />}
                </button>
            </div>

            {/* Content */}
            {!collapsed && (
                <div className="px-4 pb-4 pt-2 animate-fade-in">
                    {children}
                </div>
            )}
        </div>
    )
}
