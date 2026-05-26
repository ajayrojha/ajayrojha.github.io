import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import './MathGame.css';
import { Trophy, Star, ArrowLeft, Play } from 'lucide-react';
import PlayerSelect from './components/PlayerSelect';
import { ImageStore } from './assets/ImageStore';

const THEMES = [null, ImageStore.bg_scifi_png, ImageStore.bg_alien_png, ImageStore.bg_cartoon_png];

const calculateLeft = (expr) => {
  if (typeof expr === 'number') return expr;
  const parts = String(expr).split(' ');
  if (parts.length < 3) return parseInt(expr) || 0;
  const a = parseInt(parts[0]);
  const op = parts[1];
  const b = parseInt(parts[2]);
  if (op === '+') return a + b;
  if (op === '-') return a - b;
  if (op === 'x') return a * b;
  return a;
};

export default function MathGame({ onBack }) {
  const [activeProfile, setActiveProfile] = useState(null);

  // --- Game State ---
  const [streak, setStreak] = useState(0);
  const [question, setQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [bgTheme, setBgTheme] = useState(THEMES[0]);
  
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
    const rand = Math.random();
    let type = 'arithmetic'; // default
    
    if (currentStreak >= 2) {
      if (rand < 0.25) type = 'comparison';
      else if (rand < 0.45) type = 'multiplication';
      else if (rand < 0.55) type = 'division';
      else if (rand < 0.8) type = 'word_problem';
    } else {
      if (rand < 0.25) type = 'word_problem';
    }

    let num1, num2, operator, answer, text = '';
    
    if (isChallenge) {
      const challengeRand = Math.random();
      if (challengeRand < 0.4) {
        // Harder arithmetic: 2-digit with carry
        operator = Math.random() > 0.5 ? '+' : '-';
        if (operator === '+') {
          num1 = Math.floor(Math.random() * 50) + 20; // 20-69
          num2 = Math.floor(Math.random() * 40) + 15; // 15-54
          answer = num1 + num2;
        } else {
          num1 = Math.floor(Math.random() * 60) + 40; // 40-99
          num2 = Math.floor(Math.random() * 35) + 10; // 10-44
          answer = num1 - num2;
        }
        type = 'arithmetic';
      } else if (challengeRand < 0.7) {
        type = 'comparison';
      } else {
        type = 'word_problem';
      }
    }

    if (type === 'arithmetic') {
      operator = Math.random() > 0.5 ? '+' : '-';
      if (operator === '+') {
        num1 = Math.floor(Math.random() * 40) + 10; // 10-49
        num2 = Math.floor(Math.random() * 40) + 10; // 10-49
        answer = num1 + num2;
      } else {
        num1 = Math.floor(Math.random() * 50) + 30; // 30-79
        num2 = Math.floor(Math.random() * 25) + 5;  // 5-29
        answer = num1 - num2;
      }
    } else if (type === 'multiplication') {
      operator = 'x';
      num1 = Math.floor(Math.random() * 4) + 2; // 2-5
      num2 = Math.floor(Math.random() * 8) + 1; // 1-8
      answer = num1 * num2;
    } else if (type === 'division') {
      operator = '÷';
      const quotient = Math.floor(Math.random() * 6) + 1; // 1-6
      num2 = Math.floor(Math.random() * 4) + 2; // divisor: 2-5
      num1 = quotient * num2; // dividend
      answer = quotient;
    } else if (type === 'word_problem') {
      const problemType = Math.floor(Math.random() * 3);
      if (problemType === 0) {
        num1 = Math.floor(Math.random() * 25) + 10;
        num2 = Math.floor(Math.random() * 15) + 5;
        const items = ['marbles', 'balloons', 'stickers', 'apples', 'shells'][Math.floor(Math.random() * 5)];
        const names = ['Liam', 'Emma', 'Noah', 'Olivia', 'Lucas'][Math.floor(Math.random() * 5)];
        text = `${names} has ${num1} ${items} and gets ${num2} more. How many ${items} in total?`;
        operator = '+';
        answer = num1 + num2;
      } else if (problemType === 1) {
        num1 = Math.floor(Math.random() * 30) + 20;
        num2 = Math.floor(Math.random() * 15) + 5;
        const items = ['cupcakes', 'crayons', 'toy cars', 'strawberries'][Math.floor(Math.random() * 4)];
        const names = ['Mia', 'Ethan', 'Sophia', 'Mason'][Math.floor(Math.random() * 4)];
        text = `${names} has ${num1} ${items} and gives away ${num2} of them. How many are left?`;
        operator = '-';
        answer = num1 - num2;
      } else {
        num1 = Math.floor(Math.random() * 3) + 2; // 2-4 groups
        num2 = Math.floor(Math.random() * 5) + 2; // 2-6 per group
        const groupName = ['boxes', 'bags', 'baskets', 'shelves'][Math.floor(Math.random() * 4)];
        const itemName = ['toys', 'cookies', 'books', 'oranges'][Math.floor(Math.random() * 4)];
        text = `There are ${num1} ${groupName}. Each ${groupName.slice(0, -1)} has ${num2} ${itemName}. How many ${itemName} are there in all?`;
        operator = 'x';
        answer = num1 * num2;
      }
    } else if (type === 'comparison') {
      operator = '?';
      const format = Math.random();
      if (format < 0.4) {
        const op = Math.random() > 0.5 ? '+' : '-';
        if (op === '+') {
          const a = Math.floor(Math.random() * 20) + 10;
          const b = Math.floor(Math.random() * 15) + 5;
          num1 = `${a} + ${b}`;
          const sum = a + b;
          const offset = Math.floor(Math.random() * 5) - 2;
          num2 = sum + offset;
          answer = sum > num2 ? '>' : (sum < num2 ? '<' : '=');
        } else {
          const a = Math.floor(Math.random() * 30) + 20;
          const b = Math.floor(Math.random() * 15) + 5;
          num1 = `${a} - ${b}`;
          const diff = a - b;
          const offset = Math.floor(Math.random() * 5) - 2;
          num2 = diff + offset;
          answer = diff > num2 ? '>' : (diff < num2 ? '<' : '=');
        }
      } else if (format < 0.7) {
        const a = Math.floor(Math.random() * 4) + 2;
        const b = Math.floor(Math.random() * 6) + 1;
        num1 = `${a} x ${b}`;
        const prod = a * b;
        const offset = Math.floor(Math.random() * 4) - 2;
        num2 = prod + offset;
        answer = prod > num2 ? '>' : (prod < num2 ? '<' : '=');
      } else {
        const a = Math.floor(Math.random() * 80) + 10;
        const offset = Math.floor(Math.random() * 20) - 10;
        num1 = a;
        num2 = a + offset;
        answer = a > num2 ? '>' : (a < num2 ? '<' : '=');
      }
    }

    setQuestion({ type, num1, num2, operator, answer, text, isChallenge });
    setUserAnswer('');
    setFeedback(null);
    if (inputRef.current) inputRef.current.focus();
  };

  const handleComparisonAnswer = (op) => {
    if (feedback) return;

    setUserAnswer(op);
    if (op === question.answer) {
      setFeedback('CORRECT');
      updateGlobalScore(question.isChallenge ? 20 : 10);
      
      const newStreak = streak + 1;
      setStreak(newStreak);
      triggerReward();

      if (question.isChallenge) {
        const newTheme = THEMES[Math.floor(Math.random() * 3) + 1];
        setBgTheme(newTheme);
      }

      setTimeout(() => {
        generateQuestion(newStreak);
      }, 2500);
    } else {
      setFeedback('INCORRECT');
      setStreak(0);
      
      const leftVal = calculateLeft(question.num1);
      const signText = question.answer === '>' ? 'greater than' : (question.answer === '<' ? 'less than' : 'equal to');
      const expText = `Let's check: ${question.num1} equals ${leftVal}. Since ${leftVal} is ${signText} ${question.num2}, the correct sign is ${question.answer}.`;
      setExplanation(expText);
    }
  };

  const handleKeypadPress = (val) => {
    if (feedback) return;
    if (val === 'clear') {
      setUserAnswer('');
    } else if (val === 'backspace') {
      setUserAnswer(prev => prev.slice(0, -1));
    } else {
      if (userAnswer.length < 4) {
        setUserAnswer(prev => prev + val);
      }
    }
  };

  const submitAnswer = () => {
    if (!userAnswer || feedback) return;

    if (parseInt(userAnswer) === question.answer) {
      setFeedback('CORRECT');
      updateGlobalScore(question.isChallenge ? 20 : 10);
      
      const newStreak = streak + 1;
      setStreak(newStreak);
      triggerReward();

      if (question.isChallenge) {
        const newTheme = THEMES[Math.floor(Math.random() * 3) + 1];
        setBgTheme(newTheme);
      }

      setTimeout(() => {
        generateQuestion(newStreak);
      }, 2500);
    } else {
      setFeedback('INCORRECT');
      setStreak(0);
      
      let expText = '';
      if (question.operator === '+') {
        expText = `Oops! If you have ${question.num1} and add ${question.num2} more, you get ${question.answer}.`;
      } else if (question.operator === '-') {
        expText = `Not quite! If you have ${question.num1} and take away ${question.num2}, you have ${question.answer} left.`;
      } else if (question.operator === 'x') {
        expText = `Oops! ${question.num1} groups of ${question.num2} equals ${question.answer}.`;
      } else if (question.operator === '÷') {
        expText = `Oops! If you share ${question.num1} items into ${question.num2} equal groups, each group gets ${question.answer}.`;
      }
      setExplanation(expText);
    }
  };

  const handleAnswerSubmit = (e) => {
    if (e) e.preventDefault();
    submitAnswer();
  };

  // Physical Keyboard Listener
  useEffect(() => {
    const handlePhysicalKeyDown = (e) => {
      if (!activeProfile || !question || question.type === 'comparison' || feedback !== null) return;

      if (e.key >= '0' && e.key <= '9') {
        handleKeypadPress(e.key);
      } else if (e.key === 'Backspace') {
        handleKeypadPress('backspace');
      } else if (e.key === 'Escape') {
        handleKeypadPress('clear');
      } else if (e.key === 'Enter') {
        e.preventDefault();
        submitAnswer();
      }
    };

    window.addEventListener('keydown', handlePhysicalKeyDown);
    return () => window.removeEventListener('keydown', handlePhysicalKeyDown);
  }, [activeProfile, question, userAnswer, feedback]);

  // Run generation only when profile is actually picked
  useEffect(() => {
    if (activeProfile && !question) {
       generateQuestion(0);
    }
  }, [activeProfile]);

  if (!activeProfile) {
    return <PlayerSelect onSelectProfile={setActiveProfile} onBack={onBack} />;
  }

  const containerStyle = bgTheme ? {
    backgroundImage: `url(${bgTheme})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    borderRadius: '30px',
    boxShadow: 'inset 0 0 100px rgba(0,0,0,0.8)'
  } : {};

  return (
    <div className="math-container view-enter" style={containerStyle}>
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
            {question?.type === 'word_problem' && (
              <div className="word-problem-box slide-down">
                <p>{question.text}</p>
              </div>
            )}

            {question?.type === 'comparison' ? (
              <div className="comparison-zone">
                <div className="question-display comparison">
                  <span className="number">{question?.num1}</span>
                  <span className="operator font-neon-orange">?</span>
                  <span className="number">{question?.num2}</span>
                </div>
                <p className="comp-instructions">Select the correct symbol to compare:</p>
                <div className="comp-btn-zone">
                  <button type="button" className="comp-btn btn-less" onClick={() => handleComparisonAnswer('<')}>&lt;</button>
                  <button type="button" className="comp-btn btn-equal" onClick={() => handleComparisonAnswer('=')}>=</button>
                  <button type="button" className="comp-btn btn-greater" onClick={() => handleComparisonAnswer('>')}>&gt;</button>
                </div>
              </div>
            ) : (
              <>
                <div className="question-display">
                  <span className="number">{question?.num1}</span>
                  <span className="operator">{question?.operator}</span>
                  <span className="number">{question?.num2}</span>
                  <span className="equals">=</span>
                  <div className="answer-display">
                    {userAnswer || <span className="answer-placeholder">?</span>}
                  </div>
                </div>

                <div className="math-keypad">
                  <button type="button" className="keypad-btn" onClick={() => handleKeypadPress('1')}>1</button>
                  <button type="button" className="keypad-btn" onClick={() => handleKeypadPress('2')}>2</button>
                  <button type="button" className="keypad-btn" onClick={() => handleKeypadPress('3')}>3</button>
                  
                  <button type="button" className="keypad-btn" onClick={() => handleKeypadPress('4')}>4</button>
                  <button type="button" className="keypad-btn" onClick={() => handleKeypadPress('5')}>5</button>
                  <button type="button" className="keypad-btn" onClick={() => handleKeypadPress('6')}>6</button>
                  
                  <button type="button" className="keypad-btn" onClick={() => handleKeypadPress('7')}>7</button>
                  <button type="button" className="keypad-btn" onClick={() => handleKeypadPress('8')}>8</button>
                  <button type="button" className="keypad-btn" onClick={() => handleKeypadPress('9')}>9</button>
                  
                  <button type="button" className="keypad-btn keypad-clear" onClick={() => handleKeypadPress('clear')}>Clear</button>
                  <button type="button" className="keypad-btn" onClick={() => handleKeypadPress('0')}>0</button>
                  <button type="button" className="keypad-btn keypad-backspace" onClick={() => handleKeypadPress('backspace')}>⌫</button>
                </div>

                <button type="submit" className="submit-btn" disabled={!userAnswer}>Go! <Play size={24} fill="currentColor" /></button>
              </>
            )}
          </form>
        )}

        {feedback === 'CORRECT' && (
          <div className="feedback-correct bounce-in">
            <h1>🎉 YAY! AWESOME JOB! 🎉</h1>
            {question.type === 'comparison' ? (
              <p className="big-answer">{question.num1} <span className="font-neon-green">{question.answer}</span> {question.num2}</p>
            ) : (
              <p className="big-answer">{question.num1} {question.operator} {question.num2} = {question.answer}</p>
            )}
          </div>
        )}

        {feedback === 'INCORRECT' && (
          <div className="feedback-incorrect shake">
            <h1>Whoops! Let's try again.</h1>
            <div className="explanation-box">
              <p>{explanation}</p>
              {typeof question.answer === 'number' && (
                <div className="math-visual">
                   {Array.from({ length: Math.min(question.answer, 20) }).map((_, i) => (
                      <span key={i} className="visual-block"></span>
                   ))}
                   {question.answer > 20 && <span>... (+ {question.answer - 20} more)</span>}
                </div>
              )}
            </div>
            <button className="next-btn" onClick={() => generateQuestion(0)} autoFocus>Try Next Question</button>
          </div>
        )}
      </div>
    </div>
  );
}
