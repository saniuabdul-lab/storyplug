import { useState, useRef } from "react";

const STYLES = [
  { id: "humorous", label: "😂 Humorous", emoji: "😂" },
  { id: "emotional", label: "😢 Emotional", emoji: "😢" },
  { id: "romantic", label: "💕 Romantic", emoji: "💕" },
  { id: "dramatic", label: "🎭 Dramatic", emoji: "🎭" },
  { id: "suspenseful", label: "😱 Suspenseful", emoji: "😱" },
  { id: "satirical", label: "🎯 Satirical", emoji: "🎯" },
  { id: "inspirational", label: "✨ Inspirational", emoji: "✨" },
  { id: "conversational", label: "🗣️ Conversational", emoji: "🗣️" },
];

const SETTINGS = [
  "Lagos survival life",
  "Yoruba household",
  "Igbo family setting",
  "Hausa family structure",
  "University hostel",
  "Boarding school",
  "Church environment",
  "Muslim family home",
  "Village compound",
  "Abuja social class",
  "Northern Nigeria",
  "Kano school life",
];

const STORY_TYPES = [
  "Short Story",
  "Confession-style narration",
  "Family Drama",
  "School/University story",
  "Social media viral post",
  "Children story (age 7–9)",
  "Inspirational episode",
  "Romance story",
];

