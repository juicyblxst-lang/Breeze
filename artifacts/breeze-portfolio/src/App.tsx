import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { ArrowDown, ArrowLeft, ArrowUpRight, ChevronRight, Menu, Plus, Volume2, VolumeX, X } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { portfolio, audioAssetPath, discordDestination, type Project, type ProjectCategory } from '@/data/portfolio';

const queryClient = new QueryClient();

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll('[data-reveal]');
    if (!('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const move = (event: PointerEvent) => {
      if (dot.current) {
        dot.current.style.left = `${event.clientX}px`;
        dot.current.style.top = `${event.clientY}px`;
      }
      if (ring.current) {
        ring.current.style.left = `${event.clientX}px`;
        ring.current.style.top = `${event.clientY}px`;
      }
    };
    const over = (event: PointerEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest('a, button, [role="button"]')) ring.current?.classList.add('cursor-hover');
    };
    const out = (event: PointerEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest('a, button, [role="button"]')) ring.current?.classList.remove('cursor-hover');
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerover', over);
    window.addEventListener('pointerout', out);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', over);
      window.removeEventListener('pointerout', out);
    };
  }, []);
  return <><div className="cursor-dot" ref={dot} aria-hidden="true" /><div className="cursor-ring" ref={ring} aria-hidden="true" /></>;
}

function LoadingSequence({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = window.setTimeout(onComplete, 1150);
    return () => window.clearTimeout(timer);
  }, [onComplete]);
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-[#101116] text-[#e8e7dc]" aria-label="Loading Breeze portfolio">
      <div className="w-[min(420px,80vw)]">
        <div className="mb-8 flex items-center justify-between">
          <span className="display text-xl font-bold tracking-[-.08em]">breeze<span className="text-[#d5ff65]">.</span></span>
          <span className="mono text-[10px] uppercase tracking-[.18em] text-[#8f918c]">initializing / 001</span>
        </div>
        <div className="h-px overflow-hidden bg-white/15"><div className="h-full w-full origin-left animate-[load_1.05s_ease-in-out_forwards] bg-[#d5ff65]" /></div>
        <div className="mt-3 flex justify-between mono text-[10px] uppercase tracking-[.14em] text-[#8f918c]"><span>digital workspace</span><span>ready soon</span></div>
      </div>
      <style>{'@keyframes load { from { transform: scaleX(0); } to { transform: scaleX(1); } }'}</style>
    </div>
  );
}

