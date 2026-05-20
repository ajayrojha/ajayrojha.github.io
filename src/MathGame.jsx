import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import './MathGame.css';
import { Trophy, Star, ArrowLeft, Play } from 'lucide-react';
import PlayerSelect from './components/PlayerSelect';

export default function MathGame({ onBack }) {
  const [activeProfile, setActiveProfile] = useState(null);

  // --- Game State ---
  const [streak, setStreak] = useState(0);
  const [question, setQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  
  // Feedback state
  const [feedback, setFeedback] = useState(null); // 'CORRECT', 'INCORRECT', null
  const [explanation, setExplanation] = useState('');

  const inputRef = useRef(null);

  const updateGlobalScore = (points) => {
    if (!activeProfile) return;
    const updatedProfile = { ...activeProfile, score: activeProfile.score + points };
    setActiveProfile(updatedProfile);
    
    // We must update the profile in localStorage directly
    const saved = localStorage.getItem('hub-profiles');
    if (saved) {
      const parsed = JSON.parse(saved);
      const newProfiles = parsed.map(p => p.id === activeProfile.id ? updatedProfile : p);
      localStorage.setItem('hub-profiles', JSON.stringify(newProfiles));
    }
  };

  const triggerReward = () => {
    const duration = 2000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    const randomInRange = (min, max) => Math.random() * (max - min) + min;
  
    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 40 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
  };

  const generateQuestion = (currentStreak) => {
    const isChallenge = currentStreak > 0 && currentStreak % 3 === 0;
    let num1, num2, operator, answer;

    if (isChallenge) {
      if (Math.random() > 0.5) {
        num1 = Math.floor(Math.random() * 5) + 1; 
        num2 = Math.floor(Math.random() * 5) + 1; 
        operator = 'x';
        answer = num1 * num2;
      } else {
        num1 = Math.floor(Math.random() * 15) + 10; 
        num2 = Math.floor(Math.random() * 10) + 1;  
        operator = '+';
        answer = num1 + num2;
      }
    } else {
      operator = Math.random() > 0.5 ? '+' : '-';
      if (operator === '+') {
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        answer = num1 + num2;
      } else {
        num1 = Math.floor(Math.random() * 10) + 5; 
        num2 = Math.floor(Math.random() * (num1 - 1)) + 1; 
        answer = num1 - num2;
      }
    }

    setQuestion({ num1, num2, operator, answer, isChallenge });
    setUserAnswer('');
    setFeedback(null);
    if (inputRef.current) inputRef.current.focus();
  };

  const handleAnswerSubmit = (e) => {
    e.preventDefault();
    if (!userAnswer || feedback) return;

    if (parseInt(userAnswer) === question.answer) {
      // CORRECT
      setFeedback('CORRECT');
      updateGlobalScore(question.isChallenge ? 20 : 10);
      
      const newStreak = streak + 1;
      setStreak(newStreak);
      triggerReward();

      // No more background changing logic here

      setTimeout(() => {
        generateQuestion(newStreak);
      }, 2500);
    } else {
      // INCORRECT
      setFeedback('INCORRECT');
      setStreak(0);
      
      let expText = '';
      if (question.operator === '+') {
        expText = `Oops! If you have ${question.num1} blocks and add ${question.num2} more, you count up to get ${question.answer}.`;
      } else if (question.operator === '-') {
        expText = `Not quite! If you have ${question.num1} and take away ${question.num2}, you have ${question.answer} left.`;
      } else if (question.operator === 'x') {
        expText = `Oops! ${question.num1} groups of ${question.num2} actually equals ${question.answer}.`;
      }
      setExplanation(expText);
    }
  };

  // Run generation only when profile is actually picked
  useEffect(() => {
    if (activeProfile && !question) {
       generateQuestion(0);
    }
  }, [activeProfile]);

  if (!activeProfile) {
    return <PlayerSelect onSelectProfile={setActiveProfile} onBack={onBack} />;
  }

  return (
    <div className="math-container view-enter">
      <div className="math-header">
        <button className="math-small-btn" onClick={() => setActiveProfile(null)}>
          <ArrowLeft size={16} /> Switch Player
        </button>
        <div className="math-stats">
          <div className="stat-pill"><Trophy size={16} color="#f59e0b" /> Score: {activeProfile?.score}</div>
          <div className="stat-pill"><Star size={16} color={streak > 2 ? "#ef4444" : "#3b82f6"} /> Streak: {streak}</div>
        </div>
      </div>

      <div className="game-board">
        {question?.isChallenge && (
          <div className="challenge-banner slide-down">
            🔥 CHALLENGE TIME! 🔥
          </div>
        )}

        {feedback === null && (
          <form className="question-form" onSubmit={handleAnswerSubmit}>
            <div className="question-display">
              <span className="number">{question?.num1}</span>
              <span className="operator">{question?.operator}</span>
              <span className="number">{question?.num2}</span>
              <span className="equals">=</span>
              <input 
                ref={inputRef}
                type="number" 
                className="answer-input"
                value={userAnswer}
                onChange={e => setUserAnswer(e.target.value)}
                autoFocus
              />
            </div>
            <button type="submit" className="submit-btn" disabled={!userAnswer}>Go! <Play size={24} fill="currentColor" /></button>
          </form>
        )}

        {feedback === 'CORRECT' && (
          <div className="feedback-correct bounce-in">
            <h1>🎉 YAY! AWESOME JOB! 🎉</h1>
            <p className="big-answer">{question.num1} {question.operator} {question.num2} = {question.answer}</p>
          </div>
        )}

        {feedback === 'INCORRECT' && (
          <div className="feedback-incorrect shake">
            <h1>Whoops! Let's try again.</h1>
            <div className="explanation-box">
              <p>{explanation}</p>
              <div className="math-visual">
                 {Array.from({ length: Math.min(question.answer, 20) }).map((_, i) => (
                    <span key={i} className="visual-block"></span>
                 ))}
                 {question.answer > 20 && <span>... (+ {question.answer - 20} more)</span>}
              </div>
            </div>
            <button className="next-btn" onClick={() => generateQuestion(0)} autoFocus>Try Next Question</button>
          </div>
        )}
      </div>
    </div>
  );
}
