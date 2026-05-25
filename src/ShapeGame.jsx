import React, { useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import './ShapeGame.css';
import { Trophy, ArrowLeft, Circle, Square, Triangle, Hexagon, Star, Moon, Heart } from 'lucide-react';
import PlayerSelect from './components/PlayerSelect';

// Expanded Shape Catalog with friendly names
const SHAPE_TEMPLATES = [
  { id: 'circle',   component: Circle,   name: 'Circle' },
  { id: 'square',   component: Square,   name: 'Square' },
  { id: 'triangle', component: Triangle, name: 'Triangle' },
  { id: 'hexagon',  component: Hexagon,  name: 'Hexagon' },
  { id: 'star',     component: Star,     name: 'Star' },
  { id: 'crescent', component: Moon,     name: 'Crescent' },
  { id: 'heart',    component: Heart,    name: 'Heart' },
];

// Color palette with names for matching gameplay
const COLOR_PALETTE = [
  { hex: '#ef4444', name: 'Red' },
  { hex: '#3b82f6', name: 'Blue' },
  { hex: '#f59e0b', name: 'Yellow' },
  { hex: '#10b981', name: 'Green' },
  { hex: '#8b5cf6', name: 'Purple' },
  { hex: '#ec4899', name: 'Pink' },
];

// ---- Pure generator helpers (no state mutation) ----

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const pickExcluding = (arr, exclude) => {
  const filtered = arr.filter((x) => x !== exclude);
  return pick(filtered);
};
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

function buildMatchRound() {
  const targetShape = pick(SHAPE_TEMPLATES);
  const targetColor = pick(COLOR_PALETTE);
  const target = { shape: targetShape, color: targetColor };

  const dist1Color = pickExcluding(COLOR_PALETTE, targetColor);
  const dist1 = { shape: targetShape, color: dist1Color };

  const dist2Shape = pickExcluding(SHAPE_TEMPLATES, targetShape);
  const dist2 = { shape: dist2Shape, color: targetColor };

  const dist3Shape = pickExcluding(SHAPE_TEMPLATES, targetShape);
  const dist3Color = pickExcluding(COLOR_PALETTE, targetColor);
  const dist3 = { shape: dist3Shape, color: dist3Color };

  return {
    mode: 'match',
    target,
    options: shuffle([target, dist1, dist2, dist3]),
  };
}

function buildPatternRound() {
  const shapeA = pick(SHAPE_TEMPLATES);
  const colorA = pick(COLOR_PALETTE);
  const shapeB = pickExcluding(SHAPE_TEMPLATES, shapeA);
  const colorB = pickExcluding(COLOR_PALETTE, colorA);

  const itemA = { shape: shapeA, color: colorA };
  const itemB = { shape: shapeB, color: colorB };

  // Pattern shown: A B A B  → answer is A
  const sequence = [itemA, itemB, itemA, itemB];
  const correct = itemA;

  // Distractors: itemB (wrong), and a totally new combo (wrong)
  const shapeC = pickExcluding(SHAPE_TEMPLATES, shapeA);
  const colorC = pickExcluding(COLOR_PALETTE, colorA);
  const dist2 = { shape: shapeC, color: colorC };

  return {
    mode: 'pattern',
    sequence,
    correct,
    options: shuffle([correct, itemB, dist2]),
  };
}

// ---- Component ----

export default function ShapeGame({ onBack }) {
  const [activeProfile, setActiveProfile] = useState(null);

  // Single unified round object — no stale-closure risk
  const [round, setRound]       = useState(null);
  const [feedback, setFeedback] = useState(null); // 'CORRECT' | 'INCORRECT' | null
  const [locked, setLocked]     = useState(false); // prevent double-tap during feedback

  const updateGlobalScore = useCallback(
    (points) => {
      if (!activeProfile) return;
      const updated = { ...activeProfile, score: activeProfile.score + points };
      setActiveProfile(updated);
      const saved = localStorage.getItem('hub-profiles');
      if (saved) {
        const parsed = JSON.parse(saved);
        const newProfiles = parsed.map((p) => (p.id === activeProfile.id ? updated : p));
        localStorage.setItem('hub-profiles', JSON.stringify(newProfiles));
      }
    },
    [activeProfile]
  );

  const triggerReward = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.75 },
      colors: ['#ef4444', '#3b82f6', '#f59e0b', '#10b981', '#8b5cf6', '#ec4899'],
    });
  };

  // Build a fresh round — alternate modes so the player sees both
  const nextRound = useCallback((prevMode) => {
    const usePattern = prevMode === 'match'; // alternate every round
    const newRound = usePattern ? buildPatternRound() : buildMatchRound();
    setRound(newRound);
    setFeedback(null);
    setLocked(false);
  }, []);

  const startGame = useCallback(() => {
    setRound(buildMatchRound()); // always start with a match round
    setFeedback(null);
    setLocked(false);
  }, []);

  // Called when player selects an option
  const handleAnswer = useCallback(
    (selected) => {
      if (locked || feedback) return;
      setLocked(true);

      const isCorrect =
        round.mode === 'match'
          ? selected.shape.id === round.target.shape.id &&
            selected.color.hex === round.target.color.hex
          : selected.shape.id === round.correct.shape.id &&
            selected.color.hex === round.correct.color.hex;

      if (isCorrect) {
        setFeedback('CORRECT');
        updateGlobalScore(15);
        triggerReward();
        setTimeout(() => nextRound(round.mode), 2200);
      } else {
        setFeedback('INCORRECT');
        setTimeout(() => {
          setFeedback(null);
          setLocked(false);
        }, 1200);
      }
    },
    [locked, feedback, round, updateGlobalScore, nextRound]
  );

  // Player selection screen
  if (!activeProfile) {
    return (
      <PlayerSelect
        onSelectProfile={(p) => {
          setActiveProfile(p);
          setRound(buildMatchRound());
        }}
        onBack={onBack}
      />
    );
  }

  if (!round) return null;

  return (
    <div className="shape-container view-enter">
      <div className="math-header">
        <button className="math-small-btn" onClick={() => setActiveProfile(null)}>
          <ArrowLeft size={16} /> Switch Player
        </button>
        <div className="math-stats">
          <div className="stat-pill">
            <Trophy size={16} color="#f59e0b" /> Score: {activeProfile?.score}
          </div>
        </div>
      </div>

      <div className="shape-board">
        {/* ── MATCH MODE ── */}
        {round.mode === 'match' && (
          <div className="shape-matcher-layout">
            <h1 className="shape-prompt">
              Find the{' '}
              <span
                className="highlight-color"
                style={{
                  color: round.target.color.hex,
                  textShadow: `0 0 10px ${round.target.color.hex}88`,
                }}
              >
                {round.target.color.name}
              </span>{' '}
              {round.target.shape.name}!
            </h1>

            <div className="options-zone">
              {round.options.map((item, idx) => {
                const Icon = item.shape.component;
                return (
                  <button
                    key={idx}
                    className="shape-block match-item bounce-in"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      border: `3px solid ${item.color.hex}`,
                      boxShadow: `0 8px 24px ${item.color.hex}22`,
                    }}
                    onClick={() => handleAnswer(item)}
                    disabled={locked}
                  >
                    <Icon size={64} color={item.color.hex} fill={item.color.hex} strokeWidth={0} />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── PATTERN MODE ── */}
        {round.mode === 'pattern' && (
          <div className="shape-pattern-layout">
            <h1 className="shape-prompt">What comes next to complete the pattern?</h1>

            {/* Sequence display */}
            <div className="pattern-sequence-box">
              {round.sequence.map((item, idx) => {
                const Icon = item.shape.component;
                return (
                  <div key={idx} className="pattern-node bounce-in">
                    <div
                      className="pattern-icon-circle"
                      style={{
                        border: `2px solid ${item.color.hex}`,
                        boxShadow: `0 0 10px ${item.color.hex}33`,
                      }}
                    >
                      <Icon size={40} color={item.color.hex} fill={item.color.hex} strokeWidth={0} />
                    </div>
                    <span className="pattern-arrow">→</span>
                  </div>
                );
              })}
              <div className="pattern-node question-node animate-pulse">
                <span className="question-mark">?</span>
              </div>
            </div>

            {/* Options */}
            <div className="options-zone pattern-options">
              {round.options.map((item, idx) => {
                const Icon = item.shape.component;
                return (
                  <button
                    key={idx}
                    className="shape-block pattern-item"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      border: `3px solid ${item.color.hex}`,
                      boxShadow: `0 8px 24px ${item.color.hex}22`,
                    }}
                    onClick={() => handleAnswer(item)}
                    disabled={locked}
                  >
                    <Icon size={56} color={item.color.hex} fill={item.color.hex} strokeWidth={0} />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── FEEDBACK ── */}
        {feedback === 'CORRECT' && (
          <div className="shape-feedback correct slide-up">🎉 Awesome! That's correct! 🎉</div>
        )}
        {feedback === 'INCORRECT' && (
          <div className="shape-feedback incorrect shake">❌ Try again, you can do it!</div>
        )}
      </div>
    </div>
  );
}
