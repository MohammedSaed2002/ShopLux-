import React, { useState, useEffect } from 'react'
import router from './routes'
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { UserProvider } from './context/UserContext'
import { ThemeProvider } from './context/ThemeContext'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

export default function App() {
    const queryClient = new QueryClient()

    const [showSlowServerMsg, setShowSlowServerMsg] = useState(false);

    useEffect(() => {
        const alreadyShown = sessionStorage.getItem("slowServerMsgShown");
        if (!alreadyShown) {
            setShowSlowServerMsg(true);
            sessionStorage.setItem("slowServerMsgShown", "true");
        }
    }, []);

    return (
        <ThemeProvider>
            <UserProvider>
                <QueryClientProvider client={queryClient}>
                    <ReactQueryDevtools initialIsOpen={false} />
                    <RouterProvider router={router} />

                    <Snackbar
                        open={showSlowServerMsg}
                        autoHideDuration={6000}
                        onClose={() => setShowSlowServerMsg(false)}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    >
                        <Alert
                            onClose={() => setShowSlowServerMsg(false)}
                            severity="info"
                            sx={{ width: '100%' }}
                        >
                            قد يستغرق تحميل البيانات وقتاً أطول قليلاً عند أول استخدام
                        </Alert>
                    </Snackbar>
                </QueryClientProvider>
            </UserProvider>
        </ThemeProvider>
    )
}