import { useState, useEffect, useCallback, useRef } from 'react';
import {
  BookOpen,
  Code2,
  Layers,
  MessageSquare,
  Globe,
  Timer,
  Search,
  Bookmark,
  CheckCircle2,
  Copy,
  Check,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  ArrowLeft,
  RotateCw,
  Plus,
  Trash2,
  Play,
  RotateCcw,
  Printer
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  SYSTEM_DESIGN_TOPICS,
  BEHAVIORAL_QUESTIONS,
  FRONTEND_CORE_TOPICS,
  FLASHCARDS_DATA,
  MOCK_INTERVIEW_QUESTIONS
} from './interviewData';
import { CURRICULUM_DATA } from './curriculumData';
import { ALL_CODING_PROBLEMS, CODING_COMPANIES } from './codingProblems';
import { LAST_UPDATED_ISO, LAST_UPDATED_LABEL } from './lastUpdated';
import ThemeToggle from './ThemeToggle';
import './InterviewPrep.css';

// Renders the light markdown used in answers: **bold**, *italic*, `code`
function renderInline(text) {
  return text.split(/(`[^`]+`|\*\*[^*]+\*\*|\*[^*\s][^*]*\*)/g).map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`') && part.length > 1) {
      return <code key={i}>{part.slice(1, -1)}</code>;
    }
    if (part.startsWith('**') && part.endsWith('**') && part.length > 3) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}

