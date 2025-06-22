import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './store/store'
import { Provider } from 'react-redux'
import { ThemeProvider } from './context/theme-context'

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <ThemeProvider>
        <App />
        </ThemeProvider>
    </Provider>,
)
