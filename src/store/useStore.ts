import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppState, AppActions } from '../types';

const DEFAULT_ROUTINE_STEPS: Array<{ id: string; label: string; completed: boolean }> = [
  { id: '1', label: 'Pas de téléphone pendant 30 min', completed: false },
  { id: '2', label: 'Hydratation (verre d\'eau)', completed: false },
  { id: '3', label: 'Revue de la priorité du jour', completed: false },
  { id: '4', label: 'Lancer le timer Deep Work', completed: false },
];

const getTodayString = () => new Date().toISOString().split('T')[0];

const initialState: AppState = {
  priority: '',
  priorityCompleted: false,
  timerDuration: 120 * 60, // 2 hours in seconds
  timerRemaining: 120 * 60,
  isTimerRunning: false,
  isFocusMode: false,
  routineSteps: DEFAULT_ROUTINE_STEPS,
  streak: 0,
  totalDeepWorkMinutes: 0,
  weeklyStats: [],
  darkMode: false,
  soundEnabled: true,
  pomodoroEnabled: false,
  deepWorkStartTime: '06:00',
  deepWorkEndTime: '08:00',
  lastResetDate: getTodayString(),
};

export const useStore = create<AppState & AppActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Priority actions
      setPriority: (priority) => set({ priority }),

      completePriority: () => {
        set({ priorityCompleted: true });
        get().checkAndResetDaily();
      },

      // Timer actions
      setTimerDuration: (minutes) => {
        const seconds = minutes * 60;
        set({ timerDuration: seconds, timerRemaining: seconds });
      },

      startTimer: () => set({ isTimerRunning: true }),

      pauseTimer: () => set({ isTimerRunning: false }),

      resetTimer: () => set((state) => ({
        timerRemaining: state.timerDuration,
        isTimerRunning: false,
      })),

      tickTimer: () => {
        const { timerRemaining, isTimerRunning, soundEnabled } = get();
        if (!isTimerRunning) return;

        if (timerRemaining <= 1) {
          set({ timerRemaining: 0, isTimerRunning: false });
          if (soundEnabled) {
            // Play completion sound
            const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2teleVFnidLu7qqJXllxgJSvqoyGfnx5dHJ+j6OtsKSPgYGDi5Whq66xrKOYkI2PkZOXm5+hoJ6al5WSlJaYmJmZmJeVlJOUlZaXl5eXl5eXlpaWlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlQ==');
            audio.play().catch(() => {});
          }
          get().addDeepWorkMinutes(get().timerDuration / 60);
        } else {
          set({ timerRemaining: timerRemaining - 1 });
        }
      },

      toggleFocusMode: () => set((state) => ({ isFocusMode: !state.isFocusMode })),

      // Routine actions
      toggleRoutineStep: (id) => {
        set((state) => ({
          routineSteps: state.routineSteps.map((step) =>
            step.id === id ? { ...step, completed: !step.completed } : step
          ),
        }));
        get().checkAndResetDaily();
      },

      addRoutineStep: (label) => {
        set((state) => ({
          routineSteps: [
            ...state.routineSteps,
            { id: Date.now().toString(), label, completed: false },
          ],
        }));
      },

      removeRoutineStep: (id) => {
        set((state) => ({
          routineSteps: state.routineSteps.filter((step) => step.id !== id),
        }));
      },

      updateRoutineStep: (id, label) => {
        set((state) => ({
          routineSteps: state.routineSteps.map((step) =>
            step.id === id ? { ...step, label } : step
          ),
        }));
      },

      // Settings actions
      toggleDarkMode: () => {
        set((state) => {
          const newDarkMode = !state.darkMode;
          if (newDarkMode) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          return { darkMode: newDarkMode };
        });
      },

      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),

      togglePomodoro: () => set((state) => ({ pomodoroEnabled: !state.pomodoroEnabled })),

      setDeepWorkHours: (start, end) => set({
        deepWorkStartTime: start,
        deepWorkEndTime: end,
      }),

      // Daily reset
      checkAndResetDaily: () => {
        const today = getTodayString();
        const { lastResetDate, routineSteps, priorityCompleted } = get();

        if (lastResetDate !== today) {
          // Check if previous day was completed
          const allRoutineCompleted = routineSteps.every((step) => step.completed);
          const dayCompleted = allRoutineCompleted && priorityCompleted;

          set((state) => ({
            lastResetDate: today,
            priority: state.priority, // Keep priority if set the night before
            priorityCompleted: false,
            routineSteps: state.routineSteps.map((step) => ({ ...step, completed: false })),
            streak: dayCompleted ? state.streak + 1 : 0,
            weeklyStats: [
              ...state.weeklyStats.slice(-6),
              {
                date: lastResetDate,
                deepWorkMinutes: 0,
                routineCompleted: allRoutineCompleted,
                priorityCompleted,
              },
            ],
          }));
        }
      },

      // Stats
      addDeepWorkMinutes: (minutes) => {
        set((state) => ({
          totalDeepWorkMinutes: state.totalDeepWorkMinutes + minutes,
        }));
      },
    }),
    {
      name: 'lion-morning-storage',
      onRehydrateStorage: () => (state) => {
        if (state?.darkMode) {
          document.documentElement.classList.add('dark');
        }
        state?.checkAndResetDaily();
      },
    }
  )
);
