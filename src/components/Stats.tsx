import { useStore } from '../store/useStore';

export function Stats() {
  const { streak, totalDeepWorkMinutes, weeklyStats } = useStore();

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}min`;
    }
    return `${mins}min`;
  };

  const weekDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  const today = new Date().getDay();
  const adjustedToday = today === 0 ? 6 : today - 1; // Adjust for Monday start

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-notion-text dark:text-white">
          Statistiques
        </h2>
      </div>

      {/* Streak and Total */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-4 bg-primary-lighter/30 dark:bg-primary/10 rounded-notion">
          <div className="flex items-center justify-center gap-2 mb-1">
            <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
            </svg>
            <span className="text-3xl font-bold text-primary">{streak}</span>
          </div>
          <p className="text-sm text-notion-text-secondary">Jours consécutifs</p>
        </div>

        <div className="text-center p-4 bg-primary-lighter/30 dark:bg-primary/10 rounded-notion">
          <div className="flex items-center justify-center gap-2 mb-1">
            <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-3xl font-bold text-primary">
              {formatDuration(totalDeepWorkMinutes)}
            </span>
          </div>
          <p className="text-sm text-notion-text-secondary">Deep Work Total</p>
        </div>
      </div>

      {/* Weekly Progress */}
      <div>
        <h3 className="text-sm font-medium text-notion-text-secondary mb-3">
          Cette semaine
        </h3>
        <div className="flex justify-between gap-1">
          {weekDays.map((day, index) => {
            const stat = weeklyStats[index];
            const isToday = index === adjustedToday;
            const isCompleted = stat?.routineCompleted && stat?.priorityCompleted;

            return (
              <div key={index} className="flex-1 text-center">
                <div
                  className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                    isCompleted
                      ? 'bg-success text-white'
                      : isToday
                      ? 'bg-primary text-white animate-pulse-purple'
                      : 'bg-gray-100 dark:bg-gray-700 text-notion-text-secondary'
                  }`}
                >
                  {isCompleted ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    day
                  )}
                </div>
                <span className="text-xs text-notion-text-secondary mt-1 block">
                  {day}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Motivation Message */}
      {streak > 0 && (
        <div className="mt-4 p-3 bg-success/10 rounded-notion text-center">
          <p className="text-success font-medium">
            {streak >= 7
              ? '🎉 Une semaine complète ! Continue !'
              : streak >= 3
              ? '💪 Belle série ! Tu prends le rythme !'
              : '🌟 Beau début ! Chaque jour compte !'}
          </p>
        </div>
      )}
    </div>
  );
}
