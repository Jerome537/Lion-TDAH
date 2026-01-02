import { useState } from 'react';
import { useStore } from '../store/useStore';

export function RoutineChecklist() {
  const {
    routineSteps,
    toggleRoutineStep,
    addRoutineStep,
    removeRoutineStep,
    updateRoutineStep,
  } = useStore();

  const [newStep, setNewStep] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const completedCount = routineSteps.filter((s) => s.completed).length;
  const progress = routineSteps.length > 0 ? (completedCount / routineSteps.length) * 100 : 0;

  const handleAddStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (newStep.trim()) {
      addRoutineStep(newStep.trim());
      setNewStep('');
    }
  };

  const handleStartEdit = (id: string, label: string) => {
    setEditingId(id);
    setEditValue(label);
  };

  const handleSaveEdit = (id: string) => {
    if (editValue.trim()) {
      updateRoutineStep(id, editValue.trim());
    }
    setEditingId(null);
  };

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-notion-text dark:text-white">
          Routine Matinale
        </h2>
        <span className="ml-auto streak-badge">
          {completedCount}/{routineSteps.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Checklist */}
      <ul className="space-y-2 mb-4">
        {routineSteps.map((step) => (
          <li
            key={step.id}
            className={`flex items-center gap-3 p-3 rounded-notion transition-all duration-200 ${
              step.completed
                ? 'bg-green-50 dark:bg-green-900/20'
                : 'bg-gray-50 dark:bg-gray-700/50 hover:bg-primary-lighter/30 dark:hover:bg-primary/10'
            }`}
          >
            <input
              type="checkbox"
              checked={step.completed}
              onChange={() => toggleRoutineStep(step.id)}
              className="checkbox-notion"
            />

            {editingId === step.id ? (
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={() => handleSaveEdit(step.id)}
                onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit(step.id)}
                className="input-notion flex-1 py-1"
                autoFocus
              />
            ) : (
              <span
                className={`flex-1 cursor-pointer ${
                  step.completed
                    ? 'text-success line-through'
                    : 'text-notion-text dark:text-white'
                }`}
                onClick={() => toggleRoutineStep(step.id)}
              >
                {step.label}
              </span>
            )}

            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleStartEdit(step.id, step.label)}
                className="p-1 text-notion-text-secondary hover:text-primary transition-colors"
                title="Modifier"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                onClick={() => removeRoutineStep(step.id)}
                className="p-1 text-notion-text-secondary hover:text-red-500 transition-colors"
                title="Supprimer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Add new step */}
      <form onSubmit={handleAddStep} className="flex gap-2">
        <input
          type="text"
          value={newStep}
          onChange={(e) => setNewStep(e.target.value)}
          placeholder="Ajouter une étape..."
          className="input-notion flex-1"
        />
        <button type="submit" className="btn-primary px-4">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </form>
    </div>
  );
}
