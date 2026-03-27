import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#3b82f6', // primary-500 equivalent
            light: '#60a5fa',
            dark: '#2563eb',
            contrastText: '#fff',
        },
        secondary: {
            main: '#8b5cf6', // accent equivalent
            light: '#a78bfa',
            dark: '#7c3aed',
            contrastText: '#fff',
        },
        background: {
            default: '#f8fafc', // surface-50
            paper: '#ffffff',
        },
        text: {
            primary: '#1e293b', // surface-800
            secondary: '#64748b', // surface-500
        },
        divider: 'rgba(226, 232, 240, 0.5)', // surface-200/50
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: { fontSize: '2.5rem', fontWeight: 700 },
        h2: { fontSize: '2rem', fontWeight: 600 },
        h3: { fontSize: '1.75rem', fontWeight: 600 },
        h4: { fontSize: '1.5rem', fontWeight: 600 },
        h5: { fontSize: '1.25rem', fontWeight: 600 },
        h6: { fontSize: '1.1rem', fontWeight: 600 },
        button: { textTransform: 'none', fontWeight: 500 },
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                    },
                },
            },
        },
        MuiPaper: {
            defaultProps: {
                elevation: 0,
            },
            styleOverrides: {
                root: {
                    border: '1px solid rgba(226, 232, 240, 0.8)',
                },
            },
        },
    },
});

export default theme;
