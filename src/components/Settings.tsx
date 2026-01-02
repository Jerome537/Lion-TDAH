import { useStore } from '../store/useStore';

export function Settings() {
  const {
    darkMode,
    soundEnabled,
    pomodoroEnabled,
    deepWorkStartTime,
    deepWorkEndTime,
    toggleDarkMode,
    toggleSound,
    togglePomodoro,
    setDeepWorkHours,
  } = useStore();

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-notion-text dark:text-white">
          Paramètres
        </h2>
      </div>

      <div className="space-y-4">
        {/* Dark Mode */}
        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-notion">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-notion-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
            <span className="text-notion-text dark:text-white">Mode sombre</span>
          </div>
          <button
            onClick={toggleDarkMode}
            className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
              darkMode ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
            }`}
          >
            <span
              className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                darkMode ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Sound */}
        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-notion">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-notion-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
            <span className="text-notion-text dark:text-white">Sons</span>
          </div>
          <button
            onClick={toggleSound}
            className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
              soundEnabled ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
            }`}
          >
            <span
              className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                soundEnabled ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Pomodoro */}
        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-notion">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-notion-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-notion-text dark:text-white">Mode Pomodoro</span>
          </div>
          <button
            onClick={togglePomodoro}
            className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
              pomodoroEnabled ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
            }`}
          >
            <span
              className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                pomodoroEnabled ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Deep Work Hours */}
        <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-notion">
          <div className="flex items-center gap-3 mb-3">
            <svg className="w-5 h-5 text-notion-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-notion-text dark:text-white">Horaires Deep Work</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="time"
              value={deepWorkStartTime}
              onChange={(e) => setDeepWorkHours(e.target.value, deepWorkEndTime)}
              className="input-notion flex-1 text-center"
            />
            <span className="text-notion-text-secondary">à</span>
            <input
              type="time"
              value={deepWorkEndTime}
              onChange={(e) => setDeepWorkHours(deepWorkStartTime, e.target.value)}
              className="input-notion flex-1 text-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
