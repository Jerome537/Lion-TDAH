import { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';

export function DeepWorkTimer() {
  const {
    timerDuration,
    timerRemaining,
    isTimerRunning,
    isFocusMode,
    pomodoroEnabled,
    startTimer,
    pauseTimer,
    resetTimer,
    tickTimer,
    toggleFocusMode,
    setTimerDuration,
  } = useStore();

  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isTimerRunning) {
      intervalRef.current = window.setInterval(() => {
        tickTimer();
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isTimerRunning, tickTimer]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((timerDuration - timerRemaining) / timerDuration) * 100;

  const presetDurations = pomodoroEnabled
    ? [
        { label: '25 min', minutes: 25 },
        { label: '50 min', minutes: 50 },
        { label: '90 min', minutes: 90 },
      ]
    : [
        { label: '1h', minutes: 60 },
        { label: '1h30', minutes: 90 },
        { label: '2h', minutes: 120 },
      ];

  if (isFocusMode) {
    return (
      <div className="fixed inset-0 bg-notion-bg-dark z-50 flex flex-col items-center justify-center">
        <div className="text-center">
          <p className="text-primary text-xl mb-4 font-medium">Mode Focus Actif</p>
          <div className="timer-display text-7xl md:text-8xl mb-8">
            {formatTime(timerRemaining)}
          </div>
          <div className="w-64 mx-auto mb-8">
            <div className="progress-bar h-3">
              <div
                className="progress-bar-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <div className="flex gap-4 justify-center">
            {isTimerRunning ? (
              <button
                onClick={pauseTimer}
                className="btn-secondary text-white border-white hover:bg-white hover:text-notion-bg-dark"
              >
                Pause
              </button>
            ) : (
              <button onClick={startTimer} className="btn-primary">
                Reprendre
              </button>
            )}
            <button
              onClick={toggleFocusMode}
              className="btn-secondary text-white border-white hover:bg-white hover:text-notion-bg-dark"
            >
              Quitter Focus
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-notion-text dark:text-white">
          Timer Deep Work
        </h2>
        {pomodoroEnabled && (
          <span className="streak-badge text-xs">Pomodoro</span>
        )}
      </div>

      <div className="text-center py-6">
        <div
          className={`timer-display mb-4 ${
            isTimerRunning ? 'animate-pulse-purple' : ''
          }`}
        >
          {formatTime(timerRemaining)}
        </div>

        <div className="w-full mb-6">
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-notion-text-secondary mt-2">
            {Math.round(progress)}% complété
          </p>
        </div>

        <div className="flex gap-2 justify-center mb-4">
          {presetDurations.map((preset) => (
            <button
              key={preset.minutes}
              onClick={() => setTimerDuration(preset.minutes)}
              className={`px-3 py-1 rounded-notion text-sm transition-all duration-200 ${
                timerDuration === preset.minutes * 60
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-notion-text dark:text-white hover:bg-primary-lighter'
              }`}
              disabled={isTimerRunning}
            >
              {preset.label}
            </button>
          ))}
        </div>

        <div className="flex gap-2 justify-center">
          {!isTimerRunning ? (
            <button onClick={startTimer} className="btn-primary px-8">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Démarrer
              </span>
            </button>
          ) : (
            <button onClick={pauseTimer} className="btn-secondary px-8">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Pause
              </span>
            </button>
          )}
          <button
            onClick={resetTimer}
            className="btn-secondary px-4"
            title="Réinitialiser"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
          <button
            onClick={toggleFocusMode}
            className="btn-primary px-4"
            title="Mode Focus"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
