import React, { useEffect, useRef, useState, useCallback } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './index.module.css';

/* ════════════════════════════════════════════════════════
   T&M Softwares — Landing Page v6
   ════════════════════════════════════════════════════════ */

/* ── Scroll Reveal ────────────────────────────────────── */
function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (delay) {
            setTimeout(() => el.classList.add(styles.visible), delay);
          } else {
            el.classList.add(styles.visible);
          }
          io.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return ref;
}

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useReveal(delay);
  return <div ref={ref} className={`${styles.reveal} ${className}`}>{children}</div>;
}

/* ── Animated Counter ─────────────────────────────────── */
function AnimNum({ value, suffix = '', label }: { value: number; suffix?: string; label: string }) {
  const [display, setDisplay] = useState('0');
  const ref = useRef<HTMLDivElement>(null);
  const ran = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !ran.current) {
        ran.current = true;
        const dur = 2000;
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - t0) / dur, 1);
          const ease = 1 - Math.pow(1 - p, 4);
          setDisplay(Math.round(ease * value).toLocaleString() + suffix);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.unobserve(el);
      }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [value, suffix]);

  return (
    <div ref={ref} className={styles.statItem}>
      <strong className={styles.statNum}>{display}</strong>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}

/* ── Mouse Tilt Hook ──────────────────────────────────── */
function useTilt(intensity = 8) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rx = ((e.clientY - cy) / (rect.height / 2)) * -intensity;
    const ry = ((e.clientX - cx) / (rect.width / 2)) * intensity;
    el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  }, [intensity]);

  const handleLeave = useCallback(() => {
    const el = ref.current;
    if (el) el.style.transform = 'perspective(800px) rotateX(0) rotateY(0)';
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);
    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, [handleMove, handleLeave]);

  return ref;
}

/* ── Hero ─────────────────────────────────────────────── */
function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.noise} />
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.orb3} />
      <div className={styles.heroGrid} />

      <div className={styles.heroContent}>
        <div className={styles.heroText}>
          <div className={`${styles.heroLabelWrap} ${styles.heroStagger1}`}>
            <span className={styles.heroLabelLine} />
            <span className={styles.heroLabel}>T&M SOFTWARES</span>
          </div>
          <h1 className={`${styles.heroTitle} ${styles.heroStagger2}`}>We build tools</h1>
          <h1 className={`${styles.heroTitle} ${styles.heroTitleAccent} ${styles.heroStagger3}`}>for engineers.</h1>
          <p className={`${styles.heroSub} ${styles.heroStagger4}`}>
            Performance-obsessed, dependency-free software.<br />
            Crafted in C. Open source. Built to last.
          </p>
          <div className={`${styles.heroCta} ${styles.heroStagger5}`}>
            <Link className={styles.btnPrimary} to="/projects/aicraft">
              <span>Explore projects</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link className={styles.btnGhost} href="https://github.com/miaototi">
              GitHub<span className={styles.arrow}>&#8594;</span>
            </Link>
          </div>
        </div>
        <div className={`${styles.heroVisual} ${styles.heroStagger4}`}>
          <div className={styles.terminalFloat}>
            <div className={styles.termBar}>
              <span className={styles.termDot} style={{ background: '#ff5f57' }} />
              <span className={styles.termDot} style={{ background: '#febc2e' }} />
              <span className={styles.termDot} style={{ background: '#28c840' }} />
              <span className={styles.termTitle}>terminal</span>
            </div>
            <div className={styles.termBody}>
              <span className={styles.termPrompt}>$</span> gcc -O3 demo.c -I./include -o demo{'\n'}
              <span className={styles.termPrompt}>$</span> ./demo{'\n'}
              <span className={styles.termOutput}>
                [ac] init .......... <span className={styles.termOk}>ok</span>{'\n'}
                [ac] dense 784→128 . <span className={styles.termOk}>ok</span>{'\n'}
                [ac] dense 128→10 .. <span className={styles.termOk}>ok</span>{'\n'}
                [ac] forward ....... <span className={styles.termOk}>ok</span>{'\n'}
                [ac] backward ...... <span className={styles.termOk}>ok</span>{'\n'}
                [ac] cleanup ....... <span className={styles.termOk}>ok</span>{'\n'}
              </span>
              <span className={styles.termCursor}>_</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.scrollHint}>
        <div className={styles.scrollMouse}>
          <div className={styles.scrollWheel} />
        </div>
      </div>
    </section>
  );
}

