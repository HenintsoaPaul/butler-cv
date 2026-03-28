import { TextField, Stack, Box, Grid, InputAdornment, Typography, Divider } from '@mui/material'
import { User, Mail, Phone, MapPin, Linkedin, Globe, FileText } from 'lucide-react'

const SectionHeader = ({ title, icon: Icon }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, mt: 0.5 }}>
        {Icon && <Icon size={14} style={{ color: '#3b82f6' }} />}
        <Typography variant="caption" fontWeight={700} sx={{ textTransform: 'uppercase', letterSpacing: '0.05em', color: 'text.secondary' }}>
            {title}
        </Typography>
    </Box>
)

export default function PersonalInfoForm({ personal, onUpdate }) {
    const renderField = (key, label, Icon, placeholder, type = 'text', sm = 12) => (
        <Grid item xs={12} sm={sm}>
            <TextField
                fullWidth
                label={label}
                variant="outlined"
                size="small"
                type={type}
                value={personal[key] || ''}
                onChange={e => onUpdate(key, e.target.value)}
                placeholder={placeholder}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            {Icon && <Icon size={14} color="#94a3b8" />}
                        </InputAdornment>
                    ),
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover fieldset': { borderColor: 'primary.light' },
                    },
                    '& .MuiInputLabel-root': { fontSize: '0.875rem' },
                    '& .MuiOutlinedInput-input': { fontSize: '0.875rem' }
                }}
            />
        </Grid>
    )

    return (
        <Stack spacing={3}>
            {/* Identity Group */}
            <Box>
                <SectionHeader title="Identity" icon={User} />
                <Grid container spacing={2}>
                    {renderField('name', 'Full Name', User, 'John Doe')}
                    {renderField('title', 'Professional Title', FileText, 'Senior Software Engineer')}
                </Grid>
            </Box>

            <Divider sx={{ borderStyle: 'dashed', opacity: 0.5 }} />

            {/* Contact Group */}
            <Box>
                <SectionHeader title="Contact Information" icon={Mail} />
                <Grid container spacing={2}>
                    {renderField('email', 'Email', Mail, 'john@example.com', 'email', 6)}
                    {renderField('phone', 'Phone', Phone, '+1 (555) 123-4567', 'tel', 6)}
                    {renderField('location', 'Location', MapPin, 'San Francisco, CA', 'text', 12)}
                </Grid>
            </Box>

            <Divider sx={{ borderStyle: 'dashed', opacity: 0.5 }} />

            {/* Links Group */}
            <Box>
                <SectionHeader title="Online Presence" icon={Globe} />
                <Grid container spacing={2}>
                    {renderField('linkedin', 'LinkedIn', Linkedin, 'linkedin.com/in/johndoe', 'text', 6)}
                    {renderField('website', 'Website', Globe, 'johndoe.dev', 'text', 6)}
                </Grid>
            </Box>

            <Divider sx={{ borderStyle: 'dashed', opacity: 0.5 }} />

            {/* Summary Group */}
            <Box>
                <SectionHeader title="Professional Summary" icon={FileText} />
                <TextField
                    fullWidth
                    label="Brief Overview"
                    multiline
                    rows={4}
                    value={personal.summary || ''}
                    onChange={e => onUpdate('summary', e.target.value)}
                    placeholder="Brief summary of your professional background..."
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                        },
                        '& .MuiInputLabel-root': { fontSize: '0.875rem' },
                        '& .MuiOutlinedInput-input': { fontSize: '0.875rem' }
                    }}
                />
            </Box>
        </Stack>
    )
}
