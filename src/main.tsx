// src/main.tsx
import { createRoot } from 'react-dom/client';
import App from './components/App/App';
import 'modern-normalize/modern-normalize.css';

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
