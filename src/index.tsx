import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { Theme } from '@chakra-ui/react';
import { Provider as StoreProvider } from 'react-redux';
import { store } from './redux/store';
import { Provider } from './components/ui/provider';
import { ToastContainer } from 'react-toastify';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <BrowserRouter>
    <StoreProvider store={store}>
      <Provider>
        <Theme appearance="light" className="h-full">
          <App />
        </Theme>
        <ToastContainer />
      </Provider>
    </StoreProvider>
  </BrowserRouter>,
);
