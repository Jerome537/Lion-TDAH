import { useState, useEffect } from 'react';
import {
  Header,
  PriorityBlock,
  DeepWorkTimer,
  RoutineChecklist,
  Stats,
  Settings,
} from './components';
import { useStore } from './store/useStore';

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const { darkMode, checkAndResetDaily } = useStore();

  useEffect(() => {
    // Check for daily reset on mount
    checkAndResetDaily();

    // Apply dark mode class on mount
    if (darkMode) {
      document.documentElement.classList.add('dark');
    }
  }, [checkAndResetDaily, darkMode]);

  return (
    <div className="min-h-screen bg-white dark:bg-notion-bg-dark transition-colors duration-200">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <Header />

        {/* Settings Toggle */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2 rounded-notion transition-all duration-200 ${
              showSettings
                ? 'bg-primary text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-notion-text-secondary hover:bg-primary-lighter'
            }`}
            title="Paramètres"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
        </div>

        {/* Main Content */}
        <div className="space-y-6 animate-fade-in">
          {showSettings ? (
            <Settings />
          ) : (
            <>
              <PriorityBlock />
              <DeepWorkTimer />
              <RoutineChecklist />
              <Stats />
            </>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-notion-text-secondary">
          <p>
            Conçu pour les <span className="text-primary font-medium">Lions TDAH</span>
          </p>
          <p className="mt-1">Sanctuarise tes 2 premières heures pour le deep work</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
