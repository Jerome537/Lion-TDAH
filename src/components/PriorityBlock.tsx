import { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';

export function PriorityBlock() {
  const { priority, priorityCompleted, setPriority, completePriority } = useStore();
  const [isEditing, setIsEditing] = useState(!priority);
  const [inputValue, setInputValue] = useState(priority);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setInputValue(priority);
  }, [priority]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setPriority(inputValue.trim());
      setIsEditing(false);
    }
  };

  const handleComplete = () => {
    completePriority();
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 1500);
  };

  return (
    <div className="card relative overflow-hidden">
      {/* Confetti effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: '100%',
                width: '10px',
                height: '10px',
                backgroundColor: i % 2 === 0 ? '#9B51E0' : '#0F9D58',
                borderRadius: i % 3 === 0 ? '50%' : '0',
                animationDelay: `${Math.random() * 0.5}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-notion-text dark:text-white">
          Priorité du Jour
        </h2>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Quelle est LA priorité de demain ?"
            className="input-notion text-lg"
            autoFocus
          />
          <div className="flex gap-2">
            <button type="submit" className="btn-primary flex-1">
              Définir la priorité
            </button>
            {priority && (
              <button
                type="button"
                onClick={() => {
                  setInputValue(priority);
                  setIsEditing(false);
                }}
                className="btn-secondary"
              >
                Annuler
              </button>
            )}
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div
            className={`p-4 rounded-notion border-2 transition-all duration-200 ${
              priorityCompleted
                ? 'border-success bg-green-50 dark:bg-green-900/20'
                : 'border-primary bg-primary-lighter/30 dark:bg-primary/10'
            }`}
          >
            <p
              className={`text-xl font-medium ${
                priorityCompleted
                  ? 'text-success line-through'
                  : 'text-notion-text dark:text-white'
              }`}
            >
              {priority}
            </p>
          </div>

          <div className="flex gap-2">
            {!priorityCompleted ? (
              <button
                onClick={handleComplete}
                className="btn-primary flex-1 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Terminé !
              </button>
            ) : (
              <div className="flex-1 flex items-center justify-center gap-2 text-success font-medium py-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Objectif atteint !
              </div>
            )}
            <button
              onClick={() => setIsEditing(true)}
              className="btn-secondary px-3"
              title="Modifier"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <p className="mt-3 text-sm text-notion-text-secondary">
        Conseil : Définissez votre priorité la veille au soir
      </p>
    </div>
  );
}
