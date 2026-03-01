import { useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import { useCvStore } from './hooks/useCvStore'
import EditorPanel from './components/editor/EditorPanel'
import PreviewPanel from './components/preview/PreviewPanel'
import TemplateSelector from './components/preview/TemplateSelector'
import { Download, Check, Loader2, AlertCircle, RotateCcw, PanelLeftClose, PanelLeft } from 'lucide-react'

function SaveIndicator({ status }) {
    const config = {
        saved: { icon: Check, text: 'Saved', className: 'text-success' },
        saving: { icon: Loader2, text: 'Saving...', className: 'text-surface-400 animate-spin-icon' },
        error: { icon: AlertCircle, text: 'Error', className: 'text-danger' },
    }
    const { icon: Icon, text, className } = config[status] || config.saved

    return (
        <span className={`flex items-center gap-1 text-xs font-medium ${className}`}>
            <Icon size={13} className={status === 'saving' ? 'animate-spin' : ''} />
            {text}
        </span>
    )
}

export default function App() {
    const previewRef = useRef(null)
    const [editorVisible, setEditorVisible] = useState(true)

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

    return (
        <div className="h-screen flex flex-col bg-surface-50">
            {/* Top Bar */}
            <header className="flex-shrink-0 glass no-print border-b border-surface-200/50
                          sticky top-0 z-50">
                <div className="flex items-center justify-between px-5 py-3">
                    {/* Left: Logo + Template */}
                    <div className="flex items-center gap-5">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent rounded-lg
                              flex items-center justify-center text-white font-bold text-sm
                              shadow-md shadow-primary-200">
                                B
                            </div>
                            <h1 className="text-lg font-bold bg-gradient-to-r from-surface-800 to-surface-600
                             bg-clip-text text-transparent hidden sm:block">
                                Butler CV
                            </h1>
                        </div>
                        <div className="hidden md:block h-6 w-px bg-surface-200" />
                        <div className="hidden md:block">
                            <TemplateSelector
                                activeTemplate={cv.templateId}
                                onSelect={setTemplate}
                            />
                        </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-3">
                        <SaveIndicator status={saveStatus} />

                        <button
                            onClick={() => setEditorVisible(!editorVisible)}
                            className="p-2 text-surface-500 hover:text-surface-700 hover:bg-surface-100
                         rounded-lg transition-smooth md:hidden"
                            title={editorVisible ? 'Hide editor' : 'Show editor'}
                        >
                            {editorVisible ? <PanelLeftClose size={18} /> : <PanelLeft size={18} />}
                        </button>

                        <button
                            onClick={resetCv}
                            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium
                         text-surface-500 hover:text-surface-700 hover:bg-surface-100
                         rounded-lg transition-smooth"
                            title="Reset to defaults"
                        >
                            <RotateCcw size={14} />
                            <span className="hidden sm:inline">Reset</span>
                        </button>

                        <button
                            onClick={handlePrint}
                            className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium
                         text-white bg-gradient-to-r from-primary-600 to-primary-500
                         hover:from-primary-700 hover:to-primary-600
                         rounded-lg shadow-md shadow-primary-200
                         hover:shadow-lg hover:shadow-primary-300
                         transition-smooth active:scale-[0.97]"
                        >
                            <Download size={15} />
                            Export PDF
                        </button>
                    </div>
                </div>

                {/* Mobile Template Selector */}
                <div className="md:hidden px-5 pb-3">
                    <TemplateSelector
                        activeTemplate={cv.templateId}
                        onSelect={setTemplate}
                    />
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex overflow-hidden">
                {/* Editor */}
                {editorVisible && (
                    <div className="w-full md:w-[440px] lg:w-[480px] flex-shrink-0 border-r border-surface-200
                          bg-surface-50 overflow-hidden animate-slide-in">
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
                    </div>
                )}

                {/* Preview */}
                <div className={`flex-1 overflow-hidden ${editorVisible ? 'hidden md:block' : ''}`}>
                    <PreviewPanel cv={cv} ref={previewRef} />
                </div>
            </main>
        </div>
    )
}
