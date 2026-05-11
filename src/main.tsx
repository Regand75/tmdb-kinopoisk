import { createRoot } from 'react-dom/client';
import '@/app/styles/index.css';
import { App } from '@/app/App';
import { Provider } from 'react-redux';
import { store } from '@/app/store/store';
import 'react-loading-skeleton/dist/skeleton.css';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
