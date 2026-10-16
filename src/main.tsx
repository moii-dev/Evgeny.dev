import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { MotionConfig } from 'motion/react';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';

function MotionPreferences() {
  const reduced = usePrefersReducedMotion();
  return <MotionConfig reducedMotion={reduced ? 'always' : 'never'}><App /></MotionConfig>;
}

createRoot(document.getElementById('root')!).render(<MotionPreferences />);
