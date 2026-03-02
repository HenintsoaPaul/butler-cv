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
} from '@mui/material'
import { Plus, Trash2 } from 'lucide-react'

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
    return (
        <Stack spacing={3}>
            {entries.map((entry) => (
                <Paper
                    key={entry.id}
                    elevation={0}
                    sx={{
                        p: 2,
                        position: 'relative',
                        bgcolor: 'rgba(0,0,0,0.01)',
                        borderRadius: 2,
                        border: 1,
                        borderColor: 'divider',
                    }}
                >
                    <IconButton
                        size="small"
                        onClick={() => onRemove(entry.id)}
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            color: 'text.disabled',
                            '&:hover': { color: 'error.main', bgcolor: 'error.50' }
                        }}
                    >
                        <Trash2 size={16} />
                    </IconButton>

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
                </Paper>
            ))}

            <Button
                variant="outlined"
                fullWidth
                startIcon={<Plus size={18} />}
                onClick={() => onAdd(emptyEntry)}
                sx={{
                    py: 1.25,
                    borderRadius: 3,
                    borderStyle: 'dashed',
                    color: 'primary.main',
                    bgcolor: 'rgba(59, 130, 246, 0.04)',
                    '&:hover': {
                        borderStyle: 'dashed',
                        bgcolor: 'rgba(59, 130, 246, 0.08)',
                    }
                }}
            >
                Add Experience
            </Button>
        </Stack>
    )
}
