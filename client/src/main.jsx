import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './context/auth.context.jsx'
import {BrowserRouter} from "react-router";

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AuthProvider>
            <App />
        </AuthProvider>
    </BrowserRouter>
)
