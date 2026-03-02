import { TextField, Stack, Box, Grid, InputAdornment } from '@mui/material'
import { User, Mail, Phone, MapPin, Linkedin, Globe, FileText } from 'lucide-react'

export default function PersonalInfoForm({ personal, onUpdate }) {
    const fields = [
        { key: 'name', label: 'Full Name', icon: User, placeholder: 'John Doe' },
        { key: 'title', label: 'Professional Title', icon: FileText, placeholder: 'Senior Software Engineer' },
        { key: 'email', label: 'Email', icon: Mail, placeholder: 'john@example.com', type: 'email' },
        { key: 'phone', label: 'Phone', icon: Phone, placeholder: '+1 (555) 123-4567', type: 'tel' },
        { key: 'location', label: 'Location', icon: MapPin, placeholder: 'San Francisco, CA' },
        { key: 'linkedin', label: 'LinkedIn', icon: Linkedin, placeholder: 'linkedin.com/in/johndoe' },
        { key: 'website', label: 'Website', icon: Globe, placeholder: 'johndoe.dev' },
    ]

    return (
        <Stack spacing={2.5}>
            <Grid container spacing={2}>
                {fields.map(({ key, label, icon: Icon, placeholder, type }) => (
                    <Grid item xs={12} sm={key === 'name' || key === 'title' ? 12 : 6} key={key}>
                        <TextField
                            fullWidth
                            label={label}
                            variant="outlined"
                            size="small"
                            type={type || 'text'}
                            value={personal[key] || ''}
                            onChange={e => onUpdate(key, e.target.value)}
                            placeholder={placeholder}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Icon size={16} color="#64748b" />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                    '&:hover fieldset': { borderColor: 'primary.light' },
                                },
                            }}
                        />
                    </Grid>
                ))}
            </Grid>
            <TextField
                fullWidth
                label="Professional Summary"
                multiline
                rows={4}
                value={personal.summary || ''}
                onChange={e => onUpdate('summary', e.target.value)}
                placeholder="Brief summary of your professional background..."
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                    },
                }}
            />
        </Stack>
    )
}
