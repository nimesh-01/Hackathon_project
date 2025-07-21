import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { store } from './Store/Store.jsx'
import { Provider } from 'react-redux'
import ScrollToTop from './components/ScrollToTop.jsx'
createRoot(document.getElementById('root')).render(
  <Provider store={store} >
    <BrowserRouter>
    <ScrollToTop />
      <App />
      <ToastContainer />
    </BrowserRouter>
  </Provider>
)
