import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import Modal from 'react-modal';
import App from './App';
import './index.css';

// Set app element globally for modals
Modal.setAppElement('#root');

export default function Root() {
  return (
    <BrowserRouter>
      <App
      />
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<Root />);
