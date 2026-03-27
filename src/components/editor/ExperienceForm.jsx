import { useState } from 'react'
import {
    Box,
    TextField,
    Button,
    Paper,
    Checkbox,
    FormControlLabel,
    IconButton,
    Typography,
    Stack,
    Grid,
    Collapse,
    Divider,
} from '@mui/material'
import { Plus, Trash2, ChevronDown, ChevronRight, Briefcase } from 'lucide-react'

const emptyEntry = {
    company: '',
    role: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
}

export default function ExperienceForm({ entries, onAdd, onUpdate, onRemove }) {
    const [expandedId, setExpandedId] = useState(entries[0]?.id || null)

    const handleToggle = (id) => {
        setExpandedId(expandedId === id ? null : id)
    }

    const handleAdd = () => {
        const id = crypto.randomUUID()
        onAdd({ ...emptyEntry, id })
        setExpandedId(id)
    }

    return (
        <Stack spacing={2}>
            {entries.map((entry) => (
                <Paper
                    key={entry.id}
                    elevation={0}
                    sx={{
                        borderRadius: 2,
                        border: 1,
                        borderColor: expandedId === entry.id ? 'primary.light' : 'divider',
                        transition: 'all 0.2s',
                        overflow: 'hidden',
                        bgcolor: expandedId === entry.id ? 'rgba(59, 130, 246, 0.02)' : 'background.paper',
                    }}
                >
                    {/* Header Summary */}
                    <Box
                        sx={{
                            p: 1.5,
                            pl: 2,
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                            '&:hover': { bgcolor: 'rgba(0,0,0,0.02)' }
                        }}
                        onClick={() => handleToggle(entry.id)}
                    >
                        <Box sx={{ mr: 1.5, display: 'flex', alignItems: 'center', color: entry.role ? 'primary.main' : 'text.disabled' }}>
                            <Briefcase size={16} />
                        </Box>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography variant="subtitle2" noWrap fontWeight={600} color={entry.role ? 'text.primary' : 'text.disabled'}>
                                {entry.role || 'New Experience'}
                            </Typography>
                            {entry.company && (
                                <Typography variant="caption" color="text.secondary" noWrap display="block">
                                    {entry.company}
                                </Typography>
                            )}
                        </Box>
                        <Stack direction="row" spacing={0.5} alignItems="center">
                            <IconButton
                                size="small"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    onRemove(entry.id)
                                }}
                                sx={{ color: 'text.disabled', '&:hover': { color: 'error.main' } }}
                            >
                                <Trash2 size={14} />
                            </IconButton>
                            <Box sx={{ color: 'text.disabled', ml: 0.5, display: 'flex' }}>
                                {expandedId === entry.id ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                            </Box>
                        </Stack>
                    </Box>

                    <Collapse in={expandedId === entry.id}>
                        <Divider sx={{ opacity: 0.6 }} />
                        <Box sx={{ p: 2 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Job Title"
                                        variant="outlined"
                                        size="small"
                                        value={entry.role || ''}
                                        onChange={e => onUpdate(entry.id, { role: e.target.value })}
                                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Company"
                                        variant="outlined"
                                        size="small"
                                        value={entry.company || ''}
                                        onChange={e => onUpdate(entry.id, { company: e.target.value })}
                                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Location"
                                        variant="outlined"
                                        size="small"
                                        value={entry.location || ''}
                                        onChange={e => onUpdate(entry.id, { location: e.target.value })}
                                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Start Date"
                                        type="month"
                                        size="small"
                                        slotProps={{ inputLabel: { shrink: true } }}
                                        value={entry.startDate || ''}
                                        onChange={e => onUpdate(entry.id, { startDate: e.target.value })}
                                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="End Date"
                                        type="month"
                                        size="small"
                                        slotProps={{ inputLabel: { shrink: true } }}
                                        value={entry.endDate || ''}
                                        onChange={e => onUpdate(entry.id, { endDate: e.target.value })}
                                        disabled={entry.current}
                                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                size="small"
                                                checked={entry.current || false}
                                                onChange={e => onUpdate(entry.id, { current: e.target.checked, endDate: '' })}
                                            />
                                        }
                                        label={<Typography variant="body2">Currently working here</Typography>}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Description"
                                        multiline
                                        rows={3}
                                        value={entry.description || ''}
                                        onChange={e => onUpdate(entry.id, { description: e.target.value })}
                                        placeholder="Key achievements and responsibilities..."
                                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </Collapse>
                </Paper>
            ))}

            <Button
                variant="outlined"
                fullWidth
                startIcon={<Plus size={18} />}
                onClick={handleAdd}
                sx={{
                    py: 1,
                    borderRadius: 2,
                    borderStyle: 'dashed',
                    textTransform: 'none',
                    fontWeight: 600,
                    '&:hover': { borderStyle: 'dashed' }
                }}
            >
                Add Experience
            </Button>
        </Stack>
    )
}
