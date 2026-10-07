import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { PuzzleProgressProvider } from './game/PuzzleProgress';

createRoot(document.getElementById('root')!).render(<PuzzleProgressProvider><App /></PuzzleProgressProvider>);
