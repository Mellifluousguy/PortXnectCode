import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { AppContextProvider } from './AllFolders/context/LoginContent.jsx';
import { AdminContextProvider } from './AllFolders/context/AdminContext.jsx';
import { BrowserRouter } from 'react-router-dom';


createRoot(document.getElementById('root')).render(
  <>
    <BrowserRouter>
      <AppContextProvider>
        <AdminContextProvider>
          <App />
        </AdminContextProvider>
      </AppContextProvider>
    </BrowserRouter>
  </>
)
