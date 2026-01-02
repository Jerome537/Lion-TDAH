export function Header() {
  return (
    <header className="text-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-2">
        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-notion-hover">
          <span className="text-2xl">🦁</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-notion-text dark:text-white">
          Lion <span className="text-primary">Morning</span>
        </h1>
      </div>
      <p className="text-notion-text-secondary">
        Optimise tes matinées • Maximise ta productivité
      </p>
    </header>
  );
}
