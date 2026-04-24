
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './app/store.js'
import { Toaster } from './components/ui/sonner.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>

    <App />
    <Toaster position="top-right"
    toastOptions={{
      duration: 5000
    }}
    />
    </Provider>
)
