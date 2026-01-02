export interface RoutineStep {
  id: string;
  label: string;
  completed: boolean;
}

export interface DayStats {
  date: string;
  deepWorkMinutes: number;
  routineCompleted: boolean;
  priorityCompleted: boolean;
}

export interface AppState {
  // Priority
  priority: string;
  priorityCompleted: boolean;

  // Timer
  timerDuration: number; // in seconds
  timerRemaining: number;
  isTimerRunning: boolean;
  isFocusMode: boolean;

  // Routine
  routineSteps: RoutineStep[];

  // Stats
  streak: number;
  totalDeepWorkMinutes: number;
  weeklyStats: DayStats[];

  // Settings
  darkMode: boolean;
  soundEnabled: boolean;
  pomodoroEnabled: boolean;
  deepWorkStartTime: string;
  deepWorkEndTime: string;

  // Last reset date
  lastResetDate: string;
}

export interface AppActions {
  // Priority
  setPriority: (priority: string) => void;
  completePriority: () => void;

  // Timer
  setTimerDuration: (minutes: number) => void;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  tickTimer: () => void;
  toggleFocusMode: () => void;

  // Routine
  toggleRoutineStep: (id: string) => void;
  addRoutineStep: (label: string) => void;
  removeRoutineStep: (id: string) => void;
  updateRoutineStep: (id: string, label: string) => void;

  // Settings
  toggleDarkMode: () => void;
  toggleSound: () => void;
  togglePomodoro: () => void;
  setDeepWorkHours: (start: string, end: string) => void;

  // Daily reset
  checkAndResetDaily: () => void;

  // Stats
  addDeepWorkMinutes: (minutes: number) => void;
}
