import { useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import { useCvStore } from './hooks/useCvStore'
import TemplateSelector from './components/preview/TemplateSelector'
import EditorPanel from './components/editor/EditorPanel'
import PreviewPanel from './components/preview/PreviewPanel'
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Stack,
    Box,
    Divider,
} from '@mui/material'
import {
    Download as DownloadIcon,
    Check as CheckIcon,
    Loader2 as LoaderIcon,
    AlertCircle as ErrorIcon,
    RotateCcw as ResetIcon,
    PanelLeftClose as CloseIcon,
    PanelLeft as OpenIcon
} from 'lucide-react'
import { exportToPdf } from './utils/pdfUtils'

function SaveIndicator({ status }) {
    const config = {
        saved: { icon: CheckIcon, text: 'Saved', color: 'success.main' },
        saving: { icon: LoaderIcon, text: 'Saving...', color: 'text.secondary' },
        error: { icon: ErrorIcon, text: 'Error', color: 'error.main' },
    }
    const { icon: Icon, text, color } = config[status] || config.saved

    return (
        <Stack direction="row" spacing={0.5} alignItems="center" sx={{ color }}>
            <Icon size={14} className={status === 'saving' ? 'animate-spin' : ''} />
            <Typography variant="caption" fontWeight={600}>
                {text}
            </Typography>
        </Stack>
    )
}

export default function App() {
    const previewRef = useRef(null)
    const [editorVisible, setEditorVisible] = useState(true)
    const [isExporting, setIsExporting] = useState(false)

    const {
        cv,
        saveStatus,
        updatePersonal,
        updateSection,
        addEntry,
        updateEntry,
        removeEntry,
        reorderSections,
        toggleSectionVisibility,
        setTemplate,
        resetCv,
    } = useCvStore()

    const handlePrint = useReactToPrint({
        contentRef: previewRef,
        documentTitle: `${cv.personal.name || 'CV'} - Resume`,
    })

    const handleExport = async () => {
        setIsExporting(true)
        const filename = `${(cv.personal.name || 'CV').replace(/\s+/g, '_')}_Resume.pdf`
        await exportToPdf(previewRef.current, filename)
        setIsExporting(false)
    }

    return (
        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
            {/* Top Bar */}
            <AppBar
                position="sticky"
                color="inherit"
                elevation={0}
                sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                    backdropFilter: 'blur(8px)',
                    bgcolor: 'rgba(255, 255, 255, 0.8)',
                    zIndex: (theme) => theme.zIndex.drawer + 1
                }}
            >
                <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, sm: 3 } }}>
                    {/* Left: Logo + Template */}
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Box
                                sx={{
                                    width: 32,
                                    height: 32,
                                    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                                    borderRadius: 1.5,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: '0.875rem',
                                    boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.2)'
                                }}
                            >
                                B
                            </Box>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 800,
                                    background: 'linear-gradient(to right, #1e293b, #64748b)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    display: { xs: 'none', sm: 'block' }
                                }}
                            >
                                Butler CV
                            </Typography>
                        </Stack>

                        <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' }, height: 24, alignSelf: 'center' }} />

                        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                            <TemplateSelector
                                activeTemplate={cv.templateId}
                                onSelect={setTemplate}
                            />
                        </Box>
                    </Stack>

                    {/* Right: Actions */}
                    <Stack direction="row" spacing={1.5} alignItems="center">
                        <SaveIndicator status={saveStatus} />

                        <IconButton
                            onClick={() => setEditorVisible(!editorVisible)}
                            sx={{ display: { md: 'none' } }}
                            size="small"
                            aria-label="Toggle editor"
                        >
                            {editorVisible ? <CloseIcon size={20} /> : <OpenIcon size={20} />}
                        </IconButton>

                        <Button
                            startIcon={<ResetIcon size={16} />}
                            onClick={resetCv}
                            color="inherit"
                            size="small"
                            sx={{ color: 'text.secondary', display: { xs: 'none', sm: 'flex' } }}
                        >
                            Reset
                        </Button>

                        <Stack direction="row" spacing={1}>
                             <Button
                                variant="outlined"
                                onClick={handlePrint}
                                size="small"
                                sx={{ display: { xs: 'none', sm: 'flex' }, borderRadius: 2 }}
                            >
                                Print
                            </Button>
                            <Button
                                variant="contained"
                                startIcon={isExporting ? <LoaderIcon size={16} className="animate-spin" /> : <DownloadIcon size={16} />}
                                onClick={handleExport}
                                disabled={isExporting}
                                disableElevation
                                sx={{
                                    borderRadius: 2,
                                    background: 'linear-gradient(to right, #2563eb, #3b82f6)',
                                    '&:hover': {
                                        background: 'linear-gradient(to right, #1d4ed8, #2563eb)',
                                    }
                                }}
                            >
                                {isExporting ? 'Generating...' : 'Download PDF'}
                            </Button>
                        </Stack>
                    </Stack>
                </Toolbar>

                {/* Mobile Template Selector */}
                <Box sx={{ display: { md: 'none' }, px: 2, pb: 2 }}>
                    <TemplateSelector
                        activeTemplate={cv.templateId}
                        onSelect={setTemplate}
                    />
                </Box>
            </AppBar>

            {/* Main Content */}
            <Box component="main" sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                {/* Editor */}
                {editorVisible && (
                    <Box
                        data-testid="editor-panel"
                        sx={{
                            width: { xs: '100%', md: 440, lg: 480 },
                            flexShrink: 0,
                            borderRight: 1,
                            borderColor: 'divider',
                            bgcolor: 'background.paper',
                            overflow: 'hidden',
                        }}
                    >
                        <EditorPanel
                            cv={cv}
                            updatePersonal={updatePersonal}
                            updateSection={updateSection}
                            addEntry={addEntry}
                            updateEntry={updateEntry}
                            removeEntry={removeEntry}
                            reorderSections={reorderSections}
                            toggleSectionVisibility={toggleSectionVisibility}
                        />
                    </Box>
                )}

                {/* Preview */}
                <Box
                    data-testid="preview-panel"
                    sx={{
                        flex: 1,
                        overflow: 'hidden',
                        display: editorVisible ? { xs: 'none', md: 'block' } : 'block',
                        bgcolor: 'background.default'
                    }}
                >
                    <PreviewPanel cv={cv} ref={previewRef} />
                </Box>
            </Box>
        </Box>
    )
}
