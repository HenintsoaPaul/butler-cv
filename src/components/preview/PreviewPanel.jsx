import { forwardRef } from 'react'
import { Box } from '@mui/material'
import ClassicTemplate from './templates/ClassicTemplate'
import ModernTemplate from './templates/ModernTemplate'

const TEMPLATES = {
    classic: ClassicTemplate,
    modern: ModernTemplate,
}

const PreviewPanel = forwardRef(function PreviewPanel({ cv }, ref) {
    const TemplateComponent = TEMPLATES[cv.templateId] || ClassicTemplate

    return (
        <Box
            sx={{
                height: '100%',
                overflowY: 'auto',
                bgcolor: '#f1f5f9', // surface-100 equivalent
                display: 'flex',
                justifyContent: 'center',
                p: { xs: 2, sm: 4, md: 6 },
                '&::-webkit-scrollbar': { width: 8 },
                '&::-webkit-scrollbar-thumb': { bgcolor: '#cbd5e1', borderRadius: 4 }
            }}
        >
            <Box
                className="a4-preview print-area"
                ref={ref}
                sx={{
                    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
                    bgcolor: 'white'
                }}
            >
                <TemplateComponent cv={cv} />
            </Box>
        </Box>
    )
})

export default PreviewPanel
