import { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
    Paper,
    Box,
    IconButton,
    Typography,
    Stack,
    Chip,
    Tooltip,
    Collapse,
} from '@mui/material'
import {
    GripVertical as GripIcon,
    Eye as EyeIcon,
    EyeOff as EyeOffIcon,
    ChevronDown as DownIcon,
    ChevronRight as RightIcon
} from 'lucide-react'

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
        opacity: isDragging ? 0.6 : 1,
        zIndex: isDragging ? 1000 : 'auto',
    }

    return (
        <Paper
            ref={setNodeRef}
            style={style}
            sx={{
                borderRadius: 3,
                overflow: 'hidden',
                border: 1,
                borderColor: 'divider',
                bgcolor: 'background.paper',
                boxShadow: isDragging ? 4 : 0,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                    borderColor: 'primary.light',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
                }
            }}
        >
            {/* Header */}
            <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{
                    px: 1.5,
                    py: 1,
                    bgcolor: 'rgba(0,0,0,0.01)',
                    borderBottom: collapsed ? 0 : 1,
                    borderColor: 'divider'
                }}
            >
                <IconButton
                    {...attributes}
                    {...listeners}
                    size="small"
                    sx={{ cursor: 'grab', '&:active': { cursor: 'grabbing' }, color: 'text.disabled' }}
                >
                    <GripIcon size={16} />
                </IconButton>

                <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    onClick={() => setCollapsed(!collapsed)}
                    sx={{ flex: 1, cursor: 'pointer' }}
                >
                    {collapsed ? (
                        <RightIcon size={16} color="#94a3b8" />
                    ) : (
                        <DownIcon size={16} color="#94a3b8" />
                    )}
                    <Typography variant="subtitle2" fontWeight={700} color="text.primary">
                        {section.title}
                    </Typography>
                    {!section.visible && (
                        <Chip
                            label="Hidden"
                            size="small"
                            sx={{ height: 18, fontSize: '0.625rem', fontWeight: 700 }}
                        />
                    )}
                </Stack>

                <Tooltip title={section.visible ? 'Hide section' : 'Show section'}>
                    <IconButton
                        size="small"
                        onClick={() => onToggleVisibility(section.id)}
                        sx={{
                            color: section.visible ? 'primary.main' : 'text.disabled',
                            bgcolor: section.visible ? 'primary.50' : 'transparent',
                            '&:hover': { bgcolor: section.visible ? 'primary.100' : 'rgba(0,0,0,0.04)' }
                        }}
                    >
                        {section.visible ? <EyeIcon size={16} /> : <EyeOffIcon size={16} />}
                    </IconButton>
                </Tooltip>
            </Stack>

            {/* Content */}
            <Collapse in={!collapsed}>
                <Box sx={{ p: 2 }}>
                    {children}
                </Box>
            </Collapse>
        </Paper>
    )
}