const EMOTION_LEVELS = ["Low", "Medium", "High", "Extremely Intense"];
const FIGURATIVE_LEVELS = ["Simple", "Rich", "Very Rich", "Highly Literary"];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Libre+Baskerville:ital@0;1&family=Space+Mono:wght@400;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #0d0a06;
    color: #f0e6d3;
    font-family: 'Libre Baskerville', Georgia, serif;
    min-height: 100vh;
  }

  .app {
    min-height: 100vh;
    background: 
      radial-gradient(ellipse at 20% 10%, rgba(180,100,30,0.18) 0%, transparent 55%),
      radial-gradient(ellipse at 80% 80%, rgba(120,50,10,0.15) 0%, transparent 55%),
      repeating-linear-gradient(
        45deg,
        transparent,
        transparent 60px,
        rgba(255,180,60,0.018) 60px,
        rgba(255,180,60,0.018) 61px
      ),
      #0d0a06;
    padding: 0 0 80px;
  }

  /* HEADER */
  .header {
    background: linear-gradient(180deg, #1a0e03 0%, transparent 100%);
    padding: 36px 24px 24px;
    text-align: center;
    border-bottom: 1px solid rgba(212,150,60,0.22);
    position: relative;
    overflow: hidden;
  }

  .header::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, transparent, #d4963c, #f0c060, #d4963c, transparent);
  }

  .header-kente {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    letter-spacing: 6px;
    color: #a07030;
    text-transform: uppercase;
    margin-bottom: 12px;
  }

  .header-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(32px, 6vw, 56px);
    font-weight: 700;
    color: #f5d48a;
    line-height: 1.1;
    text-shadow: 0 2px 30px rgba(212,150,60,0.4);
  }

  .header-title span {
    font-style: italic;
    color: #e8834a;
  }

  .header-sub {
    margin-top: 8px;
    font-size: 13px;
    color: #a08060;
    letter-spacing: 1px;
  }

  /* MAIN LAYOUT */
  .main {
    max-width: 960px;
    margin: 0 auto;
    padding: 32px 20px 0;
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
  }

  /* PANELS */
  .panel {
    background: rgba(25,15,5,0.85);
    border: 1px solid rgba(180,120,40,0.25);
    border-radius: 4px;
    padding: 24px;
    position: relative;
    overflow: hidden;
  }

  .panel::after {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 3px; height: 100%;
    background: linear-gradient(180deg, #d4963c, #e8834a, transparent);
  }

  .panel-title {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: #c07830;
    margin-bottom: 16px;
  }

  /* TOPIC INPUT */
  .topic-input {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(180,120,40,0.3);
    border-radius: 3px;
    padding: 14px 16px;
    font-family: 'Libre Baskerville', serif;
    font-size: 15px;
    color: #f0e6d3;
    resize: vertical;
    min-height: 90px;
    outline: none;
    transition: border-color 0.2s;
    line-height: 1.6;
  }

  .topic-input::placeholder { color: #60483a; }
  .topic-input:focus { border-color: rgba(212,150,60,0.6); }

  /* CHIPS */
  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 4px;
  }

  .chip {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(180,120,40,0.22);
    border-radius: 2px;
    padding: 6px 12px;
    font-size: 12px;
    color: #a08060;
    cursor: pointer;
    transition: all 0.15s;
    font-family: 'Space Mono', monospace;
    letter-spacing: 0.5px;
  }

  .chip:hover { border-color: rgba(212,150,60,0.5); color: #d4963c; }
  .chip.active {
    background: rgba(180,100,30,0.3);
    border-color: #d4963c;
    color: #f5d48a;
  }

  /* SELECT */
  .select {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(180,120,40,0.3);
    border-radius: 3px;
    padding: 10px 14px;
    font-family: 'Libre Baskerville', serif;
    font-size: 14px;
    color: #c0a070;
    outline: none;
    appearance: none;
    cursor: pointer;
  }

  .select option { background: #1a0e03; color: #c0a070; }

  /* SLIDERS */
  .slider-group { margin-top: 8px; }

  .slider-label {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #80604a;
    margin-bottom: 6px;
    font-family: 'Space Mono', monospace;
  }

  .slider-value { color: #d4963c; }

  input[type=range] {
    width: 100%;
    -webkit-appearance: none;
    height: 3px;
    background: linear-gradient(90deg, #d4963c var(--pct, 50%), rgba(180,120,40,0.2) var(--pct, 50%));
    border-radius: 2px;
    cursor: pointer;
  }

  input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #f5d48a;
    border: 2px solid #d4963c;
    box-shadow: 0 0 8px rgba(212,150,60,0.5);
  }

  /* TWO COL */
  .two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  @media (max-width: 600px) { .two-col { grid-template-columns: 1fr; } }

  /* GENERATE BUTTON */
  .generate-btn {
    width: 100%;
    padding: 18px;
    background: linear-gradient(135deg, #c07020 0%, #e8834a 50%, #c07020 100%);
    border: none;
    border-radius: 3px;
    font-family: 'Playfair Display', serif;
    font-size: 18px;
    font-weight: 700;
    color: #0d0a06;
    cursor: pointer;
    letter-spacing: 1px;
    position: relative;
    overflow: hidden;
    transition: opacity 0.2s, transform 0.1s;
    text-shadow: none;
  }

  .generate-btn:hover { opacity: 0.9; }
  .generate-btn:active { transform: scale(0.99); }
  .generate-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  .generate-btn::before {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    animation: shimmer 2s infinite;
  }

  @keyframes shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
  }

  /* STORY OUTPUT */
  .story-panel {
    background: rgba(20,12,4,0.95);
    border: 1px solid rgba(212,150,60,0.35);
    border-radius: 4px;
    padding: 36px 32px;
    position: relative;
  }

  .story-panel::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #d4963c, #f5d48a, #d4963c, transparent);
  }

  .story-meta {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(180,120,40,0.15);
  }

  .story-badge {
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #0d0a06;
    background: #d4963c;
    padding: 4px 10px;
    border-radius: 1px;
  }

  .story-setting-tag {
    font-size: 11px;
    color: #a07050;
    font-family: 'Space Mono', monospace;
  }

  .story-content {
    font-size: 16px;
    line-height: 1.9;
    color: #e8d8c0;
    white-space: pre-wrap;
  }

  .story-content p { margin-bottom: 18px; }

  /* LOADING */
  .loading-state {
    text-align: center;
    padding: 48px 24px;
  }

  .loading-drums {
    font-size: 36px;
    animation: pulse 0.8s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.15); opacity: 0.7; }
  }

  .loading-text {
    margin-top: 16px;
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    letter-spacing: 3px;
    color: #a07050;
    text-transform: uppercase;
    animation: fadeInOut 1.5s ease-in-out infinite;
  }

  @keyframes fadeInOut {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 1; }
  }

  /* ERROR */
  .error-msg {
    background: rgba(180,40,20,0.15);
    border: 1px solid rgba(180,40,20,0.3);
    border-radius: 3px;
    padding: 14px 18px;
    color: #e08060;
    font-size: 13px;
  }

  /* DIVIDER */
  .ornament {
    text-align: center;
    color: #604030;
    font-size: 18px;
    letter-spacing: 8px;
    margin: 4px 0;
  }

  /* ACTION BAR */
  .action-bar {
    display: flex;
    gap: 10px;
    margin-top: 24px;
    padding-top: 20px;
    border-top: 1px solid rgba(180,120,40,0.15);
  }

  .action-btn {
    flex: 1;
    padding: 10px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(180,120,40,0.25);
    border-radius: 3px;
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #a08060;
    cursor: pointer;
    transition: all 0.15s;
  }

  .action-btn:hover {
    background: rgba(180,100,30,0.15);
    color: #d4963c;
    border-color: rgba(212,150,60,0.4);
  }

  /* CHARACTER BUILDER */
  .char-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  @media (max-width: 500px) { .char-grid { grid-template-columns: 1fr; } }

  .char-input {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(180,120,40,0.2);
    border-radius: 3px;
    padding: 8px 12px;
    font-size: 13px;
    color: #c0a070;
    font-family: 'Libre Baskerville', serif;
    outline: none;
    width: 100%;
    transition: border-color 0.2s;
  }

  .char-input::placeholder { color: #50382a; }
  .char-input:focus { border-color: rgba(212,150,60,0.45); }

  .char-label {
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #70503a;
    margin-bottom: 4px;
  }

  .char-field { display: flex; flex-direction: column; }

  /* TOGGLE */
  .toggle-row {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
  }

  .toggle {
    width: 38px; height: 20px;
    background: rgba(255,255,255,0.08);
    border-radius: 10px;
    position: relative;
    border: 1px solid rgba(180,120,40,0.25);
    transition: background 0.2s;
    flex-shrink: 0;
  }

  .toggle.on {
    background: rgba(180,100,30,0.5);
    border-color: #d4963c;
  }

  .toggle::after {
    content: '';
    position: absolute;
    top: 2px; left: 2px;
    width: 14px; height: 14px;
    border-radius: 50%;
    background: #70503a;
    transition: all 0.2s;
  }

  .toggle.on::after {
    left: 20px;
    background: #f5d48a;
  }

  .toggle-label {
    font-size: 12px;
    color: #a07050;
    font-family: 'Space Mono', monospace;
    letter-spacing: 1px;
  }

  /* FOOTER */
  .footer {
    text-align: center;
    padding: 40px 20px 0;
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #40281a;
  }
`;

function Toggle({ label, value, onChange }) {
  return (
    <div className="toggle-row" onClick={() => onChange(!value)}>
      <div className={`toggle ${value ? "on" : ""}`} />
      <span className="toggle-label">{label}</span>
    </div>
  );
}

function SliderControl({ label, value, min, max, onChange, displayLabels }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="slider-group">
      <div className="slider-label">
        <span>{label}</span>
        <span className="slider-value">{displayLabels ? displayLabels[value] : value}</span>
      </div>
      <input
        type="range" min={min} max={max} value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{ "--pct": pct + "%" }}
      />
    </div>
  );
}

export default function NaijaStoryApp() {
  const [topic, setTopic] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("humorous");
  const [setting, setSetting] = useState("Lagos survival life");
  const [storyType, setStoryType] = useState("Short Story");
  const [emotionLevel, setEmotionLevel] = useState(2);
  const [figurativeLevel, setFigurativeLevel] = useState(2);
  const [viralMode, setViralMode] = useState(false);
  const [charName, setCharName] = useState("");
  const [charAge, setCharAge] = useState("");
  const [charTribe, setCharTribe] = useState("");
  const [charPersonality, setCharPersonality] = useState("");
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const storyRef = useRef(null);

  const buildPrompt = () => {
    const charInfo = charName
      ? `Main character: ${charName}${charAge ? `, age ${charAge}` : ""}${charTribe ? `, ${charTribe}` : ""}${charPersonality ? ` — personality: ${charPersonality}` : ""}.`
      : "";

    const viralInstructions = viralMode
      ? `\n\nTHIS IS A VIRAL SOCIAL MEDIA POST MODE. Format it like a gripping Facebook post that will get maximum shares, comments, and reactions. Open with a hook that makes people stop scrolling. End with something that sparks debate or emotional reaction.`
      : "";

    return `You are a master Nigerian/African storyteller. Write a ${storyType.toLowerCase()} with the following parameters:

TOPIC / PROMPT: "${topic || "A surprising everyday situation in Nigerian life"}"

STYLE: ${selectedStyle} — lean fully into this tone
CULTURAL SETTING: ${setting}
EMOTION INTENSITY: ${EMOTION_LEVELS[emotionLevel]} — this should be reflected in character reactions, dialogue weight, and narrative tension
FIGURATIVE LANGUAGE LEVEL: ${FIGURATIVE_LEVELS[figurativeLevel]} — use similes, metaphors, hyperbole, personification, proverbs, and cultural idioms at this density
${charInfo}

STRICT WRITING RULES:
1. Write in warm, vivid, CONVERSATIONAL Nigerian storytelling voice — like someone gisting their friend. Use natural spoken phrases: "I said ahhh...", "For where?", "Omo...", "My spirit left my body", "This one no be normal again", "See ehn..." etc.
2. Dialogue must reveal personality, age, social class, and relationship. No stiff "Mother, please permit me." Use real speech.
3. Every paragraph must create a "what happens next?" feeling. Use short punchy lines for drama. Slow builds for suspense.
4. Characters must feel ALIVE — flaws, humor, emotional contradictions.
5. End with a line that stays with the reader — irony, twist, laughter, or quiet truth.
6. NEVER sound like textbook English. NEVER sound like a generic AI story.
7. The story must feel like it actually happened.
${viralInstructions}

Write the story now. Do NOT add any preamble or meta-commentary. Start immediately with the story.`;
  };

  const generateStory = async () => {
    if (!topic.trim() && !charName.trim()) {
      setError("Give me something to work with — a topic, a character, a situation. Anything!");
      return;
    }
    setError("");
    setStory("");
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.groq.com/openai/v1/chat/completions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${import.meta.env.VITE_GROQ_KEY}`
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
              {
                role: "system",
                content: "You are a legendary African storyteller — warm, dramatic, funny, deeply human. You write stories that feel like real gist, not textbook fiction. Your voice is conversational, emotionally alive, culturally authentic. You use rich figurative language naturally. You NEVER produce robotic, flat, or generic writing."
              },
              {
                role: "user",
                content: buildPrompt()
              }
            ],
            max_tokens: 1000,
            temperature: 0.9,
          }),
        }
      );
      const data = await response.json();
      if (data.error) throw new Error(data.error.message);
      const text = data.choices?.[0]?.message?.content || "";
      setStory(text);
      setTimeout(() => storyRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    } catch (e) {
      setError("Something went wrong: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const copyStory = () => {
    navigator.clipboard.writeText(story);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <style>{css}</style>
      <div className="app">
        <header className="header">
          <div className="header-kente">◆ The Storyteller's Fire ◆</div>
          <h1 className="header-title">Story<span>plug</span></h1>
          <p className="header-sub">AI-powered African narrative generation — raw, warm, unforgettable</p>
        </header>

        <div className="main">
          {/* TOPIC */}
          <div className="panel">
            <div className="panel-title">◈ Your Story Seed</div>
            <textarea
              className="topic-input"
              placeholder={"Describe the situation, theme, or character...\n\nE.g. \"A man who lied about his salary to impress his in-laws\" or \"First day at a Lagos office job\""}
              value={topic}
              onChange={e => setTopic(e.target.value)}
            />
          </div>

          {/* STYLE + SETTING */}
          <div className="panel">
            <div className="panel-title">◈ Tone & Style</div>
            <div className="chips">
              {STYLES.map(s => (
                <button
                  key={s.id}
                  className={`chip ${selectedStyle === s.id ? "active" : ""}`}
                  onClick={() => setSelectedStyle(s.id)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* SETTING + TYPE */}
          <div className="two-col">
            <div className="panel">
              <div className="panel-title">◈ Cultural Setting</div>
              <select className="select" value={setting} onChange={e => setSetting(e.target.value)}>
                {SETTINGS.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="panel">
              <div className="panel-title">◈ Story Type</div>
              <select className="select" value={storyType} onChange={e => setStoryType(e.target.value)}>
                {STORY_TYPES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* INTENSITY SLIDERS */}
          <div className="panel">
            <div className="panel-title">◈ Intensity Controls</div>
            <SliderControl
              label="Emotion Intensity"
              value={emotionLevel} min={0} max={3}
              onChange={setEmotionLevel}
              displayLabels={EMOTION_LEVELS}
            />
            <div style={{ marginTop: 20 }}>
              <SliderControl
                label="Figurative Language"
                value={figurativeLevel} min={0} max={3}
                onChange={setFigurativeLevel}
                displayLabels={FIGURATIVE_LEVELS}
              />
            </div>
            <div style={{ marginTop: 20 }}>
              <Toggle
                label="Viral Social Media Mode (Facebook-style post)"
                value={viralMode}
                onChange={setViralMode}
              />
            </div>
          </div>

          {/* CHARACTER BUILDER */}
          <div className="panel">
            <div className="panel-title">◈ Character Builder (optional)</div>
            <div className="char-grid">
              {[
                { label: "Name", value: charName, set: setCharName, ph: "e.g. Mama Chidi" },
                { label: "Age", value: charAge, set: setCharAge, ph: "e.g. 45" },
                { label: "Tribe / Background", value: charTribe, set: setCharTribe, ph: "e.g. Yoruba, Igbo, Hausa" },
                { label: "Personality", value: charPersonality, set: setCharPersonality, ph: "e.g. stubborn, funny, proud" },
              ].map(f => (
                <div className="char-field" key={f.label}>
                  <div className="char-label">{f.label}</div>
                  <input
                    className="char-input"
                    placeholder={f.ph}
                    value={f.value}
                    onChange={e => f.set(e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>

          {error && <div className="error-msg">⚠ {error}</div>}

          <button
            className="generate-btn"
            onClick={generateStory}
            disabled={loading}
          >
            {loading ? "Weaving the story..." : "✦ Generate Story ✦"}
          </button>

          {/* OUTPUT */}
          {(loading || story) && (
            <div className="story-panel" ref={storyRef}>
              {loading ? (
                <div className="loading-state">
                  <div className="loading-drums">🥁</div>
                  <div className="loading-text">The griot is speaking...</div>
                </div>
              ) : (
                <>
                  <div className="story-meta">
                    <span className="story-badge">{storyType}</span>
                    <span className="story-setting-tag">◆ {setting}</span>
                    <span className="story-setting-tag">◆ {STYLES.find(s => s.id === selectedStyle)?.label}</span>
                  </div>
                  <div className="ornament">✦ ✦ ✦</div>
                  <div style={{ marginTop: 20 }}>
                    <div className="story-content">{story}</div>
                  </div>
                  <div className="action-bar">
                    <button className="action-btn" onClick={copyStory}>
                      {copied ? "✓ Copied!" : "Copy Story"}
                    </button>
                    <button className="action-btn" onClick={generateStory}>
                      Regenerate
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        <div className="footer">◆ Storyplug — Powered by African Voices ◆</div>
      </div>
    </>
  );
}