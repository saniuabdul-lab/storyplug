import { useState, useRef, useEffect } from "react";

// ─── CONSTANTS ───────────────────────────────────────────────────────────────
const STYLES = [
  { id: "humorous", label: "😂 Humorous" },
  { id: "emotional", label: "😢 Emotional" },
  { id: "romantic", label: "💕 Romantic" },
  { id: "dramatic", label: "🎭 Dramatic" },
  { id: "suspenseful", label: "😱 Suspenseful" },
  { id: "satirical", label: "🎯 Satirical" },
  { id: "inspirational", label: "✨ Inspirational" },
  { id: "conversational", label: "🗣️ Conversational" },
];

const SETTINGS = [
  "Lagos survival life", "Yoruba household", "Igbo family setting",
  "Hausa family structure", "University hostel", "Boarding school",
  "Church environment", "Muslim family home", "Village compound",
  "Abuja social class", "Northern Nigeria", "Kano school life",
];

const STORY_TYPES = [
  "Short Story", "Confession-style narration", "Family Drama",
  "School/University story", "Social media viral post",
  "Children story (age 7–9)", "Inspirational episode", "Romance story",
];

const EMOTION_LEVELS = ["Low", "Medium", "High", "Extremely Intense"];
const FIGURATIVE_LEVELS = ["Simple", "Rich", "Very Rich", "Highly Literary"];

// ─── FIREFLY COMPONENT ───────────────────────────────────────────────────────
function Fireflies() {
  const flies = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 4,
    duration: 3 + Math.random() * 4,
    size: 3 + Math.random() * 4,
  }));
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
      {flies.map(f => (
        <div key={f.id} style={{
          position: "absolute",
          left: f.left + "%", top: f.top + "%",
          width: f.size, height: f.size,
          borderRadius: "50%",
          background: `radial-gradient(circle, #ffe566, #ffaa00)`,
          boxShadow: `0 0 ${f.size * 3}px #ffe566`,
          animation: `firefly ${f.duration}s ${f.delay}s ease-in-out infinite alternate`,
          opacity: 0.7,
        }} />
      ))}
    </div>
  );
}

