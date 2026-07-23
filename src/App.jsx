import React from 'react'
import router from './routes'
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { UserProvider } from './context/UserContext'
import { ThemeProvider } from './context/ThemeContext'

export default function App() {
    const queryClient = new QueryClient()

    return (
        <ThemeProvider>
            <UserProvider>
                <QueryClientProvider client={queryClient}>
                    <ReactQueryDevtools initialIsOpen={false} />
                    <RouterProvider router={router} />
                </QueryClientProvider>
            </UserProvider>
        </ThemeProvider>
    )
}