function Header({ menuOpen, setMenuOpen, onSound, soundOn, volume, onVolume }: { menuOpen: boolean; setMenuOpen: (open: boolean) => void; onSound: () => void; soundOn: boolean; volume: number; onVolume: (volume: number) => void }) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };
  return (
    <header className="fixed left-0 right-0 top-0 z-40 px-5 py-5 md:px-10 md:py-7">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between">
        <button onClick={() => scrollTo('top')} className="display text-xl font-bold tracking-[-.09em] text-[#e8e7dc]" data-testid="button-logo">breeze<span className="text-[#d5ff65]">.</span></button>
        <div className="hidden items-center gap-8 md:flex">
          <button onClick={() => scrollTo('work')} className="eyebrow text-[#e8e7dc] transition-colors hover:text-[#d5ff65]" data-testid="button-nav-work">Selected work</button>
          <button onClick={() => scrollTo('about')} className="eyebrow text-[#e8e7dc] transition-colors hover:text-[#d5ff65]" data-testid="button-nav-about">About</button>
          <button onClick={() => scrollTo('contact')} className="eyebrow text-[#e8e7dc] transition-colors hover:text-[#d5ff65]" data-testid="button-nav-contact">Contact</button>
          <button onClick={onSound} className="eyebrow flex items-center gap-2 text-[#8f918c] transition-colors hover:text-[#d5ff65]" data-testid="button-sound">
            {soundOn ? <Volume2 size={13} strokeWidth={1.5} /> : <VolumeX size={13} strokeWidth={1.5} />}
            sound {soundOn ? 'on' : 'off'}
          </button>
          <label className="flex items-center gap-2" title={`Volume ${Math.round(volume * 100)}%`}>
            <span className="sr-only">Volume</span><input aria-label="Volume" data-testid="input-volume" type="range" min="0" max="1" step="0.05" value={volume} onChange={(event) => onVolume(Number(event.target.value))} className="h-1 w-16 accent-[#d5ff65]" />
          </label>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="flex h-10 w-10 items-center justify-center border border-white/15 text-[#e8e7dc] md:hidden" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} data-testid="button-mobile-menu">
          {menuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>
      {menuOpen && (
        <div className="absolute left-4 right-4 top-[72px] border border-white/15 bg-[#171920]/95 p-5 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-5">
            {['work', 'about', 'contact'].map((item) => <button key={item} onClick={() => scrollTo(item)} className="eyebrow text-left text-[#e8e7dc]" data-testid={`button-mobile-nav-${item}`}>{item === 'work' ? 'Selected work' : item}</button>)}
            <button onClick={onSound} className="eyebrow flex items-center gap-2 text-left text-[#8f918c]" data-testid="button-mobile-sound">{soundOn ? <Volume2 size={13} /> : <VolumeX size={13} />} sound {soundOn ? 'on' : 'off'}</button>
            <label className="flex items-center gap-3 eyebrow text-[#8f918c]"><span>volume</span><input aria-label="Mobile volume" data-testid="input-mobile-volume" type="range" min="0" max="1" step="0.05" value={volume} onChange={(event) => onVolume(Number(event.target.value))} className="h-1 flex-1 accent-[#d5ff65]" /></label>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="hero-grid relative flex min-h-[min(900px,100dvh)] items-end overflow-hidden px-5 pb-14 pt-32 md:px-10 md:pb-16">
      <div className="hero-orbit orbit-motion" aria-hidden="true"><span className="orbit-spark" /></div>
      <span className="hero-line one" aria-hidden="true" /><span className="hero-line two" aria-hidden="true" />
      <div className="relative z-10 mx-auto w-full max-w-[1440px]">
        <div className="mb-10 flex flex-col justify-between gap-5 md:mb-16 md:flex-row md:items-end">
          <p className="eyebrow reveal max-w-[240px] text-[#d5ff65]">Independent builder<br />AI / full-stack / web3</p>
          <p className="reveal delay-1 max-w-[210px] text-sm leading-relaxed text-[#8f918c] md:mr-[18%]">Digital systems for people who care how things work.</p>
        </div>
        <h1 className="display hero-word reveal delay-2 max-w-[1100px] font-extrabold text-[#e8e7dc]" data-testid="text-hero-title">Breeze<span className="text-[#d5ff65]">.</span></h1>
        <div className="mt-9 flex flex-col justify-between gap-8 md:mt-14 md:flex-row md:items-end">
          <p className="display max-w-[520px] text-2xl font-semibold leading-[1.03] tracking-[-.06em] text-[#e8e7dc] md:text-4xl">I build the things I can’t stop thinking about.</p>
          <a href="#work" className="group eyebrow flex items-center gap-3 text-[#e8e7dc]" data-testid="link-scroll-work">scroll to explore <ArrowDown size={15} className="transition-transform group-hover:translate-y-1" /></a>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-5 right-5 mono text-[9px] tracking-[.14em] text-white/25 md:right-10">37° 46′ N / 122° 25′ W</div>
    </section>
  );
}

function Intro() {
  return (
    <section className="px-5 py-28 md:px-10 md:py-48" data-reveal>
      <div className="mx-auto grid max-w-[1440px] gap-10 md:grid-cols-[1fr_2fr]">
        <span className="eyebrow text-[#d5ff65]">01 / context</span>
        <div>
          <p className="display max-w-[920px] text-4xl font-semibold leading-[.98] tracking-[-.07em] text-[#e8e7dc] md:text-7xl">The internet is full of tools. I’m interested in the ones that feel like they were made by someone who noticed.</p>
          <div className="mt-12 grid max-w-[760px] gap-8 border-t border-white/15 pt-6 text-sm leading-relaxed text-[#8f918c] md:grid-cols-2">
            <p>Not a studio. Not a template. Just one person moving between systems, interfaces, and the occasional rabbit hole until the result feels obvious.</p>
            <p className="text-[#e8e7dc]">Scroll through a few open threads below. Some have names. Some are waiting for one.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: (project: Project) => void }) {
  return (
    <button onClick={() => onOpen(project)} className="project-card group relative min-h-[360px] overflow-hidden border border-white/15 bg-[#14161c] p-6 text-left md:min-h-[410px] md:p-8" style={{ '--project-accent': project.accent } as CSSProperties} data-testid={`card-project-${project.id}`}>
      <div className="absolute -right-10 -top-12 h-44 w-44 rounded-full border border-[var(--project-accent)]/20 opacity-50 transition-transform duration-700 group-hover:scale-125" />
      <div className="absolute right-8 top-9 h-2 w-2 rounded-full bg-[var(--project-accent)]" />
      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-start justify-between">
          <span className="mono text-[11px] text-[#8f918c]">{project.index} / 03</span>
          <span className="eyebrow text-[#8f918c]">{project.status}</span>
        </div>
        <div>
          <p className="eyebrow mb-5 text-[var(--project-accent)]">{project.eyebrow}</p>
          <h3 className="display max-w-[430px] text-4xl font-bold leading-[.95] tracking-[-.07em] text-[#e8e7dc] md:text-5xl">{project.title}</h3>
          <p className="mt-5 max-w-[330px] text-sm leading-relaxed text-[#8f918c]">{project.description}</p>
          <span className="card-arrow mt-8 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-[#e8e7dc]"><ArrowUpRight size={17} /></span>
        </div>
      </div>
    </button>
  );
}

function Work() {
  const [active, setActive] = useState<ProjectCategory>('AI Agents');
  const [selected, setSelected] = useState<Project | null>(null);
  const projects = useMemo(() => portfolio.projects.filter((project) => project.category === active), [active]);
  const close = () => setSelected(null);
  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : '';
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') close(); };
    window.addEventListener('keydown', closeOnEscape);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', closeOnEscape); };
  }, [selected]);
  return (
    <section id="work" className="px-5 pb-32 md:px-10 md:pb-52">
      <div className="mx-auto max-w-[1440px]">
        <div className="section-rule mb-8 pt-5" data-reveal>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div><span className="eyebrow text-[#d5ff65]">02 / selected work</span><h2 className="display mt-5 text-5xl font-bold tracking-[-.08em] md:text-8xl">Open threads<span className="text-[#d5ff65]">.</span></h2></div>
            <p className="max-w-[280px] text-sm leading-relaxed text-[#8f918c]">Four places my attention tends to wander. Tap a project to open the thinking behind it.</p>
          </div>
        </div>
        <div className="mb-8 flex max-w-full gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Project categories">
          {portfolio.categories.map((category) => (
            <button key={category} onClick={() => setActive(category)} role="tab" aria-selected={active === category} className={`category-pill shrink-0 border px-4 py-3 eyebrow ${active === category ? 'active' : 'border-white/15 text-[#8f918c] hover:border-white/35 hover:text-[#e8e7dc]'}`} data-testid={`button-category-${category.toLowerCase().replace(' ', '-')}`}>{category}</button>
          ))}
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {projects.map((project) => <ProjectCard key={project.id} project={project} onOpen={setSelected} />)}
        </div>
      </div>
      {selected && <ProjectDetail project={selected} onClose={close} />}
    </section>
  );
}

function ProjectDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div className="detail-backdrop fixed inset-0 z-50 overflow-y-auto p-4 md:p-10" role="dialog" aria-modal="true" aria-label={`${project.title} details`} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="detail-panel mx-auto flex min-h-[calc(100dvh-2rem)] max-w-[1160px] flex-col border border-white/20 bg-[#14161c] p-6 md:min-h-0 md:p-12">
        <div className="flex items-center justify-between border-b border-white/15 pb-5">
          <span className="eyebrow text-[#d5ff65]">{project.category} / {project.index}</span>
          <button onClick={onClose} className="flex items-center gap-2 eyebrow text-[#8f918c] hover:text-[#e8e7dc]" data-testid="button-close-project"><X size={16} /> close</button>
        </div>
        <div className="grid flex-1 gap-12 py-14 md:grid-cols-[1.25fr_1fr] md:items-center md:py-24">
          <div>
            <span className="mb-6 block h-3 w-3 rounded-full" style={{ background: project.accent }} />
            <h2 className="display text-6xl font-bold leading-[.9] tracking-[-.09em] md:text-9xl">{project.title}<span className="text-[#d5ff65]">.</span></h2>
          </div>
          <div className="max-w-[430px]">
            <p className="eyebrow mb-5" style={{ color: project.accent }}>{project.eyebrow}</p>
            <p className="display text-2xl font-semibold leading-tight tracking-[-.05em] text-[#e8e7dc] md:text-4xl">{project.description}</p>
            <p className="mt-8 text-sm leading-relaxed text-[#8f918c]">{project.detail}</p>
            <div className="mt-10 flex items-center gap-3 border-t border-white/15 pt-5 mono text-[10px] uppercase tracking-[.14em] text-[#8f918c]"><span className="h-1.5 w-1.5 rounded-full bg-[#d5ff65]" /> case study / details to follow</div>
          </div>
        </div>
        <div className="border-t border-white/15 pt-5"><button onClick={onClose} className="group flex items-center gap-3 eyebrow text-[#e8e7dc]" data-testid="button-back-work"><ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" /> back to all work</button></div>
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="bg-[#d5ff65] px-5 py-28 text-[#101116] md:px-10 md:py-48" data-reveal>
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-14 md:grid-cols-[1fr_2fr]">
          <span className="eyebrow text-[#424b1f]">03 / the person behind it</span>
          <div>
            <p className="display max-w-[960px] text-4xl font-bold leading-[.95] tracking-[-.075em] md:text-7xl">A bad habit of getting obsessed with problems.</p>
            <p className="mt-12 max-w-[690px] text-lg leading-relaxed text-[#424b1f]">{portfolio.bio}</p>
          </div>
        </div>
        <div className="mt-24 grid border-t border-[#101116]/20 pt-5 md:grid-cols-[1fr_2fr]">
          <span className="eyebrow text-[#424b1f]">Current toolkit</span>
          <div className="flex flex-wrap gap-x-7 gap-y-4">
            {portfolio.skills.map((skill, index) => <span key={skill} className="display text-xl font-semibold tracking-[-.05em] md:text-2xl" data-testid={`text-skill-${index}`}>{skill}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function Principles() {
  const principles = [
    ['01', 'Make it useful', 'A clever system is only interesting if it earns a place in someone’s day.'],
    ['02', 'Stay with the question', 'The first answer is usually a direction, not a destination.'],
    ['03', 'Keep the surface calm', 'Complexity belongs in the machine, not in the way it feels to use.'],
  ];
  return (
    <section className="px-5 py-28 md:px-10 md:py-44" data-reveal>
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-16 flex items-end justify-between"><span className="eyebrow text-[#d5ff65]">04 / working notes</span><span className="mono text-[10px] text-[#8f918c]">a few things I keep close</span></div>
        <div className="grid border-t border-white/15 md:grid-cols-3">
          {principles.map(([number, title, copy]) => <article key={number} className="border-b border-white/15 py-7 md:border-b-0 md:border-r md:p-8 md:pl-0 md:pr-10 first:pt-7 last:border-r-0">
            <div className="mb-16 flex justify-between"><span className="mono text-[10px] text-[#d5ff65]">{number}</span><Plus size={16} className="text-[#8f918c]" /></div>
            <h3 className="display text-3xl font-bold tracking-[-.07em]">{title}</h3><p className="mt-4 max-w-[280px] text-sm leading-relaxed text-[#8f918c]">{copy}</p>
          </article>)}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const copyAddress = async () => {
    await navigator.clipboard?.writeText('hello@breeze.build');
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };
  return (
    <section id="contact" className="relative overflow-hidden border-t border-white/15 px-5 py-32 md:px-10 md:py-52" data-reveal>
      <div className="absolute -right-24 top-20 h-80 w-80 rounded-full border border-[#d5ff65]/20 md:h-[500px] md:w-[500px]" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1440px]">
        <span className="eyebrow text-[#d5ff65]">05 / contact</span>
        <h2 className="display mt-8 max-w-[980px] text-6xl font-bold leading-[.88] tracking-[-.09em] md:text-[9.5rem]">Have a problem<br /><span className="text-[#d5ff65]">worth obsessing over?</span></h2>
        <div className="mt-14 flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <button onClick={copyAddress} className="group flex items-center gap-3 text-left display text-2xl font-semibold tracking-[-.06em] text-[#e8e7dc] md:text-4xl" data-testid="button-copy-email"><span className="border-b border-[#d5ff65] pb-1">hello@breeze.build</span><ChevronRight size={25} className="text-[#d5ff65] transition-transform group-hover:translate-x-1" />{copied && <span className="eyebrow text-[#d5ff65]">copied</span>}</button>
          <div className="flex gap-7">
            <a href="https://t.me/breeze0x" target="_blank" rel="noreferrer" className="eyebrow text-[#8f918c] hover:text-[#d5ff65]" data-testid="link-telegram">Telegram <ArrowUpRight size={13} className="inline" /></a>
            {discordDestination ? <a href={discordDestination} target="_blank" rel="noreferrer" className="eyebrow text-[#8f918c] hover:text-[#d5ff65]" data-testid="link-discord">Discord / @0xbreeze <ArrowUpRight size={13} className="inline" /></a> : <span className="eyebrow text-[#8f918c]" data-testid="text-discord">Discord / @0xbreeze</span>}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="overflow-hidden border-t border-white/15 px-5 py-7 md:px-10">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <span className="display text-lg font-bold tracking-[-.08em]">breeze<span className="text-[#d5ff65]">.</span></span>
        <span className="mono text-[10px] uppercase tracking-[.14em] text-[#8f918c]">made with curiosity / 2025</span>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2 eyebrow text-[#8f918c] hover:text-[#d5ff65]" data-testid="button-back-top">back to top <ArrowUpRight size={13} /></button>
      </div>
      <div className="marquee mt-16 display text-[18vw] font-bold leading-[.7] tracking-[-.11em] text-white/[.035]" aria-hidden="true">KEEP BUILDING / KEEP BUILDING / KEEP BUILDING / </div>
    </footer>
  );
}

function Home() {
  const [ready, setReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(() => localStorage.getItem('breeze-sound') === 'on');
  const [volume, setVolume] = useState(() => Number(localStorage.getItem('breeze-volume') ?? '0.35'));
  useReveal();
  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    localStorage.setItem('breeze-sound', next ? 'on' : 'off');
  };
  const updateVolume = (next: number) => {
    setVolume(next);
    localStorage.setItem('breeze-volume', String(next));
  };
  return (
    <>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} onSound={toggleSound} soundOn={soundOn} volume={volume} onVolume={updateVolume} />
      <main className="breeze-app noise">
      {!ready && <LoadingSequence onComplete={() => setReady(true)} />}
      <Cursor />
      <Hero />
      <Intro />
      <Work />
      <About />
      <Principles />
      <Contact />
      <Footer />
      <div className="fixed bottom-5 left-5 z-30 hidden items-center gap-2 mono text-[9px] uppercase tracking-[.14em] text-white/30 md:flex"><span className="h-1.5 w-1.5 rounded-full bg-[#d5ff65]" /> audio off by default / local only / asset: {audioAssetPath}</div>
      </main>
    </>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  return <ErrorBoundary resetKey="/">{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <RoutedErrorBoundary><Home /></RoutedErrorBoundary>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;