// Renders a full answer: fenced code blocks, bullet / numbered lines and paragraphs
function renderRich(text) {
  return text.split(/```[a-z]*\n?/).map((chunk, i) => {
    if (i % 2 === 1) {
      return (
        <pre key={i}>
          <code>{chunk.replace(/\n$/, '')}</code>
        </pre>
      );
    }
    return chunk
      .split('\n')
      .filter((line) => line.trim())
      .map((line, j) => {
        const bullet = line.match(/^(\s*)(?:•|-)\s+(.*)$/);
        const numbered = line.match(/^(\s*)(\d+)\.\s+(.*)$/);
        if (bullet) {
          return (
            <div key={`${i}-${j}`} className={`cl-li ${bullet[1] ? 'nested' : ''}`}>
              {renderInline(bullet[2])}
            </div>
          );
        }
        if (numbered) {
          return (
            <div key={`${i}-${j}`} className="cl-li numbered" data-n={`${numbered[2]}.`}>
              {renderInline(numbered[3])}
            </div>
          );
        }
        return (
          <p key={`${i}-${j}`} className="cl-para">
            {renderInline(line.trim())}
          </p>
        );
      });
  });
}

const CODE_LANGUAGES = {
  csharp: 'C#',
  javascript: 'JavaScript',
  python: 'Python',
  java: 'Java'
};

const COPY_FAILED_MESSAGE = "Couldn't copy. Your browser blocked clipboard access.";

// Clipboard API with a fallback for browsers/contexts where it is unavailable
async function writeClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(textarea);
      return ok;
    } catch {
      return false;
    }
  }
}

// Plain-text version of a question and all of its answers
function formatQAForClipboard(item) {
  const lines = [`Q: ${item.q}`, `A: ${item.short}`];
  (item.parts || []).forEach((part) => lines.push(`  - ${part.q} ${part.a}`));
  if (item.explain) lines.push('', item.explain);
  lines.push('', item.a.replace(/\*\*/g, ''));
  return lines.join('\n');
}

export default function InterviewPrep({ onBack }) {
  const [activeTab, setActiveTab] = useState('CURRICULUM');
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('ALL');
  const [companyFilter, setCompanyFilter] = useState('ALL');

  // Curriculum specific state
  const [curriculumCategory, setCurriculumCategory] = useState('ALL');
  // Full answers start collapsed; the one-liners and sub-answers are always visible
  const [expandedQAs, setExpandedQAs] = useState({});

  // Persistence State
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('prep_bookmarks') || '[]');
    } catch {
      return [];
    }
  });

  const [mastered, setMastered] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('prep_mastered') || '[]');
    } catch {
      return [];
    }
  });

  const [starStories, setStarStories] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('prep_star_stories') || '[]');
    } catch {
      return [];
    }
  });

  // Selected Detail States
  const [selectedDsa, setSelectedDsa] = useState(ALL_CODING_PROBLEMS[0]);
  const [selectedSys, setSelectedSys] = useState(SYSTEM_DESIGN_TOPICS[0]);
  const [selectedBeh, setSelectedBeh] = useState(BEHAVIORAL_QUESTIONS[0]);
  const [selectedFe, setSelectedFe] = useState(FRONTEND_CORE_TOPICS[0]);

  // Code Viewer State
  const [codeLang, setCodeLang] = useState('csharp');
  const [copiedCode, setCopiedCode] = useState(false);
  const [showHints, setShowHints] = useState(false);

  // Toast shown after copying
  const [toast, setToast] = useState(null); // { ok, message }
  const toastTimer = useRef(null);
  useEffect(() => () => clearTimeout(toastTimer.current), []);

  // STAR Form State
  const [starForm, setStarForm] = useState({
    title: '',
    situation: '',
    task: '',
    action: '',
    result: ''
  });

  // Flashcards State
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [flashcardCategory, setFlashcardCategory] = useState('ALL');

  // Mock Simulator State
  const [mockSessionActive, setMockSessionActive] = useState(false);
  const [mockQuestionIdx, setMockQuestionIdx] = useState(0);
  const [mockTimeRemaining, setMockTimeRemaining] = useState(600);
  const [mockUserNotes, setMockUserNotes] = useState('');
  const [mockRubricChecked, setMockRubricChecked] = useState({});
  const [mockCompleted, setMockCompleted] = useState(false);
  const [mockFinalScore, setMockFinalScore] = useState(0);

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('prep_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem('prep_mastered', JSON.stringify(mastered));
  }, [mastered]);

  useEffect(() => {
    localStorage.setItem('prep_star_stories', JSON.stringify(starStories));
  }, [starStories]);

  const handleFinishMock = useCallback(() => {
    setMockSessionActive(false);
    setMockCompleted(true);
    // Calculate Score
    const currentQ = MOCK_INTERVIEW_QUESTIONS[mockQuestionIdx];
    const checkedCount = Object.values(mockRubricChecked).filter(Boolean).length;
    const totalRubricItems = currentQ.rubric.length;
    const calculatedScore = Math.round((checkedCount / totalRubricItems) * 100);
    setMockFinalScore(calculatedScore);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  }, [mockQuestionIdx, mockRubricChecked]);

  // Mock Timer effect
  useEffect(() => {
    let timer;
    if (mockSessionActive && mockTimeRemaining > 0 && !mockCompleted) {
      timer = setInterval(() => {
        setMockTimeRemaining((prev) => prev - 1);
      }, 1000);
    } else if (mockSessionActive && mockTimeRemaining === 0 && !mockCompleted) {
      handleFinishMock();
    }
    return () => clearInterval(timer);
  }, [mockSessionActive, mockTimeRemaining, mockCompleted, handleFinishMock]);

  const toggleBookmark = (id) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleMastered = (id) => {
    setMastered((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleQA = (key) => {
    setExpandedQAs((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const expandAllQAs = () => {
    const allExpanded = {};
    CURRICULUM_DATA.forEach((sec) => {
      sec.topics.forEach((top) => {
        top.questions.forEach((_, qIdx) => {
          allExpanded[`${sec.id}-${top.name}-${qIdx}`] = true;
        });
      });
    });
    setExpandedQAs(allExpanded);
  };

  const collapseAllQAs = () => {
    setExpandedQAs({});
  };

  // Expand every answer first so the printout includes the full content
  const handlePrint = () => {
    expandAllQAs();
    setTimeout(() => window.print(), 100);
  };

  const showToast = (ok, message) => {
    clearTimeout(toastTimer.current);
    setToast({ ok, message });
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  };

  const copyToClipboard = async (text) => {
    const ok = await writeClipboard(text);
    if (ok) {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
    showToast(ok, ok ? 'Code copied to clipboard' : COPY_FAILED_MESSAGE);
  };

  const copyQuestionAndAnswer = async (item) => {
    const ok = await writeClipboard(formatQAForClipboard(item));
    showToast(ok, ok ? 'Question and answer copied to clipboard' : COPY_FAILED_MESSAGE);
  };

  // Count total curriculum questions
  let totalCurriculumCount = 0;
  CURRICULUM_DATA.forEach((s) =>
    s.topics.forEach((t) => (totalCurriculumCount += t.questions.length))
  );

  const totalQuestions =
    totalCurriculumCount +
    ALL_CODING_PROBLEMS.length +
    SYSTEM_DESIGN_TOPICS.length +
    BEHAVIORAL_QUESTIONS.length +
    FRONTEND_CORE_TOPICS.length;

  const readinessPercent = Math.min(
    100,
    Math.round((mastered.length / totalQuestions) * 100) || 0
  );

  // STAR Builder actions
  const handleSaveStarStory = (e) => {
    e.preventDefault();
    if (!starForm.title.trim()) return;
    const newStory = {
      id: 'star-' + Date.now(),
      ...starForm,
      createdAt: new Date().toLocaleDateString()
    };
    setStarStories([newStory, ...starStories]);
    setStarForm({ title: '', situation: '', task: '', action: '', result: '' });
  };

  const handleDeleteStarStory = (id) => {
    setStarStories(starStories.filter((s) => s.id !== id));
  };

  // Mock Simulator Actions
  const handleStartMock = () => {
    setMockSessionActive(true);
    setMockCompleted(false);
    setMockQuestionIdx(0);
    setMockRubricChecked({});
    setMockUserNotes('');
    setMockTimeRemaining(MOCK_INTERVIEW_QUESTIONS[0].timeLimitSeconds);
  };

  // Filtered coding problems (Algorithms tab)
  const codingQuery = searchQuery.trim().toLowerCase();
  const filteredCodingProblems = ALL_CODING_PROBLEMS.filter(
    (p) =>
      (difficultyFilter === 'ALL' || p.difficulty === difficultyFilter) &&
      (companyFilter === 'ALL' || p.companies.includes(companyFilter)) &&
      (!codingQuery ||
        [p.title, p.category, ...p.companies].some((text) =>
          text.toLowerCase().includes(codingQuery)
        ))
  );

  // Filtered Flashcards
  const filteredFlashcards = FLASHCARDS_DATA.filter((c) =>
    flashcardCategory === 'ALL' ? true : c.category === flashcardCategory
  );

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Filtered Curriculum Sections (each question keeps its original index so
  // mastered/expanded keys stay stable while searching)
  const query = searchQuery.trim().toLowerCase();
  const filteredCurriculum = CURRICULUM_DATA.filter(
    (sec) => curriculumCategory === 'ALL' || sec.id === curriculumCategory
  )
    .map((sec) => {
      const filteredTopics = sec.topics
        .map((top) => {
          const matchedQuestions = top.questions
            .map((q, index) => ({ ...q, index }))
            .filter(
              (q) =>
                !query ||
                [q.q, q.a, q.short, q.explain, top.name, sec.title]
                  .concat((q.parts || []).flatMap((p) => [p.q, p.a]))
                  .some((text) => text && text.toLowerCase().includes(query))
            );
          return { ...top, questions: matchedQuestions };
        })
        .filter((top) => top.questions.length > 0);

      return { ...sec, topics: filteredTopics };
    })
    .filter((sec) => sec.topics.length > 0);

  return (
    <div className="prep-container theme-scope">
      {/* Top Header */}
      <header className="prep-header">
        <div className="prep-header-top">
          <button className="back-btn" onClick={onBack}>
            <ArrowLeft size={16} />
            Back to hub
          </button>
          <div className="prep-header-meta">
            <p className="prep-updated">
              Last updated <time dateTime={LAST_UPDATED_ISO}>{LAST_UPDATED_LABEL}</time>
            </p>
            <ThemeToggle />
          </div>
        </div>

        <div className="prep-brand">
          <div className="prep-title-group">
            <h1>Interview Prep</h1>
            <p>
              Notes for full-stack .NET interviews: C#, ASP.NET Core, Azure, SQL, frontend,
              system design and problem solving.
            </p>
          </div>

          <div className="readiness-pill" title="Questions you've marked as mastered">
            <span>
              <strong>{mastered.length}</strong> of {totalQuestions} mastered
            </span>
            <div className="readiness-bar-mini" aria-hidden="true">
              <div
                className="readiness-fill-mini"
                style={{ width: `${readinessPercent}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Tabs Navigation */}
      <nav className="prep-tabs-nav">
        <button
          className={`prep-tab-btn ${activeTab === 'CURRICULUM' ? 'active' : ''}`}
          onClick={() => setActiveTab('CURRICULUM')}
        >
          <BookOpen size={18} />
          Study Guide
        </button>
        <button
          className={`prep-tab-btn ${activeTab === 'DSA' ? 'active' : ''}`}
          onClick={() => setActiveTab('DSA')}
        >
          <Code2 size={18} />
          Algorithms
        </button>
        <button
          className={`prep-tab-btn ${activeTab === 'SYSTEM_DESIGN' ? 'active' : ''}`}
          onClick={() => setActiveTab('SYSTEM_DESIGN')}
        >
          <Layers size={18} />
          System Design
        </button>
        <button
          className={`prep-tab-btn ${activeTab === 'BEHAVIORAL' ? 'active' : ''}`}
          onClick={() => setActiveTab('BEHAVIORAL')}
        >
          <MessageSquare size={18} />
          Behavioral
        </button>
        <button
          className={`prep-tab-btn ${activeTab === 'FRONTEND' ? 'active' : ''}`}
          onClick={() => setActiveTab('FRONTEND')}
        >
          <Globe size={18} />
          Frontend
        </button>
        <button
          className={`prep-tab-btn ${activeTab === 'FLASHCARDS' ? 'active' : ''}`}
          onClick={() => setActiveTab('FLASHCARDS')}
        >
          <RotateCw size={18} />
          Flashcards
        </button>
        <button
          className={`prep-tab-btn ${activeTab === 'MOCK_SIMULATOR' ? 'active' : ''}`}
          onClick={() => setActiveTab('MOCK_SIMULATOR')}
        >
          <Timer size={18} />
          Mock Interview
        </button>
      </nav>

      {/* ============================================================
          TAB 0: FULL INTERVIEW CURRICULUM & STUDY GUIDE
          ============================================================ */}
      {activeTab === 'CURRICULUM' && (
        <div className="curriculum-container">
          {/* Search, Section Filter & Actions */}
          <div className="cl-toolbar">
            <div className="prep-search-box">
              <Search className="search-icon" size={16} />
              <input
                type="text"
                placeholder="Search questions and answers (e.g. LINQ, JWT, Saga)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="cl-actions">
              <button className="btn-secondary" onClick={expandAllQAs} title="Show every full answer">
                <ChevronDown size={16} /> Expand All
              </button>
              <button className="btn-secondary" onClick={collapseAllQAs} title="Hide every full answer">
                <ChevronUp size={16} /> Collapse All
              </button>
              <button className="btn-secondary" onClick={handlePrint} title="Print or save as PDF">
                <Printer size={16} /> Print
              </button>
            </div>
          </div>

          <div className="curriculum-nav-chips">
            <button
              className={`filter-chip ${curriculumCategory === 'ALL' ? 'active' : ''}`}
              onClick={() => setCurriculumCategory('ALL')}
            >
              All ({totalCurriculumCount})
            </button>
            {CURRICULUM_DATA.map((sec) => (
              <button
                key={sec.id}
                className={`filter-chip ${curriculumCategory === sec.id ? 'active' : ''}`}
                onClick={() => setCurriculumCategory(sec.id)}
              >
                {sec.title}
              </button>
            ))}
          </div>

          {filteredCurriculum.length === 0 && (
            <p className="cl-empty">No questions match &ldquo;{searchQuery}&rdquo;.</p>
          )}

          {/* Curriculum Sections List */}
          {filteredCurriculum.map((section) => {
            const sectionCount = section.topics.reduce((n, t) => n + t.questions.length, 0);
            let questionNumber = 0;

            return (
              <section key={section.id} className="cl-section">
                <div className="cl-section-header">
                  <h2>
                    {section.title}
                    <span className="cl-count">
                      {sectionCount} {sectionCount === 1 ? 'question' : 'questions'}
                    </span>
                  </h2>
                  <p>{section.summary}</p>
                </div>

                {section.topics.map((topic) => (
                  <div key={topic.name} className="cl-topic">
                    <h3>{topic.name}</h3>

                    <ol className="cl-list">
                      {topic.questions.map((item) => {
                        questionNumber += 1;
                        const qaKey = `${section.id}-${topic.name}-${item.index}`;
                        const isExpanded = !!expandedQAs[qaKey];
                        const isMastered = mastered.includes(qaKey);

                        return (
                          <li key={qaKey} className={`cl-item ${isMastered ? 'mastered' : ''}`}>
                            <div className="cl-q-row">
                              <span className="cl-num">{questionNumber}.</span>
                              <h4>{renderInline(item.q)}</h4>
                              {isMastered && (
                                <span className="cl-mastered-tag" title="Marked as mastered">
                                  <Check size={13} /> Mastered
                                </span>
                              )}
                            </div>

                            <p className="cl-short">{renderInline(item.short)}</p>

                            {item.parts && (
                              <ul className="cl-parts">
                                {item.parts.map((part) => (
                                  <li key={part.q}>
                                    <span className="cl-part-q">{renderInline(part.q)}</span>
                                    <span className="cl-part-a">{renderInline(part.a)}</span>
                                  </li>
                                ))}
                              </ul>
                            )}

                            <div className="cl-item-actions">
                              <button
                                className="cl-action"
                                onClick={() => toggleQA(qaKey)}
                                aria-expanded={isExpanded}
                              >
                                {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                                {isExpanded ? 'Hide full answer' : 'Full answer'}
                              </button>
                              <button
                                className="cl-action"
                                onClick={() => copyQuestionAndAnswer(item)}
                              >
                                <Copy size={15} /> Copy
                              </button>
                              <button
                                className={`cl-action ${isMastered ? 'is-on' : ''}`}
                                onClick={() => toggleMastered(qaKey)}
                                aria-pressed={isMastered}
                              >
                                <CheckCircle2 size={15} />
                                {isMastered ? 'Mastered' : 'Mark as mastered'}
                              </button>
                            </div>

                            {isExpanded && (
                              <div className="cl-detail">
                                {item.explain && <p className="cl-explain">{renderInline(item.explain)}</p>}
                                {renderRich(item.a)}
                              </div>
                            )}
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                ))}
              </section>
            );
          })}
        </div>
      )}

      {/* ============================================================
          TAB 1: ALGORITHMS & DATA STRUCTURES (DSA)
          ============================================================ */}
      {activeTab === 'DSA' && (
        <div>
          <div className="prep-toolbar">
            <div className="prep-search-box">
              <Search className="search-icon" size={16} />
              <input
                type="text"
                placeholder="Search algorithms, topics, companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <label className="company-select">
              <span>Asked at</span>
              <select value={companyFilter} onChange={(e) => setCompanyFilter(e.target.value)}>
                <option value="ALL">Any company</option>
                {CODING_COMPANIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>

            <div className="prep-filters-group">
              {['ALL', 'Easy', 'Medium', 'Hard'].map((diff) => (
                <button
                  key={diff}
                  className={`filter-chip ${difficultyFilter === diff ? 'active' : ''}`}
                  onClick={() => setDifficultyFilter(diff)}
                >
                  {diff === 'ALL' ? 'All levels' : diff}
                </button>
              ))}
            </div>
          </div>

          <p className="coding-note">
            {filteredCodingProblems.length} of {ALL_CODING_PROBLEMS.length} problems. Company tags
            show where each problem is commonly reported in public interview write-ups (LeetCode
            company tags, Glassdoor), not a guarantee it will be asked.
          </p>

          <div className="prep-split-layout">
            {/* Sidebar list */}
            <div className="prep-list-card">
              {filteredCodingProblems.length === 0 && (
                <p className="cl-empty" style={{ padding: '1rem' }}>No problems match these filters.</p>
              )}
              {filteredCodingProblems.map((prob) => {
                const isSelected = selectedDsa.id === prob.id;
                const isDone = mastered.includes(prob.id);
                const isSaved = bookmarks.includes(prob.id);

                return (
                  <div
                    key={prob.id}
                    className={`prep-item-row ${isSelected ? 'selected' : ''}`}
                    onClick={() => {
                      setSelectedDsa(prob);
                      setShowHints(false);
                    }}
                  >
                    <div className="prep-item-top">
                      <span className="prep-item-title">{prob.title}</span>
                      <span
                        className={`badge-difficulty badge-${prob.difficulty.toLowerCase()}`}
                      >
                        {prob.difficulty}
                      </span>
                    </div>
                    <div className="prep-item-sub">
                      <span>{prob.category}</span>
                      {isDone && (
                        <Check size={14} style={{ color: 'var(--green)', marginLeft: 'auto' }} />
                      )}
                      {isSaved && (
                        <Bookmark size={14} style={{ color: 'var(--accent)', fill: 'var(--accent)' }} />
                      )}
                    </div>
                    <div className="company-tags-mini">
                      {prob.companies.slice(0, 3).join(' · ')}
                      {prob.companies.length > 3 && ` +${prob.companies.length - 3}`}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Main detail */}
            <div className="prep-detail-panel">
              <div className="detail-header">
                <div className="detail-title-area">
                  <h2>{selectedDsa.title}</h2>
                  <div className="detail-meta-tags">
                    <span
                      className={`badge-difficulty badge-${selectedDsa.difficulty.toLowerCase()}`}
                    >
                      {selectedDsa.difficulty}
                    </span>
                    <span className="tag-complexity">Time: {selectedDsa.timeComplexity}</span>
                    <span className="tag-complexity">Space: {selectedDsa.spaceComplexity}</span>
                    <span className="tag-pill">{selectedDsa.category}</span>
                  </div>
                  <div className="company-tags">
                    <span className="company-tags-label">Asked at</span>
                    {selectedDsa.companies.map((c) => (
                      <button
                        key={c}
                        className={`company-tag ${companyFilter === c ? 'active' : ''}`}
                        onClick={() => setCompanyFilter(companyFilter === c ? 'ALL' : c)}
                        title={`Show problems asked at ${c}`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="detail-actions">
                  <button
                    className={`btn-action-icon ${
                      bookmarks.includes(selectedDsa.id) ? 'active-bookmark' : ''
                    }`}
                    onClick={() => toggleBookmark(selectedDsa.id)}
                    title="Bookmark Problem"
                  >
                    <Bookmark size={18} />
                  </button>
                  <button
                    className={`btn-action-icon ${
                      mastered.includes(selectedDsa.id) ? 'active-check' : ''
                    }`}
                    onClick={() => toggleMastered(selectedDsa.id)}
                    title="Mark Mastered"
                  >
                    <CheckCircle2 size={18} />
                  </button>
                </div>
              </div>

              <div className="detail-section">
                <h3>Description</h3>
                <p>{renderInline(selectedDsa.description)}</p>
              </div>

              <div className="detail-section">
                <h3>Examples</h3>
                {selectedDsa.examples.map((ex, idx) => (
                  <div key={idx} className="example-box">
                    <div>
                      <strong>Input:</strong> {ex.input}
                    </div>
                    <div>
                      <strong>Output:</strong> {ex.output}
                    </div>
                    {ex.explanation && (
                      <div style={{ color: 'var(--muted)', marginTop: '4px' }}>
                        <strong>Explanation:</strong> {ex.explanation}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Hints Drawer */}
              <div className="detail-section">
                <button
                  className="hint-toggle-btn"
                  onClick={() => setShowHints(!showHints)}
                >
                  <Lightbulb size={16} />
                  {showHints ? 'Hide Hints' : `Show Hints (${selectedDsa.hints.length})`}
                </button>

                {showHints && (
                  <div className="hints-content">
                    <ol>
                      {selectedDsa.hints.map((hint, i) => (
                        <li key={i}>{hint}</li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>

              {selectedDsa.approaches && (
                <div className="detail-section">
                  <h3>Approach</h3>
                  {selectedDsa.approaches.map((ap) => (
                    <p key={ap.name}>
                      <strong style={{ color: 'var(--ink)' }}>{ap.name}.</strong>{' '}
                      {renderInline(ap.explanation)}
                    </p>
                  ))}
                </div>
              )}

              {/* Multi-language Solutions */}
              <div className="detail-section">
                <h3>Solution</h3>
                <div className="code-viewer-container">
                  <div className="code-viewer-header">
                    <div className="code-lang-selector">
                      {Object.entries(CODE_LANGUAGES)
                        .filter(([lang]) => selectedDsa.solutions[lang])
                        .map(([lang, label]) => (
                          <button
                            key={lang}
                            className={`code-lang-btn ${codeLang === lang ? 'active' : ''}`}
                            onClick={() => setCodeLang(lang)}
                          >
                            {label}
                          </button>
                        ))}
                    </div>
                    <button
                      className="code-copy-btn"
                      onClick={() =>
                        copyToClipboard(
                          selectedDsa.solutions[codeLang] || selectedDsa.solutions.javascript
                        )
                      }
                    >
                      {copiedCode ? <Check size={14} /> : <Copy size={14} />}
                      {copiedCode ? 'Copied' : 'Copy Code'}
                    </button>
                  </div>
                  <pre className="code-block-pre">
                    <code>
                      {selectedDsa.solutions[codeLang] || selectedDsa.solutions.javascript}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          TAB 2: SYSTEM DESIGN ARCHITECTURE
          ============================================================ */}
      {activeTab === 'SYSTEM_DESIGN' && (
        <div className="prep-split-layout">
          <div className="prep-list-card">
            {SYSTEM_DESIGN_TOPICS.map((sys) => {
              const isSelected = selectedSys.id === sys.id;
              const isDone = mastered.includes(sys.id);

              return (
                <div
                  key={sys.id}
                  className={`prep-item-row ${isSelected ? 'selected' : ''}`}
                  onClick={() => setSelectedSys(sys)}
                >
                  <div className="prep-item-top">
                    <span className="prep-item-title">{sys.title}</span>
                    <span
                      className={`badge-difficulty badge-${sys.difficulty.toLowerCase()}`}
                    >
                      {sys.difficulty}
                    </span>
                  </div>
                  <div className="prep-item-sub">
                    <span>{sys.scale}</span>
                    {isDone && (
                      <Check size={14} style={{ color: 'var(--green)', marginLeft: 'auto' }} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="prep-detail-panel">
            <div className="detail-header">
              <div className="detail-title-area">
                <h2>{selectedSys.title}</h2>
                <div className="detail-meta-tags">
                  <span className="tag-complexity">{selectedSys.scale}</span>
                  {selectedSys.tags.map((t) => (
                    <span key={t} className="tag-pill">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="detail-actions">
                <button
                  className={`btn-action-icon ${
                    mastered.includes(selectedSys.id) ? 'active-check' : ''
                  }`}
                  onClick={() => toggleMastered(selectedSys.id)}
                  title="Mark Mastered"
                >
                  <CheckCircle2 size={18} />
                </button>
              </div>
            </div>

            <div className="detail-section">
              <h3>System Overview</h3>
              <p>{selectedSys.overview}</p>
            </div>

            <div className="detail-section">
              <h3>Capacity Math &amp; Scale Estimation</h3>
              <table className="capacity-table">
                <thead>
                  <tr>
                    <th>Metric</th>
                    <th>Estimation &amp; Dimensioning</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedSys.capacityEstimation.map((row, idx) => (
                    <tr key={idx}>
                      <td>
                        <strong>{row.metric}</strong>
                      </td>
                      <td>{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="detail-section">
              <h3>Core Architecture &amp; Component Breakdown</h3>
              {selectedSys.architecture.map((comp, idx) => (
                <div key={idx} className="architecture-card">
                  <h4>
                    {idx + 1}. {comp.component}
                  </h4>
                  <p>{comp.role}</p>
                </div>
              ))}
            </div>

            <div className="detail-section">
              <h3>Interviewer Deep-Dives &amp; Trade-Offs</h3>
              {selectedSys.deepDives.map((dd, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'var(--surface-2)',
                    border: '1px solid var(--line)',
                    borderRadius: '12px',
                    padding: '1rem 1.25rem',
                    marginBottom: '0.75rem'
                  }}
                >
                  <h4 style={{ color: 'var(--accent-2)', marginBottom: '0.4rem' }}>{dd.title}</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--ink-2)' }}>{dd.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          TAB 3: BEHAVIORAL & STAR STORY BUILDER
          ============================================================ */}
      {activeTab === 'BEHAVIORAL' && (
        <div>
          <div className="prep-split-layout">
            <div className="prep-list-card">
              {BEHAVIORAL_QUESTIONS.map((beh) => {
                const isSelected = selectedBeh.id === beh.id;
                return (
                  <div
                    key={beh.id}
                    className={`prep-item-row ${isSelected ? 'selected' : ''}`}
                    onClick={() => setSelectedBeh(beh)}
                  >
                    <div className="prep-item-top">
                      <span className="prep-item-title">{beh.category}</span>
                    </div>
                    <p
                      style={{
                        fontSize: '0.82rem',
                        color: 'var(--muted)',
                        margin: 0,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                      }}
                    >
                      {beh.question}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="prep-detail-panel">
              <div className="detail-header">
                <div className="detail-title-area">
                  <span className="tag-pill" style={{ color: 'var(--accent)' }}>
                    {selectedBeh.category}
                  </span>
                  <h2 style={{ marginTop: '0.5rem' }}>{selectedBeh.question}</h2>
                </div>
              </div>

              <div className="detail-section">
                <h3>What Interviewers Look For</h3>
                <ul>
                  {selectedBeh.interviewerLookingFor.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="detail-section">
                <h3>STAR Framework Breakdown</h3>
                <div className="star-breakdown-grid">
                  <div className="example-box">
                    <strong>Situation (S):</strong> {selectedBeh.starGuide.situation}
                  </div>
                  <div className="example-box">
                    <strong>Task (T):</strong> {selectedBeh.starGuide.task}
                  </div>
                  <div className="example-box">
                    <strong>Action (A):</strong> {selectedBeh.starGuide.action}
                  </div>
                  <div className="example-box">
                    <strong>Result (R):</strong> {selectedBeh.starGuide.result}
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>Model High-Scoring Answer</h3>
                <div
                  style={{
                    background: 'var(--code-bg)',
                    border: '1px solid var(--line)',
                    borderRadius: '12px',
                    padding: '1.25rem',
                    lineHeight: '1.7',
                    whiteSpace: 'pre-line',
                    color: 'var(--ink-2)'
                  }}
                >
                  {selectedBeh.sampleAnswer}
                </div>
              </div>
            </div>
          </div>

          {/* Interactive STAR Story Builder */}
          <div className="star-builder-card">
            <div className="star-builder-header">
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--ink)' }}>
                  Your STAR story bank
                </h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.88rem', margin: '4px 0 0 0' }}>
                  Structure and save your real project experiences. They're saved in this browser only.
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveStarStory}>
              <div className="star-field-group" style={{ marginBottom: '1.25rem' }}>
                <label>Story Headline / Project Name</label>
                <input
                  type="text"
                  placeholder="e.g. Migrated payment pipeline under tight 150ms SLA"
                  value={starForm.title}
                  onChange={(e) => setStarForm({ ...starForm, title: e.target.value })}
                  required
                />
              </div>

              <div className="star-grid">
                <div className="star-field-group">
                  <label>Situation (Context, stakes, environment)</label>
                  <textarea
                    placeholder="Describe the company, project, and challenge..."
                    value={starForm.situation}
                    onChange={(e) => setStarForm({ ...starForm, situation: e.target.value })}
                    required
                  />
                </div>
                <div className="star-field-group">
                  <label>Task (Your specific ownership &amp; goal)</label>
                  <textarea
                    placeholder="What were you directly responsible for achieving?"
                    value={starForm.task}
                    onChange={(e) => setStarForm({ ...starForm, task: e.target.value })}
                    required
                  />
                </div>
                <div className="star-field-group">
                  <label>Action (Concrete technical steps &amp; leadership)</label>
                  <textarea
                    placeholder="What tools, POCs, or architectural steps did you take?"
                    value={starForm.action}
                    onChange={(e) => setStarForm({ ...starForm, action: e.target.value })}
                    required
                  />
                </div>
                <div className="star-field-group">
                  <label>Result (Quantified metrics &amp; learnings)</label>
                  <textarea
                    placeholder="E.g. 99.99% uptime, reduced latency by 35%, zero defects..."
                    value={starForm.result}
                    onChange={(e) => setStarForm({ ...starForm, result: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="star-actions-bar">
                <button type="submit" className="btn-primary">
                  <Plus size={16} /> Save STAR Story
                </button>
              </div>
            </form>

            {/* Saved Stories List */}
            {starStories.length > 0 && (
              <div style={{ marginTop: '2rem' }}>
                <h4 style={{ color: 'var(--accent)', marginBottom: '1rem' }}>
                  Saved Stories ({starStories.length})
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {starStories.map((story) => (
                    <div
                      key={story.id}
                      style={{
                        background: 'var(--surface-2)',
                        border: '1px solid var(--line)',
                        borderRadius: '12px',
                        padding: '1.25rem'
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '0.75rem'
                        }}
                      >
                        <h5 style={{ fontSize: '1.1rem', color: 'var(--ink)', margin: 0 }}>
                          {story.title}
                        </h5>
                        <button
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--red)',
                            cursor: 'pointer'
                          }}
                          onClick={() => handleDeleteStarStory(story.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div style={{ fontSize: '0.88rem', color: 'var(--ink-2)', lineHeight: '1.6' }}>
                        <p>
                          <strong>S:</strong> {story.situation}
                        </p>
                        <p>
                          <strong>T:</strong> {story.task}
                        </p>
                        <p>
                          <strong>A:</strong> {story.action}
                        </p>
                        <p>
                          <strong>R:</strong> {story.result}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================
          TAB 4: FRONTEND & WEB CORE
          ============================================================ */}
      {activeTab === 'FRONTEND' && (
        <div className="prep-split-layout">
          <div className="prep-list-card">
            {FRONTEND_CORE_TOPICS.map((fe) => {
              const isSelected = selectedFe.id === fe.id;
              const isDone = mastered.includes(fe.id);

              return (
                <div
                  key={fe.id}
                  className={`prep-item-row ${isSelected ? 'selected' : ''}`}
                  onClick={() => setSelectedFe(fe)}
                >
                  <div className="prep-item-top">
                    <span className="prep-item-title">{fe.title}</span>
                    <span
                      className={`badge-difficulty badge-${fe.difficulty.toLowerCase()}`}
                    >
                      {fe.difficulty}
                    </span>
                  </div>
                  <div className="prep-item-sub">
                    <span>{fe.category}</span>
                    {isDone && (
                      <Check size={14} style={{ color: 'var(--green)', marginLeft: 'auto' }} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="prep-detail-panel">
            <div className="detail-header">
              <div className="detail-title-area">
                <h2>{selectedFe.title}</h2>
                <div className="detail-meta-tags">
                  <span className="tag-pill">{selectedFe.category}</span>
                  <span
                    className={`badge-difficulty badge-${selectedFe.difficulty.toLowerCase()}`}
                  >
                    {selectedFe.difficulty}
                  </span>
                </div>
              </div>
              <div className="detail-actions">
                <button
                  className={`btn-action-icon ${
                    mastered.includes(selectedFe.id) ? 'active-check' : ''
                  }`}
                  onClick={() => toggleMastered(selectedFe.id)}
                  title="Mark Mastered"
                >
                  <CheckCircle2 size={18} />
                </button>
              </div>
            </div>

            <div className="detail-section">
              <h3>Core Concept Summary</h3>
              <p>{selectedFe.summary}</p>
            </div>

            <div className="detail-section">
              <h3>Essential Talking Points</h3>
              <ul>
                {selectedFe.keyPoints.map((pt, idx) => (
                  <li key={idx} style={{ marginBottom: '0.5rem' }}>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>

            <div className="detail-section">
              <h3>Code / Architectural Demonstration</h3>
              <div className="code-viewer-container">
                <pre className="code-block-pre">
                  <code>{selectedFe.codeSnippet}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          TAB 5: 3D FLASHCARDS & RAPID RECALL
          ============================================================ */}
      {activeTab === 'FLASHCARDS' && (
        <div className="flashcards-layout">
          <div className="prep-filters-group">
            {['ALL', 'Algorithms', 'System Design', 'Web & Protocols', 'Databases', 'JavaScript', 'Security'].map(
              (cat) => (
                <button
                  key={cat}
                  className={`filter-chip ${flashcardCategory === cat ? 'active' : ''}`}
                  onClick={() => {
                    setFlashcardCategory(cat);
                    setFlashcardIndex(0);
                    setIsCardFlipped(false);
                  }}
                >
                  {cat}
                </button>
              )
            )}
          </div>

          {filteredFlashcards.length > 0 && (
            <>
              <div
                className="flashcard-wrapper"
                onClick={() => setIsCardFlipped(!isCardFlipped)}
              >
                <div className={`flashcard-inner ${isCardFlipped ? 'flipped' : ''}`}>
                  {/* Front Side */}
                  <div className="flashcard-face flashcard-front">
                    <span className="card-category-tag">
                      {filteredFlashcards[flashcardIndex].category}
                    </span>
                    <div className="flashcard-prompt">
                      {filteredFlashcards[flashcardIndex].question}
                    </div>
                    <span className="flashcard-tip">
                      <RotateCw size={14} /> Tap the card to see the answer
                    </span>
                  </div>

                  {/* Back Side */}
                  <div className="flashcard-face flashcard-back">
                    <span className="card-category-tag" style={{ color: 'var(--accent-2)' }}>
                      Answer Explanation
                    </span>
                    <div className="flashcard-answer">
                      {filteredFlashcards[flashcardIndex].answer}
                    </div>
                    <span className="flashcard-tip">
                      <RotateCw size={14} /> Tap to flip back
                    </span>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flashcard-controls">
                <button
                  className="btn-round-nav"
                  disabled={flashcardIndex === 0}
                  onClick={() => {
                    setIsCardFlipped(false);
                    setFlashcardIndex((prev) => Math.max(0, prev - 1));
                  }}
                >
                  <ChevronLeft size={22} />
                </button>

                <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--muted)' }}>
                  {flashcardIndex + 1} of {filteredFlashcards.length}
                </span>

                <button
                  className="btn-round-nav"
                  disabled={flashcardIndex === filteredFlashcards.length - 1}
                  onClick={() => {
                    setIsCardFlipped(false);
                    setFlashcardIndex((prev) =>
                      Math.min(filteredFlashcards.length - 1, prev + 1)
                    );
                  }}
                >
                  <ChevronRight size={22} />
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* ============================================================
          TAB 6: TIMED MOCK INTERVIEW SIMULATOR
          ============================================================ */}
      {activeTab === 'MOCK_SIMULATOR' && (
        <div className="mock-container">
          {!mockSessionActive && !mockCompleted && (
            <div className="mock-card" style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'var(--accent-soft)',
                  color: 'var(--accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem auto'
                }}
              >
                <Timer size={32} />
              </div>
              <h2 style={{ fontSize: 'clamp(1.4rem, 4vw, 1.8rem)', fontWeight: 600, marginBottom: '0.75rem' }}>
                Timed Mock Interview Simulator
              </h2>
              <p
                style={{
                  color: 'var(--muted)',
                  maxWidth: '520px',
                  margin: '0 auto 2rem auto',
                  lineHeight: '1.6'
                }}
              >
                Simulate real technical interview pressure. Receive a randomized interview question
                with a countdown timer, structured self-evaluation rubric, and comprehensive score
                report.
              </p>

              <button className="btn-primary" style={{ margin: '0 auto' }} onClick={handleStartMock}>
                <Play size={18} /> Start Mock Session (10 Minutes)
              </button>
            </div>
          )}

          {mockSessionActive && !mockCompleted && (
            <div className="mock-card">
              <div className="mock-topbar">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span className="tag-pill" style={{ color: 'var(--accent)' }}>
                    {MOCK_INTERVIEW_QUESTIONS[mockQuestionIdx].type}
                  </span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>
                    {MOCK_INTERVIEW_QUESTIONS[mockQuestionIdx].topic}
                  </span>
                </div>

                <div className="timer-pill">
                  <Timer size={18} />
                  <span>{formatTimer(mockTimeRemaining)}</span>
                </div>
              </div>

              <div className="mock-question-box">
                <h2>{MOCK_INTERVIEW_QUESTIONS[mockQuestionIdx].title}</h2>
                <p style={{ fontSize: '1.05rem', color: 'var(--ink-2)', lineHeight: '1.6' }}>
                  {MOCK_INTERVIEW_QUESTIONS[mockQuestionIdx].question}
                </p>
              </div>

              {/* Notes Scratchpad */}
              <div className="star-field-group" style={{ margin: '1.5rem 0' }}>
                <label>Interview Scratchpad &amp; Code Notes</label>
                <textarea
                  style={{ minHeight: '160px', fontFamily: 'monospace' }}
                  placeholder="Outline your approach, time/space complexity, edge cases, or code solution here..."
                  value={mockUserNotes}
                  onChange={(e) => setMockUserNotes(e.target.value)}
                />
              </div>

              {/* Self Rubric */}
              <div className="mock-rubric-box">
                <h4>Self-Evaluation Rubric (Check all criteria you satisfied):</h4>
                {MOCK_INTERVIEW_QUESTIONS[mockQuestionIdx].rubric.map((item, idx) => (
                  <label key={idx} className="rubric-item">
                    <input
                      type="checkbox"
                      className="rubric-checkbox"
                      checked={!!mockRubricChecked[idx]}
                      onChange={(e) =>
                        setMockRubricChecked({
                          ...mockRubricChecked,
                          [idx]: e.target.checked
                        })
                      }
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                <button className="btn-primary" onClick={handleFinishMock}>
                  <Check size={18} /> Submit &amp; Evaluate Performance
                </button>
              </div>
            </div>
          )}

          {mockCompleted && (
            <div className="mock-card mock-report-card">
              <div className="score-circle">
                {mockFinalScore}%
                <span>SCORE</span>
              </div>

              <h2>Mock Interview Performance Report</h2>
              <p style={{ color: 'var(--muted)', maxWidth: '480px' }}>
                {mockFinalScore >= 80
                  ? 'Outstanding performance! You demonstrated clear technical communication and rigorous analysis.'
                  : mockFinalScore >= 50
                  ? 'Solid foundation! Review the rubric criteria and optimal solutions to sharpen edge case handling.'
                  : 'Great practice run! Revisit the topic and try again to reinforce core concepts.'}
              </p>

              <div
                style={{
                  background: 'var(--surface-2)',
                  border: '1px solid var(--line)',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  width: '100%',
                  textAlign: 'left'
                }}
              >
                <h4 style={{ color: 'var(--accent)', marginBottom: '0.5rem' }}>Sample Solution Reference</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--ink-2)' }}>
                  {MOCK_INTERVIEW_QUESTIONS[mockQuestionIdx].sampleSolution}
                </p>
              </div>

              <button className="btn-primary" onClick={handleStartMock}>
                <RotateCcw size={16} /> Try Another Question
              </button>
            </div>
          )}
        </div>
      )}

      {/* Copy confirmation toast (always mounted so screen readers announce it) */}
      <div
        className={`prep-toast ${toast ? 'show' : ''} ${toast && !toast.ok ? 'is-error' : ''}`}
        role="status"
        aria-live="polite"
      >
        {toast?.ok && <Check size={16} />}
        {toast?.message}
      </div>
    </div>
  );
}