// ─── ELDER SCENE SVG ─────────────────────────────────────────────────────────
function ElderScene({ state }) {
  // state: idle | thinking | telling | done
  const flameAnim = state === "telling" || state === "thinking";
  const elderTalking = state === "telling";

  return (
    <div style={{
      width: "100%", maxWidth: 420, margin: "0 auto",
      position: "relative", userSelect: "none",
    }}>
      <svg viewBox="0 0 420 260" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.7))" }}>
        {/* Sky/ground */}
        <defs>
          <radialGradient id="groundGlow" cx="50%" cy="100%" r="60%">
            <stop offset="0%" stopColor="#8B3A00" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#1a0900" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="fireGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFD700" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#FF6B00" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FF0000" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fffde0" />
            <stop offset="100%" stopColor="#f5c842" />
          </radialGradient>
        </defs>

        {/* Background night sky */}
        <rect width="420" height="260" fill="#1e1005" />

        {/* Stars */}
        {[[30,20],[80,15],[120,30],[200,10],[280,25],[340,15],[390,30],[60,50],[150,8],[310,40],[370,55]].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r={Math.random() > 0.5 ? 1.5 : 1} fill="#fff" opacity={0.6 + Math.random() * 0.4} />
        ))}

        {/* Moon */}
        <circle cx="360" cy="35" r="22" fill="url(#moonGlow)" opacity="0.9" />
        <circle cx="368" cy="30" r="16" fill="#1a0e03" opacity="0.25" />

        {/* Ground */}
        <ellipse cx="210" cy="250" rx="200" ry="30" fill="url(#groundGlow)" />
        <rect x="0" y="230" width="420" height="30" fill="#1a0900" />

        {/* Trees silhouette */}
        <path d="M0,180 Q20,120 40,180 L0,180Z" fill="#0d0500" />
        <path d="M380,160 Q400,100 420,160 L420,180 L380,180Z" fill="#0d0500" />
        <path d="M5,230 L10,180 L15,230Z" fill="#120700" />
        <path d="M405,230 L410,175 L415,230Z" fill="#120700" />

        {/* Hut silhouette left */}
        <path d="M20,230 L20,190 L50,170 L80,190 L80,230Z" fill="#0f0600" />
        <path d="M50,165 L80,190 L20,190Z" fill="#0a0400" />

        {/* Fire glow on ground */}
        <ellipse cx="210" cy="220" rx="55" ry="18" fill="url(#fireGlow)" opacity={flameAnim ? "0.9" : "0.4"} />

        {/* Fire logs */}
        <line x1="185" y1="222" x2="235" y2="218" stroke="#3d1800" strokeWidth="5" strokeLinecap="round" />
        <line x1="190" y1="225" x2="230" y2="215" stroke="#2d1000" strokeWidth="4" strokeLinecap="round" />

        {/* Fire flames */}
        <g style={{ transformOrigin: "210px 215px", animation: flameAnim ? "flameDance 0.4s ease-in-out infinite alternate" : "none" }}>
          <path d="M200,215 Q205,195 210,185 Q215,195 220,215Z" fill="#FF4500" opacity="0.95" />
          <path d="M203,215 Q208,200 210,192 Q212,200 217,215Z" fill="#FF8C00" opacity="0.9" />
          <path d="M206,215 Q210,205 210,198 Q210,205 214,215Z" fill="#FFD700" opacity="0.85" />
          <path d="M195,215 Q200,205 205,210 Q200,218Z" fill="#FF6347" opacity="0.7" />
          <path d="M215,215 Q220,205 225,210 Q220,218Z" fill="#FF6347" opacity="0.7" />
          {/* Embers */}
          <circle cx="205" cy="188" r="2" fill="#FFD700" opacity={flameAnim ? "0.9" : "0"} style={{ animation: flameAnim ? "emberRise 1.2s ease-out infinite" : "none" }} />
          <circle cx="215" cy="183" r="1.5" fill="#FF8C00" opacity={flameAnim ? "0.8" : "0"} style={{ animation: flameAnim ? "emberRise 1.8s 0.3s ease-out infinite" : "none" }} />
          <circle cx="210" cy="180" r="1" fill="#FFF" opacity={flameAnim ? "0.6" : "0"} style={{ animation: flameAnim ? "emberRise 2s 0.6s ease-out infinite" : "none" }} />
        </g>

        {/* ── ELDER (center-left of fire) ── */}
        {/* Body/robe */}
        <path d="M155,230 Q158,195 165,185 Q175,178 185,185 Q192,195 195,230Z" fill="#8B4513" />
        {/* Traditional pattern on robe */}
        <path d="M160,210 L190,210" stroke="#D2691E" strokeWidth="1.5" opacity="0.6" />
        <path d="M158,220 L192,220" stroke="#D2691E" strokeWidth="1.5" opacity="0.6" />
        <path d="M165,200 L185,200" stroke="#FFD700" strokeWidth="1" opacity="0.5" />
        {/* Neck */}
        <rect x="172" y="178" width="11" height="10" rx="3" fill="#8B5E3C" />
        {/* Head */}
        <ellipse cx="177" cy="168" rx="14" ry="16" fill="#7B4F2E" />
        {/* Grey hair/beard */}
        <path d="M163,165 Q165,155 177,152 Q189,155 191,165" fill="#9E9E9E" opacity="0.8" />
        <path d="M165,175 Q163,185 165,190" stroke="#9E9E9E" strokeWidth="3" fill="none" opacity="0.7" />
        {/* Eyes */}
        <ellipse cx="171" cy="167" rx="3" ry="2.5" fill="#1a0900" />
        <ellipse cx="183" cy="167" rx="3" ry="2.5" fill="#1a0900" />
        <circle cx="172" cy="166" r="1" fill="#fff" opacity="0.6" />
        <circle cx="184" cy="166" r="1" fill="#fff" opacity="0.6" />
        {/* Nose */}
        <path d="M175,170 Q177,173 179,170" stroke="#5a3520" strokeWidth="1.5" fill="none" />
        {/* Mouth - open when telling */}
        {elderTalking ? (
          <ellipse cx="177" cy="176" rx="4" ry="3" fill="#3d1500" />
        ) : (
          <path d="M173,176 Q177,179 181,176" stroke="#5a3520" strokeWidth="1.5" fill="none" />
        )}
        {/* Wrinkles */}
        <path d="M165,163 Q168,160 171,163" stroke="#5a3520" strokeWidth="1" fill="none" opacity="0.5" />
        <path d="M183,163 Q186,160 189,163" stroke="#5a3520" strokeWidth="1" fill="none" opacity="0.5" />
        {/* Traditional cap */}
        <ellipse cx="177" cy="154" rx="15" ry="5" fill="#8B0000" />
        <ellipse cx="177" cy="150" rx="10" ry="8" fill="#A52A2A" />
        <ellipse cx="177" cy="147" rx="6" ry="3" fill="#CD853F" />
        {/* Staff/walking stick */}
        <line x1="195" y1="230" x2="200" y2="175" stroke="#5C3317" strokeWidth="4" strokeLinecap="round" />
        <circle cx="200" cy="173" r="4" fill="#8B4513" />
        {/* Talking gesture arm */}
        {elderTalking ? (
          <path d="M185,195 Q205,180 215,175" stroke="#7B4F2E" strokeWidth="6" fill="none" strokeLinecap="round"
            style={{ animation: "armWave 0.6s ease-in-out infinite alternate", transformOrigin: "185px 195px" }} />
        ) : (
          <path d="M185,195 Q195,200 200,210" stroke="#7B4F2E" strokeWidth="6" fill="none" strokeLinecap="round" />
        )}
        {/* Other arm resting */}
        <path d="M165,195 Q158,205 160,215" stroke="#7B4F2E" strokeWidth="6" fill="none" strokeLinecap="round" />

        {/* Speech bubble when telling */}
        {elderTalking && (
          <g style={{ animation: "bubblePop 0.3s ease-out" }}>
            <path d="M205,165 Q240,155 260,165 Q260,185 240,185 Q230,185 220,190 Q225,185 205,185 Q205,165Z" fill="rgba(255,220,100,0.15)" stroke="#FFD700" strokeWidth="1" />
            <text x="225" y="178" textAnchor="middle" fill="#FFD700" fontSize="11" fontFamily="serif">Gbọ ohun mi...</text>
          </g>
        )}

        {/* Thinking bubble */}
        {state === "thinking" && (
          <g>
            <circle cx="200" cy="158" r="3" fill="rgba(255,200,50,0.4)" stroke="#FFD700" strokeWidth="0.5" />
            <circle cx="210" cy="150" r="4" fill="rgba(255,200,50,0.4)" stroke="#FFD700" strokeWidth="0.5" />
            <circle cx="222" cy="143" r="6" fill="rgba(255,200,50,0.3)" stroke="#FFD700" strokeWidth="0.5" />
            <text x="222" y="147" textAnchor="middle" fill="#FFD700" fontSize="8">...</text>
          </g>
        )}

        {/* ── CHILD 1 (left of fire) ── */}
        <path d="M100,230 Q103,210 108,205 Q115,200 122,205 Q127,210 130,230Z" fill="#6B3A2A" />
        <ellipse cx="115" cy="196" rx="10" ry="11" fill="#7B4F2E" />
        <ellipse cx="111" cy="195" rx="2" ry="2" fill="#1a0900" />
        <ellipse cx="119" cy="195" rx="2" ry="2" fill="#1a0900" />
        <path d="M112,200 Q115,203 118,200" stroke="#5a3520" strokeWidth="1.2" fill="none" />
        {/* Child 1 hair */}
        <path d="M105,192 Q115,185 125,192" fill="#2d1500" />
        {/* Child 1 looking at elder with wonder */}
        <path d="M122,205 Q135,195 148,188" stroke="#6B3A2A" strokeWidth="5" fill="none" strokeLinecap="round" />

        {/* ── CHILD 2 (right of fire) ── */}
        <path d="M280,230 Q283,210 290,205 Q297,200 304,205 Q309,210 310,230Z" fill="#7B4020" />
        <ellipse cx="295" cy="196" rx="10" ry="11" fill="#8B5030" />
        <ellipse cx="291" cy="195" rx="2" ry="2" fill="#1a0900" />
        <ellipse cx="299" cy="195" rx="2" ry="2" fill="#1a0900" />
        <path d="M292,200 Q295,203 298,200" stroke="#5a3520" strokeWidth="1.2" fill="none" />
        {/* Child 2 hair */}
        <path d="M285,192 Q295,185 305,192" fill="#2d1500" />
        {/* Child 2 arm pointing at fire */}
        <path d="M283,210 Q275,205 265,208" stroke="#7B4020" strokeWidth="5" fill="none" strokeLinecap="round" />

        {/* ── CHILD 3 (far right, smaller = farther away) ── */}
        <path d="M330,230 Q332,215 336,210 Q341,206 346,210 Q350,215 351,230Z" fill="#5a3010" />
        <ellipse cx="341" cy="203" rx="8" ry="9" fill="#6B4020" />
        <ellipse cx="338" cy="202" rx="1.8" ry="1.8" fill="#1a0900" />
        <ellipse cx="344" cy="202" rx="1.8" ry="1.8" fill="#1a0900" />
        {/* knees up sitting */}
        <path d="M332,225 Q335,215 338,218" stroke="#5a3010" strokeWidth="5" fill="none" strokeLinecap="round" />

        {/* Ground texture */}
        <path d="M50,235 Q100,230 150,235 Q200,240 250,235 Q300,230 370,235" stroke="#2d1000" strokeWidth="2" fill="none" opacity="0.5" />

        {/* Scattered leaves/ground detail */}
        <ellipse cx="90" cy="233" rx="6" ry="2" fill="#1a0800" opacity="0.6" transform="rotate(-15,90,233)" />
        <ellipse cx="320" cy="232" rx="5" ry="2" fill="#1a0800" opacity="0.6" transform="rotate(10,320,232)" />
        <ellipse cx="250" cy="236" rx="4" ry="1.5" fill="#1a0800" opacity="0.5" transform="rotate(-5,250,236)" />

        {/* State label */}
        {state === "idle" && (
          <text x="210" y="140" textAnchor="middle" fill="#a07040" fontSize="11" fontFamily="serif" opacity="0.7">
            Awaiting your story seed...
          </text>
        )}
        {state === "done" && (
          <text x="210" y="140" textAnchor="middle" fill="#FFD700" fontSize="11" fontFamily="serif" opacity="0.9">
            ✦ The tale has been told ✦
          </text>
        )}
      </svg>

      <style>{`
        @keyframes flameDance {
          0% { transform: scaleX(1) scaleY(1) translateY(0); }
          100% { transform: scaleX(1.08) scaleY(1.06) translateY(-3px); }
        }
        @keyframes emberRise {
          0% { transform: translateY(0) translateX(0); opacity: 0.9; }
          100% { transform: translateY(-30px) translateX(${Math.random() > 0.5 ? 8 : -8}px); opacity: 0; }
        }
        @keyframes armWave {
          0% { transform: rotate(-5deg); }
          100% { transform: rotate(8deg); }
        }
        @keyframes bubblePop {
          0% { transform: scale(0.5); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Libre+Baskerville:ital@0;1&family=Space+Mono:wght@400;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  @keyframes firefly {
    0% { transform: translate(0,0) scale(1); opacity: 0.3; }
    50% { opacity: 0.9; }
    100% { transform: translate(${Math.random()*30-15}px,${Math.random()*30-15}px) scale(0.6); opacity: 0.2; }
  }

  body { background: #1a0f02; color: #f0e6d3; font-family: 'Libre Baskerville', Georgia, serif; min-height: 100vh; }

  .app { min-height: 100vh; background: radial-gradient(ellipse at 30% 20%, rgba(140,70,10,0.2) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(80,30,5,0.15) 0%, transparent 60%), #1a0f02; position: relative; padding-bottom: 60px; }

  .header { text-align: center; padding: 32px 20px 20px; border-bottom: 1px solid rgba(180,100,30,0.2); position: relative; }
  .header::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background: linear-gradient(90deg, transparent, #d4963c, #f0c060, #d4963c, transparent); }
  .header-eyebrow { font-family:'Space Mono',monospace; font-size:9px; letter-spacing:5px; color:#7a5020; text-transform:uppercase; margin-bottom:10px; }
  .header-title { font-family:'Playfair Display',serif; font-size:clamp(34px,7vw,60px); font-weight:700; color:#f5d48a; text-shadow:0 2px 40px rgba(212,150,60,0.5); line-height:1.1; }
  .header-title span { font-style:italic; color:#e8834a; }
  .header-sub { margin-top:8px; font-size:12px; color:#7a5828; letter-spacing:1px; }

  .main { max-width: 700px; margin: 0 auto; padding: 24px 16px 0; display: flex; flex-direction: column; gap: 18px; position: relative; z-index: 1; }

  .panel { background: rgba(38,22,5,0.95); border:1px solid rgba(160,100,30,0.22); border-radius:4px; padding:20px; position:relative; overflow:hidden; }
  .panel::after { content:''; position:absolute; top:0; left:0; width:3px; height:100%; background:linear-gradient(180deg,#d4963c,#e8834a,transparent); }
  .panel-title { font-family:'Space Mono',monospace; font-size:9px; letter-spacing:4px; text-transform:uppercase; color:#b06820; margin-bottom:14px; }

  .topic-input { width:100%; background:rgba(255,255,255,0.03); border:1px solid rgba(160,100,30,0.25); border-radius:3px; padding:12px 14px; font-family:'Libre Baskerville',serif; font-size:14px; color:#f0e6d3; resize:vertical; min-height:80px; outline:none; transition:border-color 0.2s; line-height:1.6; }
  .topic-input::placeholder { color:#50382a; }
  .topic-input:focus { border-color:rgba(212,150,60,0.55); }

  .chips { display:flex; flex-wrap:wrap; gap:7px; }
  .chip { background:rgba(255,255,255,0.03); border:1px solid rgba(160,100,30,0.2); border-radius:2px; padding:5px 11px; font-size:11px; color:#907050; cursor:pointer; transition:all 0.15s; font-family:'Space Mono',monospace; }
  .chip:hover { border-color:rgba(212,150,60,0.45); color:#d4963c; }
  .chip.active { background:rgba(160,80,20,0.28); border-color:#d4963c; color:#f5d48a; }

  .select { width:100%; background:rgba(255,255,255,0.03); border:1px solid rgba(160,100,30,0.25); border-radius:3px; padding:9px 12px; font-family:'Libre Baskerville',serif; font-size:13px; color:#b09060; outline:none; appearance:none; cursor:pointer; }
  .select option { background:#120a02; }

  .two-col { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
  @media(max-width:500px) { .two-col { grid-template-columns:1fr; } }

  .slider-group { margin-top:6px; }
  .slider-label { display:flex; justify-content:space-between; font-size:11px; color:#70503a; margin-bottom:5px; font-family:'Space Mono',monospace; }
  .slider-value { color:#d4963c; }
  input[type=range] { width:100%; -webkit-appearance:none; height:3px; background:linear-gradient(90deg,#d4963c var(--pct,50%),rgba(160,100,30,0.18) var(--pct,50%)); border-radius:2px; cursor:pointer; }
  input[type=range]::-webkit-slider-thumb { -webkit-appearance:none; width:13px; height:13px; border-radius:50%; background:#f5d48a; border:2px solid #d4963c; box-shadow:0 0 8px rgba(212,150,60,0.5); }

  .toggle-row { display:flex; align-items:center; gap:10px; cursor:pointer; }
  .toggle { width:36px; height:19px; background:rgba(255,255,255,0.06); border-radius:10px; position:relative; border:1px solid rgba(160,100,30,0.2); transition:background 0.2s; flex-shrink:0; }
  .toggle.on { background:rgba(160,80,20,0.45); border-color:#d4963c; }
  .toggle::after { content:''; position:absolute; top:2px; left:2px; width:13px; height:13px; border-radius:50%; background:#60402a; transition:all 0.2s; }
  .toggle.on::after { left:19px; background:#f5d48a; }
  .toggle-label { font-size:11px; color:#907050; font-family:'Space Mono',monospace; }

  .char-grid { display:grid; grid-template-columns:1fr 1fr; gap:9px; }
  @media(max-width:480px) { .char-grid { grid-template-columns:1fr; } }
  .char-field { display:flex; flex-direction:column; }
  .char-label { font-family:'Space Mono',monospace; font-size:8px; letter-spacing:2px; text-transform:uppercase; color:#60402a; margin-bottom:4px; }
  .char-input { background:rgba(255,255,255,0.03); border:1px solid rgba(160,100,30,0.18); border-radius:3px; padding:7px 10px; font-size:12px; color:#b09060; font-family:'Libre Baskerville',serif; outline:none; width:100%; transition:border-color 0.2s; }
  .char-input::placeholder { color:#40281a; }
  .char-input:focus { border-color:rgba(212,150,60,0.4); }

  .generate-btn { width:100%; padding:16px; background:linear-gradient(135deg,#b06010 0%,#e8834a 50%,#b06010 100%); border:none; border-radius:3px; font-family:'Playfair Display',serif; font-size:17px; font-weight:700; color:#1e1005; cursor:pointer; letter-spacing:1px; transition:opacity 0.2s,transform 0.1s; position:relative; overflow:hidden; }
  .generate-btn:hover { opacity:0.88; }
  .generate-btn:active { transform:scale(0.99); }
  .generate-btn:disabled { opacity:0.45; cursor:not-allowed; }
  .generate-btn::before { content:''; position:absolute; top:0; left:-100%; width:100%; height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent); animation:shimmer 2.5s infinite; }
  @keyframes shimmer { 0%{left:-100%} 100%{left:100%} }

  .story-panel { background:rgba(30,17,3,0.97); border:1px solid rgba(200,140,50,0.3); border-radius:4px; padding:28px 24px; position:relative; }
  .story-panel::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:linear-gradient(90deg,transparent,#d4963c,#f5d48a,#d4963c,transparent); }
  .story-meta { display:flex; align-items:center; gap:10px; flex-wrap:wrap; margin-bottom:18px; padding-bottom:14px; border-bottom:1px solid rgba(160,100,30,0.12); }
  .story-badge { font-family:'Space Mono',monospace; font-size:8px; letter-spacing:3px; text-transform:uppercase; color:#1e1005; background:#d4963c; padding:3px 9px; border-radius:1px; }
  .story-setting-tag { font-size:10px; color:#907050; font-family:'Space Mono',monospace; }
  .story-content { font-size:15px; line-height:1.95; color:#f5ead8; white-space:pre-wrap; }
  .ornament { text-align:center; color:#503020; font-size:16px; letter-spacing:8px; margin:4px 0; }

  .loading-state { text-align:center; padding:40px 20px; }
  .loading-drums { font-size:34px; animation:pulse 0.7s ease-in-out infinite; }
  @keyframes pulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.18);opacity:0.65} }
  .loading-text { margin-top:14px; font-family:'Space Mono',monospace; font-size:10px; letter-spacing:3px; color:#907050; text-transform:uppercase; animation:fadeInOut 1.4s ease-in-out infinite; }
  @keyframes fadeInOut { 0%,100%{opacity:0.3} 50%{opacity:1} }

  .error-msg { background:rgba(160,30,10,0.12); border:1px solid rgba(160,30,10,0.28); border-radius:3px; padding:12px 16px; color:#d07050; font-size:12px; }

  /* ACTION BAR */
  .action-bar { display:flex; gap:8px; margin-top:20px; padding-top:18px; border-top:1px solid rgba(160,100,30,0.12); flex-wrap:wrap; }
  .action-btn { flex:1; min-width:80px; padding:9px 8px; background:rgba(255,255,255,0.03); border:1px solid rgba(160,100,30,0.22); border-radius:3px; font-family:'Space Mono',monospace; font-size:9px; letter-spacing:1.5px; text-transform:uppercase; color:#907050; cursor:pointer; transition:all 0.15s; }
  .action-btn:hover { background:rgba(160,80,20,0.15); color:#d4963c; border-color:rgba(212,150,60,0.38); }
  .action-btn.share-wa { color:#25D366; border-color:rgba(37,211,102,0.25); }
  .action-btn.share-wa:hover { background:rgba(37,211,102,0.08); border-color:#25D366; }
  .action-btn.share-tw { color:#1DA1F2; border-color:rgba(29,161,242,0.25); }
  .action-btn.share-tt { color:#ff2d55; border-color:rgba(255,45,85,0.25); }
  .action-btn.share-tt:hover { background:rgba(255,45,85,0.08); border-color:#ff2d55; }
  .action-btn.share-tw:hover { background:rgba(29,161,242,0.08); border-color:#1DA1F2; }
  .action-btn.audio-btn { color:#FFD700; border-color:rgba(255,215,0,0.25); }
  .action-btn.audio-btn:hover { background:rgba(255,215,0,0.08); border-color:#FFD700; }
  .action-btn.audio-btn.playing { background:rgba(255,215,0,0.12); border-color:#FFD700; color:#FFD700; }

  /* HISTORY */
  .history-list { display:flex; flex-direction:column; gap:10px; }
  .history-item { background:rgba(255,255,255,0.02); border:1px solid rgba(160,100,30,0.15); border-radius:3px; padding:12px 14px; cursor:pointer; transition:all 0.15s; }
  .history-item:hover { border-color:rgba(212,150,60,0.35); background:rgba(160,80,20,0.08); }
  .history-item-title { font-size:12px; color:#d4963c; font-family:'Space Mono',monospace; letter-spacing:1px; margin-bottom:4px; }
  .history-item-preview { font-size:11px; color:#70503a; line-height:1.5; }
  .history-empty { font-size:11px; color:#40281a; font-family:'Space Mono',monospace; letter-spacing:2px; text-align:center; padding:20px 0; }

  /* SCENE WRAPPER */
  .scene-wrapper { padding:8px 0 4px; }
  .scene-label { text-align:center; font-family:'Space Mono',monospace; font-size:8px; letter-spacing:3px; color:#503020; text-transform:uppercase; margin-top:6px; }

  .footer { text-align:center; padding:32px 16px 0; font-family:'Space Mono',monospace; font-size:8px; letter-spacing:3px; text-transform:uppercase; color:#604020; }
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
      <input type="range" min={min} max={max} value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{ "--pct": pct + "%" }} />
    </div>
  );
}

export default function StoryPlug() {
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
  const [elderState, setElderState] = useState("idle");
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [utterance, setUtterance] = useState(null);
  const storyRef = useRef(null);

  useEffect(() => {
    return () => { if (utterance) window.speechSynthesis.cancel(); };
  }, [utterance]);

  const buildPrompt = () => {
    const charInfo = charName
      ? `Main character: ${charName}${charAge ? `, age ${charAge}` : ""}${charTribe ? `, ${charTribe}` : ""}${charPersonality ? ` — personality: ${charPersonality}` : ""}.`
      : "";
    const viralInstructions = viralMode
      ? `\n\nTHIS IS A VIRAL SOCIAL MEDIA POST MODE. Format it like a gripping Facebook post. Open with a hook. End with something that sparks debate or emotional reaction.`
      : "";
    return `You are a master Nigerian/African storyteller. Write a ${storyType.toLowerCase()} with the following parameters:

TOPIC: "${topic || "A surprising everyday situation in Nigerian life"}"
STYLE: ${selectedStyle}
CULTURAL SETTING: ${setting}
EMOTION INTENSITY: ${EMOTION_LEVELS[emotionLevel]}
FIGURATIVE LANGUAGE: ${FIGURATIVE_LEVELS[figurativeLevel]}
${charInfo}

RULES:
1. Write in warm, vivid, CONVERSATIONAL Nigerian storytelling voice. Use natural spoken phrases: "I said ahhh...", "For where?", "Omo...", "My spirit left my body", "See ehn..."
2. Dialogue must reveal personality, age, social class.
3. Every paragraph must create a "what happens next?" feeling.
4. Characters must feel ALIVE — flaws, humor, emotional contradictions.
5. End with a line that stays with the reader.
6. NEVER sound like textbook English or a generic AI story.
${viralInstructions}

Start immediately with the story. No preamble.`;
  };

  const generateStory = async () => {
    if (!topic.trim() && !charName.trim()) {
      setError("Give me something to work with — a topic, a character, a situation. Anything!");
      return;
    }
    setError("");
    setStory("");
    setLoading(true);
    setElderState("thinking");
    if (isPlaying) { window.speechSynthesis.cancel(); setIsPlaying(false); }

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
                content: "You are a legendary African storyteller — warm, dramatic, funny, deeply human. You write stories that feel like real gist, not textbook fiction. Your voice is conversational, emotionally alive, culturally authentic. You NEVER produce robotic, flat, or generic writing."
              },
              { role: "user", content: buildPrompt() }
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
      setElderState("telling");
      setHistory(prev => [{
        id: Date.now(),
        topic: topic || charName || "Untitled story",
        style: selectedStyle,
        preview: text.slice(0, 100) + "...",
        full: text,
      }, ...prev.slice(0, 9)]);
      setTimeout(() => {
        storyRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(() => setElderState("done"), 8000);
      }, 100);
    } catch (e) {
      setError("Something went wrong: " + e.message);
      setElderState("idle");
    } finally {
      setLoading(false);
    }
  };

  const copyStory = () => {
    navigator.clipboard.writeText(story);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareWhatsApp = () => {
    const text = encodeURIComponent(`🔥 *${topic || "A Naija Story"}*\n\n${story.slice(0, 500)}...\n\n_Generated on Storyplug_`);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const shareTwitter = () => {
    const text = encodeURIComponent(`"${story.slice(0, 200)}..." — generated on Storyplug 🔥 #NaijaStories #Storyplug`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
  };

  const shareTikTok = () => {
    const appUrl = window.location.href;
    const fullText = `${story.slice(0, 300)}...\n\n🔥 Generate your own African story FREE at:\n${appUrl}\n\nFollow @storyplug for more! #Storyplug #NaijaStories #AfricanStorytelling #NaijaTwitter`;
    navigator.clipboard.writeText(fullText);
    window.open(`https://www.tiktok.com/@storyplug`, "_blank");
    alert("Story + app link copied! 📋 Paste it in your TikTok caption or video description.");
  };

  const toggleAudio = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }
    const u = new SpeechSynthesisUtterance(story);
    u.rate = 0.88;
    u.pitch = 0.95;
    u.volume = 1;
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(v => v.lang.startsWith("en") && v.name.toLowerCase().includes("male"))
      || voices.find(v => v.lang.startsWith("en"))
      || voices[0];
    if (preferred) u.voice = preferred;
    u.onend = () => setIsPlaying(false);
    u.onerror = () => setIsPlaying(false);
    setUtterance(u);
    window.speechSynthesis.speak(u);
    setIsPlaying(true);
  };

  const loadHistoryItem = (item) => {
    setStory(item.full);
    setTopic(item.topic);
    setElderState("done");
    setShowHistory(false);
    setTimeout(() => storyRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 200);
  };

  return (
    <>
      <style>{css}</style>
      <Fireflies />
      <div className="app">
        <header className="header">
          <div className="header-eyebrow">◆ Tales by the fire ◆</div>
          <h1 className="header-title">Story<span>plug</span></h1>
          <p className="header-sub">AI-powered African narrative generation — raw, warm, unforgettable</p>
        </header>

        <div className="main">

          {/* ELDER SCENE */}
          <div className="panel scene-wrapper">
            <div className="panel-title">◈ The Storyteller's Fire</div>
            <ElderScene state={elderState} />
            <div className="scene-label">
              {elderState === "idle" && "The elder awaits your story seed..."}
              {elderState === "thinking" && "The elder is gathering wisdom..."}
              {elderState === "telling" && "The elder speaks — listen well..."}
              {elderState === "done" && "The tale has been woven into the night..."}
            </div>
          </div>

          {/* TOPIC */}
          <div className="panel">
            <div className="panel-title">◈ Your Story Seed</div>
            <textarea className="topic-input"
              placeholder={"Describe the situation, theme, or character...\n\nE.g. \"A man who lied about his salary to impress his in-laws\""}
              value={topic} onChange={e => setTopic(e.target.value)} />
          </div>

          {/* STYLE */}
          <div className="panel">
            <div className="panel-title">◈ Tone & Style</div>
            <div className="chips">
              {STYLES.map(s => (
                <button key={s.id} className={`chip ${selectedStyle === s.id ? "active" : ""}`}
                  onClick={() => setSelectedStyle(s.id)}>{s.label}</button>
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

          {/* INTENSITY */}
          <div className="panel">
            <div className="panel-title">◈ Intensity Controls</div>
            <SliderControl label="Emotion Intensity" value={emotionLevel} min={0} max={3}
              onChange={setEmotionLevel} displayLabels={EMOTION_LEVELS} />
            <div style={{ marginTop: 18 }}>
              <SliderControl label="Figurative Language" value={figurativeLevel} min={0} max={3}
                onChange={setFigurativeLevel} displayLabels={FIGURATIVE_LEVELS} />
            </div>
            <div style={{ marginTop: 18 }}>
              <Toggle label="Viral Social Media Mode" value={viralMode} onChange={setViralMode} />
            </div>
          </div>

          {/* CHARACTER */}
          <div className="panel">
            <div className="panel-title">◈ Character Builder (optional)</div>
            <div className="char-grid">
              {[
                { label: "Name", value: charName, set: setCharName, ph: "e.g. Mama Chidi" },
                { label: "Age", value: charAge, set: setCharAge, ph: "e.g. 45" },
                { label: "Tribe / Background", value: charTribe, set: setCharTribe, ph: "e.g. Yoruba" },
                { label: "Personality", value: charPersonality, set: setCharPersonality, ph: "e.g. stubborn, funny" },
              ].map(f => (
                <div className="char-field" key={f.label}>
                  <div className="char-label">{f.label}</div>
                  <input className="char-input" placeholder={f.ph} value={f.value} onChange={e => f.set(e.target.value)} />
                </div>
              ))}
            </div>
          </div>

          {error && <div className="error-msg">⚠ {error}</div>}

          <button className="generate-btn" onClick={generateStory} disabled={loading}>
            {loading ? "The elder is speaking..." : "✦ Tell the Story ✦"}
          </button>

          {/* STORY OUTPUT */}
          {(loading || story) && (
            <div className="story-panel" ref={storyRef}>
              {loading ? (
                <div className="loading-state">
                  <div className="loading-drums">🥁</div>
                  <div className="loading-text">The griot is weaving the tale...</div>
                </div>
              ) : (
                <>
                  <div className="story-meta">
                    <span className="story-badge">{storyType}</span>
                    <span className="story-setting-tag">◆ {setting}</span>
                    <span className="story-setting-tag">◆ {STYLES.find(s => s.id === selectedStyle)?.label}</span>
                  </div>
                  <div className="ornament">✦ ✦ ✦</div>
                  <div style={{ marginTop: 18 }}>
                    <div className="story-content">{story}</div>
                  </div>
                  <div className="action-bar">
                    <button className="action-btn" onClick={copyStory}>
                      {copied ? "✓ Copied!" : "📋 Copy"}
                    </button>
                    <button className={`action-btn audio-btn ${isPlaying ? "playing" : ""}`} onClick={toggleAudio}>
                      {isPlaying ? "⏹ Stop" : "🔊 Listen"}
                    </button>
                    <button className="action-btn share-wa" onClick={shareWhatsApp}>
                      💬 WhatsApp
                    </button>
                    <button className="action-btn share-tw" onClick={shareTwitter}>
                      🐦 Twitter
                    </button>
                    <button className="action-btn share-tt" onClick={shareTikTok}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" style={{verticalAlign:"middle",marginRight:3}}><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/></svg>
                      TikTok
                    </button>
                    <button className="action-btn" onClick={generateStory}>
                      🔄 Regenerate
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* STORY HISTORY */}
          {history.length > 0 && (
            <div className="panel">
              <div className="panel-title" style={{ cursor: "pointer", display: "flex", justifyContent: "space-between" }}
                onClick={() => setShowHistory(!showHistory)}>
                <span>◈ Story History ({history.length})</span>
                <span style={{ color: "#d4963c" }}>{showHistory ? "▲ Hide" : "▼ Show"}</span>
              </div>
              {showHistory && (
                <div className="history-list">
                  {history.map(item => (
                    <div key={item.id} className="history-item" onClick={() => loadHistoryItem(item)}>
                      <div className="history-item-title">
                        {STYLES.find(s => s.id === item.style)?.emoji || "✦"} {item.topic}
                      </div>
                      <div className="history-item-preview">{item.preview}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        <div className="footer">◆ Storyplug — Powered by African Voices ◆</div>
      </div>
    </>
  );
}
