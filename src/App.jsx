import React, { useState } from 'react';
import { LayoutGrid, Gamepad2, ArrowLeft, TrendingUp, Wind, Calculator, Puzzle } from 'lucide-react';
import MathGame from './MathGame';

export default function App() {
  const [currentView, setCurrentView] = useState('HOME');

  const renderHome = () => (
    <div className="card-grid view-enter">
      <div className="glass-card card-apps" onClick={() => setCurrentView('APPS')}>
        <div className="icon-wrapper">
          <LayoutGrid size={40} strokeWidth={1.5} />
        </div>
        <h2>Apps</h2>
        <p>Explore productivity, health, and finance applications.</p>
      </div>

      <div className="glass-card card-games" onClick={() => setCurrentView('GAMES')}>
        <div className="icon-wrapper">
          <Gamepad2 size={40} strokeWidth={1.5} />
        </div>
        <h2>Games</h2>
        <p>Fun and educational games for the kids.</p>
      </div>
    </div>
  );

  const renderApps = () => (
    <div className="card-grid view-enter">
      <a href="https://ajayrojha.github.io/Stockmonitor/" className="glass-card card-stock" target="_blank" rel="noopener noreferrer">
        <div className="icon-wrapper">
          <TrendingUp size={40} strokeWidth={1.5} />
        </div>
        <h2>Stock Monitor</h2>
        <p>Real-time stock tracking and predictive trading options.</p>
      </a>

      <a href="https://ajayrojha.github.io/box-breathing/" className="glass-card card-breathe" target="_blank" rel="noopener noreferrer">
        <div className="icon-wrapper">
          <Wind size={40} strokeWidth={1.5} />
        </div>
        <h2>Box Breathing</h2>
        <p>A calming exercise to help relax your central nervous system.</p>
      </a>
    </div>
  );

  const renderGames = () => (
    <div className="card-grid view-enter">
      <div className="glass-card card-math" onClick={() => setCurrentView('MATH_GAME')}>
        <div className="icon-wrapper">
          <Calculator size={40} strokeWidth={1.5} />
        </div>
        <h2>Math Adventures</h2>
        <p>For the 7-year old! Solve fun math puzzles in space.</p>
      </div>

      <div className="glass-card card-puzzle">
        <div className="icon-wrapper">
          <Puzzle size={40} strokeWidth={1.5} />
        </div>
        <h2>Shape Sorter</h2>
        <p>For the 4-year old! Play and learn with colors and shapes.</p>
      </div>
    </div>
  );

  let title = 'Welcome Hub';
  let subtitle = 'Select a category to get started';
  let content = renderHome();

  if (currentView === 'APPS') {
    title = 'Applications';
    subtitle = 'Your custom tools and utilities';
    content = renderApps();
  } else if (currentView === 'GAMES') {
    title = 'Games';
    subtitle = 'Fun activities for the family';
    content = renderGames();
  }

  if (currentView === 'MATH_GAME') {
    return <MathGame onBack={() => setCurrentView('HOME')} />;
  }

  return (
    <div className="app-container">
      <header>
        <div className="logo" onClick={() => setCurrentView('HOME')}>
          ajayrojha
        </div>
        {currentView !== 'HOME' && (
          <button className="back-btn" onClick={() => setCurrentView('HOME')}>
            <ArrowLeft size={18} />
            Back to Hub
          </button>
        )}
      </header>

      <main className="main-content">
        <h1 className="title" key={`${currentView}-title`}>{title}</h1>
        <p className="subtitle" key={`${currentView}-subtitle`}>{subtitle}</p>
        
        {content}
      </main>
    </div>
  );
}