/* ── Ticker ───────────────────────────────────────────── */
function Ticker() {
  const words = [
    'PERFORMANCE', 'ENGINEERING', 'OPEN SOURCE', 'C11',
    'VULKAN', 'SIMD', 'ZERO DEPS', 'AICRAFT',
    'AVX-512', 'NEON', 'AUTOGRAD', 'GPU COMPUTE',
  ];
  const track = [...words, ...words];
  return (
    <div className={styles.ticker}>
      <div className={styles.tickerTrack}>
        {track.map((w, i) => (
          <span key={i} className={`${styles.tickerWord} ${w === 'AICRAFT' ? styles.tickerAccent : ''}`}>
            {w}<span className={styles.tickerDot} />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Manifesto ────────────────────────────────────────── */
function Manifesto() {
  return (
    <section className={styles.manifesto}>
      <div className="container">
        <Reveal>
          <div className={styles.manifestoInner}>
            <svg className={styles.manifestoMark} viewBox="0 0 64 64" aria-hidden="true" width="56" height="56">
              <path d="M18 38c-5.5 0-8-4-8-9.5C10 21 14.5 12 24 6l2.5 4C20 14 17.5 18 17.5 22c0 0 1.5-1.5 4-1.5 4 0 6.5 2.5 6.5 6.5S24 38 18 38zm22 0c-5.5 0-8-4-8-9.5C32 21 36.5 12 46 6l2.5 4C42 14 39.5 18 39.5 22c0 0 1.5-1.5 4-1.5 4 0 6.5 2.5 6.5 6.5S46 38 40 38z" fill="currentColor" />
            </svg>
            <p className={styles.manifestoQuote}>
              We don't add layers of abstraction.{' '}
              <span className={styles.manifestoHighlight}>We remove them.</span>
            </p>
            <div className={styles.manifestoDivider} />
            <p className={styles.manifestoBy}>The philosophy behind every line of code we ship.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Neural Network SVG ───────────────────────────────── */
function NeuralNetSvg() {
  const layers = [
    { n: 3, x: 60 },
    { n: 5, x: 190 },
    { n: 4, x: 320 },
    { n: 2, x: 450 },
  ];
  const H = 280;

  type Node = { x: number; y: number; li: number };
  const nodes: Node[] = [];
  layers.forEach((l, li) => {
    const gap = H / (l.n + 1);
    for (let i = 0; i < l.n; i++) nodes.push({ x: l.x, y: gap * (i + 1) + 20, li });
  });

  const conns: { x1: number; y1: number; x2: number; y2: number; d: number }[] = [];
  let ci = 0;
  for (let li = 0; li < layers.length - 1; li++) {
    const from = nodes.filter(n => n.li === li);
    const to = nodes.filter(n => n.li === li + 1);
    from.forEach(f => to.forEach(t => {
      conns.push({ x1: f.x, y1: f.y, x2: t.x, y2: t.y, d: ci * 0.04 });
      ci++;
    }));
  }

  const labels = ['Input', 'Hidden', 'Hidden', 'Output'];

  return (
    <svg viewBox="0 0 510 340" className={styles.nnSvg} aria-hidden="true">
      <defs>
        <linearGradient id="nnG1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="nnG2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="nnG3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <filter id="nGlow">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Decorative rings */}
      <circle cx="255" cy="170" r="155" fill="none" stroke="url(#nnG3)" strokeWidth="0.3" strokeOpacity="0.12" strokeDasharray="8 14" className={styles.nnRing} />
      <circle cx="255" cy="170" r="115" fill="none" stroke="url(#nnG3)" strokeWidth="0.3" strokeOpacity="0.08" strokeDasharray="4 18" className={styles.nnRing2} />

      {/* Data flow particles */}
      {conns.filter((_, i) => i % 4 === 0).map((c, i) => (
        <circle key={`p${i}`} r="2" fill="url(#nnG3)" opacity="0.7" className={styles.nnParticle}>
          <animateMotion dur={`${2 + i * 0.3}s`} repeatCount="indefinite" begin={`${i * 0.5}s`}>
            <mpath href={`#path${i}`} />
          </animateMotion>
        </circle>
      ))}
      {conns.filter((_, i) => i % 4 === 0).map((c, i) => (
        <path key={`mp${i}`} id={`path${i}`} d={`M${c.x1},${c.y1} L${c.x2},${c.y2}`} fill="none" stroke="none" />
      ))}

      {/* Connections */}
      {conns.map((c, i) => (
        <line key={`c${i}`} x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2}
          stroke={c.x1 < 200 ? 'url(#nnG1)' : 'url(#nnG2)'}
          strokeWidth="0.7"
          className={styles.nnConn}
          style={{ animationDelay: `${c.d}s` }}
        />
      ))}

      {/* Nodes */}
      {nodes.map((n, i) => {
        const c = n.li === 0 ? '#3b82f6' : n.li === layers.length - 1 ? '#06b6d4' : '#a855f7';
        return (
          <g key={`n${i}`}>
            <circle cx={n.x} cy={n.y} r="10" fill={c} fillOpacity="0.06"
              stroke={c} strokeWidth="1.2" strokeOpacity="0.35"
              className={styles.nnNode} style={{ animationDelay: `${i * 0.12}s` }}
            />
            <circle cx={n.x} cy={n.y} r="3.5" fill={c}
              className={styles.nnCore} style={{ animationDelay: `${i * 0.12 + 0.4}s` }}
              filter="url(#nGlow)"
            />
          </g>
        );
      })}

      {/* Layer labels */}
      {layers.map((l, i) => (
        <text key={`lb${i}`} x={l.x} y={320} textAnchor="middle" className={styles.nnLabel}>{labels[i]}</text>
      ))}
    </svg>
  );
}

/* ── Showcase — Aicraft ───────────────────────────────── */
function Showcase() {
  const tiltRef = useTilt(6);

  const features = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: 'SIMD Vectorized',
      text: 'AVX2, AVX-512, ARM NEON. Every hot path hand-tuned with intrinsics.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
          <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M9 9h6M9 12h6M9 15h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      title: 'GPU Compute',
      text: '14 GLSL compute shaders via Vulkan. Matrix ops on GPU.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      title: 'Autograd Engine',
      text: '22 differentiable operations. Full computational graph.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
          <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      title: 'INT8 Quantization',
      text: 'Post-training quantization. Shrink models 4x for edge.',
    },
  ];

  return (
    <section className={styles.showcase}>
      <div className={styles.showcaseBg}>
        <div className={styles.scOrb1} />
        <div className={styles.scOrb2} />
        <div className={styles.scOrb3} />
        <div className={styles.dotGrid} />
      </div>

      <div className="container" style={{ position: 'relative' }}>
        <Reveal>
          <div className={styles.showcaseHeader}>
            <span className={styles.badge}>Featured Project</span>
            <h2 className={styles.showcaseHero}>Aicraft</h2>
            <p className={styles.showcaseTagline}>Machine learning, uncompromised.</p>
            <p className={styles.showcaseDesc}>
              A complete deep learning framework in pure C. SIMD-optimized,
              Vulkan-accelerated, zero dependencies.
            </p>
          </div>
        </Reveal>

        <div className={styles.showcaseStage}>
          <Reveal>
            <div className={styles.neuralWrap} ref={tiltRef}>
              <div className={styles.neuralFrame}>
                <div className={styles.neuralBorderAnim} />
                <NeuralNetSvg />
                <div className={styles.neuralCaption}>
                  <span className={styles.neuralDot} />
                  Live forward pass — 784 → 128 → 10
                </div>
              </div>
            </div>
          </Reveal>

          <div className={styles.bentoGrid}>
            {features.map((f, i) => (
              <Reveal key={i} delay={i * 120}>
                <div className={styles.bentoCard}>
                  <div className={styles.bentoIcon}>{f.icon}</div>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                  <div className={styles.bentoGlow} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Comparison strip */}
        <Reveal>
          <div className={styles.compStrip}>
            <div className={styles.compHeader}>
              <p className={styles.sectionLabel}>How it compares</p>
            </div>
            <div className={styles.compTable}>
              <div className={styles.compRow}>
                <span className={styles.compMetric}></span>
                <span className={styles.compVal + ' ' + styles.compBrand}>Aicraft</span>
                <span className={styles.compVal}>PyTorch</span>
                <span className={styles.compVal}>TensorFlow</span>
              </div>
              <div className={styles.compRow}>
                <span className={styles.compMetric}>Binary size</span>
                <span className={styles.compVal + ' ' + styles.compBrand}>~150 KB</span>
                <span className={styles.compVal}>~800 MB</span>
                <span className={styles.compVal}>~1.8 GB</span>
              </div>
              <div className={styles.compRow}>
                <span className={styles.compMetric}>Dependencies</span>
                <span className={styles.compVal + ' ' + styles.compBrand}>0</span>
                <span className={styles.compVal}>~50</span>
                <span className={styles.compVal}>~80</span>
              </div>
              <div className={styles.compRow}>
                <span className={styles.compMetric}>Language</span>
                <span className={styles.compVal + ' ' + styles.compBrand}>C11</span>
                <span className={styles.compVal}>C++ / Python</span>
                <span className={styles.compVal}>C++ / Python</span>
              </div>
              <div className={styles.compRow}>
                <span className={styles.compMetric}>Compiles on MCU</span>
                <span className={styles.compVal + ' ' + styles.compBrand}>Yes</span>
                <span className={styles.compVal}>No</span>
                <span className={styles.compVal}>No</span>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className={styles.showcaseStats}>
            <AnimNum value={5000} suffix="+" label="Lines of C" />
            <AnimNum value={16} label="Header files" />
            <AnimNum value={14} label="GLSL shaders" />
            <AnimNum value={22} label="Autograd ops" />
            <AnimNum value={75} label="Test cases" />
            <AnimNum value={0} label="Dependencies" />
          </div>
        </Reveal>

        <div className={styles.showcaseCta}>
          <Link className={styles.btnPrimary} to="/projects/aicraft">
            <span>Read the docs</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>          <Link className={styles.btnOutline} href="https://miaototi.github.io/Aicraft/">
            Full Documentation
          </Link>          <Link className={styles.btnOutline} href="https://github.com/miaototi/Aicraft">
            View on GitHub
          </Link>
          <a className={styles.btnGhost} href="/Aicraft_Presentation.pptx" download>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2v8m0 0L5 7m3 3l3-3M3 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Presentation (.pptx)</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── Code Preview ─────────────────────────────────────── */
function CodePreview() {
  const lines = [
    { num: 1, content: <><span className={styles.cPreproc}>#include</span> <span className={styles.cStr}>"aicraft/aicraft.h"</span></> },
    { num: 2, content: <></> },
    { num: 3, content: <><span className={styles.cType}>int</span> <span className={styles.cFn}>main</span>() {'{'}</> },
    { num: 4, content: <>{'    '}<span className={styles.cFn}>ac_init</span>();</> },
    { num: 5, content: <></> },
    { num: 6, content: <>{'    '}<span className={styles.cComment}>{'// Build a simple classifier'}</span></> },
    { num: 7, content: <>{'    '}<span className={styles.cType}>AcLayer</span> *net[] = {'{'}</> },
    { num: 8, content: <>{'        '}<span className={styles.cFn}>ac_dense</span>(<span className={styles.cNum}>784</span>, <span className={styles.cNum}>128</span>, <span className={styles.cConst}>AC_RELU</span>),</> },
    { num: 9, content: <>{'        '}<span className={styles.cFn}>ac_dense</span>(<span className={styles.cNum}>128</span>, <span className={styles.cNum}>10</span>, <span className={styles.cConst}>AC_SOFTMAX</span>)</> },
    { num: 10, content: <>{'    '}{'}'};{'\n'}</> },
    { num: 11, content: <>{'    '}<span className={styles.cComment}>{'// Forward + backward'}</span></> },
    { num: 12, content: <>{'    '}<span className={styles.cType}>AcTensor</span> *x = <span className={styles.cFn}>ac_tensor_rand</span>((<span className={styles.cType}>int</span>[]){'{'}<span className={styles.cNum}>1</span>, <span className={styles.cNum}>784</span>{'}'}, <span className={styles.cNum}>2</span>);</> },
    { num: 13, content: <>{'    '}<span className={styles.cType}>AcTensor</span> *y = <span className={styles.cFn}>ac_forward_seq</span>(net, <span className={styles.cNum}>2</span>, x);</> },
    { num: 14, content: <>{'    '}<span className={styles.cFn}>ac_backward</span>(y);</> },
    { num: 15, content: <></> },
    { num: 16, content: <>{'    '}<span className={styles.cFn}>ac_cleanup</span>();</> },
    { num: 17, content: <>{'}'}</> },
  ];

  return (
    <section className={styles.codeSection}>
      <div className="container">
        <div className={styles.codeLayout}>
          <Reveal>
            <div className={styles.codeInfo}>
              <p className={styles.sectionLabel}>Dead simple</p>
              <h2 className={styles.codeTitle}>Include. Compile. Run.</h2>
              <p className={styles.codeDesc}>
                No CMake wizardry, no vcpkg, no conan. Add the include folder
                to your compiler path and you're done. Header-only.
              </p>
              <div className={styles.techPills}>
                <span>C11</span><span>Header-only</span><span>MIT License</span><span>Cross-platform</span>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <div className={styles.codeWindow}>
              <div className={styles.codeBar}>
                <span className={styles.dot} style={{ background: '#ff5f57' }} />
                <span className={styles.dot} style={{ background: '#febc2e' }} />
                <span className={styles.dot} style={{ background: '#28c840' }} />
                <span className={styles.codeFilename}>demo.c</span>
              </div>
              <div className={styles.codeBody}>
                <div className={styles.lineNumbers}>
                  {lines.map(l => <span key={l.num}>{l.num}</span>)}
                </div>
                <pre className={styles.codePre}>
                  <code>
                    {lines.map(l => <div key={l.num} className={`${styles.codeLine} ${l.num === 8 ? styles.codeLineActive : ''}`}>{l.content}</div>)}
                  </code>
                </pre>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── Philosophy ───────────────────────────────────────── */
function Philosophy() {
  const cards = [
    {
      num: '01',
      title: 'Performance is non-negotiable',
      text: 'We write C, not wrappers around C. Every hot path is profiled, every allocation is intentional.',
    },
    {
      num: '02',
      title: 'Zero dependencies',
      text: 'Our software compiles on anything with a C compiler. No package managers, no supply-chain risk.',
    },
    {
      num: '03',
      title: 'Built in the open',
      text: 'Every line is public. We believe engineers deserve tools they can read, understand, and extend.',
    },
  ];

  return (
    <section className={styles.philosophy}>
      <div className="container">
        <Reveal>
          <div>
            <p className={styles.sectionLabel}>Our approach</p>
            <h2 className={styles.sectionTitle}>
              We don't ship features.<br />
              <span className={styles.sectionTitleAccent}>We ship engineering.</span>
            </h2>
          </div>
        </Reveal>
        <div className={styles.philoGrid}>
          {cards.map((c, i) => (
            <Reveal key={c.num} delay={i * 150}>
              <div className={styles.philoCard}>
                <span className={styles.philoWatermark}>{c.num}</span>
                <span className={styles.philoNum}>{c.num}</span>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
                <div className={styles.philoGradient} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Stack ────────────────────────────────────────────── */
function Stack() {
  const items = [
    { name: 'C11', desc: 'Core language' },
    { name: 'GLSL', desc: 'Compute shaders' },
    { name: 'Vulkan', desc: 'GPU runtime' },
    { name: 'AVX-512', desc: 'x86 SIMD' },
    { name: 'NEON', desc: 'ARM SIMD' },
    { name: 'GCC / Clang', desc: 'Compilers' },
  ];

  return (
    <section className={styles.stack}>
      <div className="container">
        <Reveal>
          <div>
            <p className={styles.sectionLabel}>Tech stack</p>
            <h2 className={styles.sectionTitle}>What we build with</h2>
          </div>
        </Reveal>
        <div className={styles.stackGrid}>
          {items.map((it, i) => (
            <Reveal key={it.name} delay={i * 80}>
              <div className={styles.stackItem}>
                <span className={styles.stackName}>{it.name}</span>
                <span className={styles.stackDesc}>{it.desc}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Contact ──────────────────────────────────────────── */
function Contact() {
  const contacts = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" width="24" height="24">
          <rect x="2" y="4" width="20" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" />
          <path d="M2 7l10 6 10-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      label: 'General',
      value: 'segreteria@tmsoftwares.eu',
      href: 'mailto:segreteria@tmsoftwares.eu',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" width="24" height="24">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
      label: 'Tobias Tesauri',
      value: 'tobiastesauri@tmsoftwares.eu',
      href: 'mailto:tobiastesauri@tmsoftwares.eu',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" width="24" height="24">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.86 19.86 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.86 19.86 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      label: 'Telefono',
      value: '+39 351 550 7405',
      href: 'tel:+393515507405',
    },
  ];

  return (
    <section className={styles.contact}>
      <div className="container">
        <Reveal>
          <div className={styles.contactHeader}>
            <p className={styles.sectionLabel}>Contatti</p>
            <h2 className={styles.sectionTitle}>
              Get in touch<span className={styles.sectionTitleAccent}>.</span>
            </h2>
          </div>
        </Reveal>
        <div className={styles.contactGrid}>
          {contacts.map((c, i) => (
            <Reveal key={c.value} delay={i * 120}>
              <a href={c.href} className={styles.contactCard}>
                <div className={styles.contactIcon}>{c.icon}</div>
                <span className={styles.contactLabel}>{c.label}</span>
                <span className={styles.contactValue}>{c.value}</span>
                <div className={styles.contactGlow} />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Preventivo (Quote Request) ────────────────────────── */
function Preventivo() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [service, setService] = useState('');

  const services = [
    { id: 'custom', label: 'Programma personalizzato', desc: 'Software su misura per le tue esigenze specifiche' },
    { id: 'deploy', label: 'Installamento su larga scala', desc: 'Deploy e configurazione su infrastrutture enterprise' },
    { id: 'consulting', label: 'Consulenza tecnica', desc: 'Analisi, architettura e ottimizzazione sistemi' },
    { id: 'maintenance', label: 'Manutenzione e supporto', desc: 'Assistenza continuativa e aggiornamenti' },
    { id: 'embedded', label: 'Soluzioni embedded / IoT', desc: 'Firmware e software per dispositivi dedicati' },
    { id: 'other', label: 'Altro', desc: 'Descrivi il tuo progetto nel messaggio' },
  ];

  if (submitted) {
    return (
      <section className={styles.preventivo}>
        <div className="container">
          <Reveal>
            <div className={styles.prevSuccess}>
              <div className={styles.prevSuccessIcon}>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="22" stroke="#22c55e" strokeWidth="2" />
                  <path d="M15 24l6 6 12-12" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3>Richiesta inviata</h3>
              <p>Ti risponderemo il prima possibile a segreteria@tmsoftwares.eu</p>
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.preventivo}>
      <div className={styles.noise} />
      <div className="container" style={{ position: 'relative' }}>
        <Reveal>
          <div className={styles.prevHeader}>
            <p className={styles.sectionLabel}>Preventivo</p>
            <h2 className={styles.sectionTitle}>
              Richiedi un preventivo<span className={styles.sectionTitleAccent}>.</span>
            </h2>
            <p className={styles.prevSubtitle}>Seleziona il servizio, compila il modulo e ti ricontatteremo entro 24 ore.</p>
          </div>
        </Reveal>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setSending(true);
            const data = new FormData(e.currentTarget);
            try {
              await fetch('https://formsubmit.co/ajax/segreteria@tmsoftwares.eu', {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: data,
              });
              setSubmitted(true);
            } catch {
              setSubmitted(true);
            } finally {
              setSending(false);
            }
          }}
          className={styles.prevForm}
        >
          {/* Formsubmit config */}
          <input type="hidden" name="_subject" value="Nuova richiesta preventivo — T&M Softwares" />
          <input type="hidden" name="_template" value="table" />
          <input type="text" name="_honey" style={{ display: 'none' }} />

          {/* Service selection */}
          <Reveal>
            <div className={styles.prevServices}>
              {services.map((s, i) => (
                <label
                  key={s.id}
                  className={`${styles.prevServiceCard} ${service === s.id ? styles.prevServiceActive : ''}`}
                >
                  <input
                    type="radio"
                    name="Servizio"
                    value={s.label}
                    checked={service === s.id}
                    onChange={() => setService(s.id)}
                    required
                    className={styles.prevRadio}
                  />
                  <div className={styles.prevServiceCheck}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 7l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <span className={styles.prevServiceName}>{s.label}</span>
                    <span className={styles.prevServiceDesc}>{s.desc}</span>
                  </div>
                </label>
              ))}
            </div>
          </Reveal>

          {/* Form fields */}
          <Reveal delay={100}>
            <div className={styles.prevFields}>
              <div className={styles.prevRow}>
                <div className={styles.prevField}>
                  <label className={styles.prevLabel} htmlFor="prev-name">Nome / Azienda</label>
                  <input className={styles.prevInput} type="text" id="prev-name" name="Nome" required placeholder="es. Mario Rossi" />
                </div>
                <div className={styles.prevField}>
                  <label className={styles.prevLabel} htmlFor="prev-email">Email</label>
                  <input className={styles.prevInput} type="email" id="prev-email" name="Email" required placeholder="es. info@azienda.it" />
                </div>
              </div>
              <div className={styles.prevRow}>
                <div className={styles.prevField}>
                  <label className={styles.prevLabel} htmlFor="prev-phone">Telefono (opzionale)</label>
                  <input className={styles.prevInput} type="tel" id="prev-phone" name="Telefono" placeholder="es. +39 333 1234567" />
                </div>
                <div className={styles.prevField}>
                  <label className={styles.prevLabel} htmlFor="prev-budget">Budget indicativo</label>
                  <select className={styles.prevInput} id="prev-budget" name="Budget">
                    <option value="">Seleziona...</option>
                    <option value="< 1.000 €">&lt; 1.000 &euro;</option>
                    <option value="1.000 - 5.000 €">1.000 - 5.000 &euro;</option>
                    <option value="5.000 - 15.000 €">5.000 - 15.000 &euro;</option>
                    <option value="15.000 - 50.000 €">15.000 - 50.000 &euro;</option>
                    <option value="> 50.000 €">&gt; 50.000 &euro;</option>
                  </select>
                </div>
              </div>
              <div className={styles.prevField}>
                <label className={styles.prevLabel} htmlFor="prev-msg">Descrizione del progetto</label>
                <textarea className={styles.prevTextarea} id="prev-msg" name="Messaggio" rows={5} required placeholder="Descrivi brevemente il progetto, le tempistiche e le funzionalita richieste..." />
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className={styles.prevSubmitWrap}>
              <button type="submit" className={styles.btnPrimary} disabled={sending}>
                <span>{sending ? 'Invio in corso...' : 'Invia richiesta'}</span>
                {!sending && (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 8l5-5M2 8l5 5M2 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
              <p className={styles.prevDisclaimer}>I tuoi dati saranno utilizzati esclusivamente per rispondere alla tua richiesta.</p>
            </div>
          </Reveal>
        </form>
      </div>
    </section>
  );
}

/* ── CTA ──────────────────────────────────────────────── */
function CTA() {
  return (
    <section className={styles.cta}>
      <div className={styles.ctaAurora}>
        <div className={styles.auroraA} />
        <div className={styles.auroraB} />
        <div className={styles.auroraC} />
      </div>
      <div className="container" style={{ position: 'relative' }}>
        <Reveal>
          <div>
            <p className={styles.sectionLabel}>Get started</p>
            <h2 className={styles.ctaTitle}>
              Ready to see what<br />pure C can do?
            </h2>
            <p className={styles.ctaSub}>Explore Aicraft, read the docs, or dive into the source.</p>
            <div className={styles.heroCta} style={{ justifyContent: 'center' }}>
              <Link className={styles.btnPrimary} to="/projects/aicraft">
                <span>Get started</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link className={styles.btnGhost} href="https://github.com/miaototi">
                Follow on GitHub <span className={styles.arrow}>&#8594;</span>
              </Link>
            </div>
            <p className={styles.credit}>T&M Softwares — Tobias Tesauri</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Page ─────────────────────────────────────────────── */
export default function Home(): React.JSX.Element {
  return (
    <Layout title="Home" description="T&M Softwares — Engineering software that matters.">
      <Hero />
      <Ticker />
      <Manifesto />
      <Showcase />
      <CodePreview />
      <Philosophy />
      <Stack />
      <Contact />
      <Preventivo />
      <CTA />
    </Layout>
  );
}
