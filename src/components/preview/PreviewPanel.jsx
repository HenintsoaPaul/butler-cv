import { forwardRef } from 'react'
import ClassicTemplate from './templates/ClassicTemplate'
import ModernTemplate from './templates/ModernTemplate'

const TEMPLATES = {
    classic: ClassicTemplate,
    modern: ModernTemplate,
}

const PreviewPanel = forwardRef(function PreviewPanel({ cv }, ref) {
    const TemplateComponent = TEMPLATES[cv.templateId] || ClassicTemplate

    return (
        <div className="h-full overflow-y-auto bg-surface-100 flex justify-center p-6">
            <div className="a4-preview print-area" ref={ref}>
                <TemplateComponent cv={cv} />
            </div>
        </div>
    )
})

export default PreviewPanel
