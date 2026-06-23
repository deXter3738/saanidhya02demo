import { ArrowRight, Check } from 'lucide-react';
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { useRef } from 'react';

const PRIMARY_TEXT = '#E1E0CC';
const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const CARD_EASE = [0.22, 1, 0.36, 1] as const;

const heroVideo =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4';

const featureVideo =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4';

const navItems = ['Our story', 'Collective', 'Workshops', 'Programs', 'Inquiries'];

const featureCards = [
  {
    number: '01',
    title: 'Project Storyboard.',
    icon:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85',
    checks: [
      'Map scenes, frames, and creative references.',
      'Shape production goals with a clear visual arc.',
      'Sync notes across collaborators in real time.',
      'Turn early sparks into shoot-ready direction.',
    ],
  },
  {
    number: '02',
    title: 'Smart Critiques.',
    icon:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85',
    checks: [
      'AI analysis tuned for cinematic craft.',
      'Creative notes that stay sharp and useful.',
      'Tool integrations for fast review loops.',
    ],
  },
  {
    number: '03',
    title: 'Immersion Capsule.',
    icon:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85',
    checks: [
      'Silence notifications during deep work.',
      'Ambient soundscapes matched to your brief.',
      'Schedule syncing that protects focus windows.',
    ],
  },
];

type WordsPullUpProps = {
  text: string;
  className?: string;
  wordClassName?: string;
  showAsterisk?: boolean;
};

type MultiStyleSegment = {
  text: string;
  className?: string;
  breakAfter?: boolean;
};

type WordsPullUpMultiStyleProps = {
  segments: MultiStyleSegment[];
  className?: string;
};

function AsteriskWord({ word }: { word: string }) {
  const prefix = word.slice(0, -1);
  const finalLetter = word.slice(-1);

  return (
    <>
      {prefix}
      <span className="relative inline-block">
        {finalLetter}
        <span className="absolute -right-[0.3em] top-[0.65em] text-[0.31em] leading-none">
          *
        </span>
      </span>
    </>
  );
}

function WordsPullUp({ text, className = '', wordClassName = '', showAsterisk }: WordsPullUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const words = text.split(' ');

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, index) => {
        const isLastWord = index === words.length - 1;

        return (
          <span
            key={`${word}-${index}`}
            className={`inline-flex pb-[0.08em] ${
              showAsterisk && isLastWord ? 'overflow-visible' : 'overflow-hidden'
            }`}
          >
            <motion.span
              className={`inline-block ${wordClassName}`}
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.85, ease: EASE_OUT, delay: index * 0.08 }}
            >
              {showAsterisk && isLastWord ? <AsteriskWord word={word} /> : word}
              {isLastWord ? null : '\u00A0'}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}

function WordsPullUpMultiStyle({ segments, className = '' }: WordsPullUpMultiStyleProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  let wordIndex = 0;

  return (
    <span ref={ref} className={`inline-flex flex-wrap justify-center ${className}`}>
      {segments.flatMap((segment, segmentIndex) => {
        const words = segment.text.trim().split(/\s+/);
        const rendered = words.map((word, index) => {
          const currentWordIndex = wordIndex;
          wordIndex += 1;
          const isLastWordInSegment = index === words.length - 1;

          return (
            <span
              key={`${segmentIndex}-${word}-${index}`}
              className="inline-flex overflow-hidden pb-[0.12em]"
            >
              <motion.span
                className={`inline-block ${segment.className ?? ''}`}
                initial={{ y: 20, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{
                  duration: 0.8,
                  ease: EASE_OUT,
                  delay: currentWordIndex * 0.08,
                }}
              >
                {word}
                {isLastWordInSegment ? null : '\u00A0'}
              </motion.span>
            </span>
          );
        });

        if (segment.breakAfter) {
          rendered.push(<span key={`${segmentIndex}-break`} className="basis-full" />);
        } else if (segmentIndex < segments.length - 1) {
          rendered.push(
            <span key={`${segmentIndex}-space`} className="inline-flex overflow-hidden">
              <span>&nbsp;</span>
            </span>,
          );
        }

        return rendered;
      })}
    </span>
  );
}

function AnimatedLetter({
  letter,
  index,
  total,
  progress,
}: {
  letter: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const charProgress = index / total;
  const opacity = useTransform(progress, [charProgress - 0.1, charProgress + 0.05], [0.2, 1]);

  return (
    <motion.span aria-hidden="true" style={{ opacity, whiteSpace: 'pre-wrap' }}>
      {letter}
    </motion.span>
  );
}

function Hero() {
  return (
    <section className="h-screen bg-black p-4 md:p-6" style={{ color: PRIMARY_TEXT }}>
      <div className="relative h-full overflow-hidden rounded-2xl bg-black md:rounded-[2rem]">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.7] mix-blend-overlay" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

        <nav className="absolute left-1/2 top-0 z-20 -translate-x-1/2">
          <div className="flex items-center gap-3 rounded-b-2xl bg-black px-4 py-2 sm:gap-6 md:gap-12 md:rounded-b-3xl md:px-8 lg:gap-14">
            {navItems.map((item) => (
              <a
                key={item}
                href="#about"
                className="whitespace-nowrap text-[10px] transition-colors duration-300 sm:text-xs md:text-sm"
                style={{ color: 'rgba(225, 224, 204, 0.8)' }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.color = PRIMARY_TEXT;
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.color = 'rgba(225, 224, 204, 0.8)';
                }}
              >
                {item}
              </a>
            ))}
          </div>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-5 sm:px-6 sm:pb-8 md:px-10 md:pb-10">
          <div className="grid grid-cols-1 items-end gap-5 lg:grid-cols-12 lg:gap-6">
            <h1 className="lg:col-span-8">
              <WordsPullUp
                text="Prisma"
                showAsterisk
                className="text-[26vw] font-medium leading-[0.85] tracking-[-0.07em] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw]"
              />
            </h1>

            <div className="flex flex-col items-start gap-5 lg:col-span-4 lg:pb-5 xl:pb-8">
              <motion.p
                className="max-w-md text-xs leading-[1.2] text-primary/70 sm:text-sm md:text-base"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: EASE_OUT }}
              >
                Prisma is a worldwide network of visual artists, filmmakers and storytellers bound
                not by place, status or labels but by passion and hunger to unlock potential through
                our unique perspectives.
              </motion.p>

              <motion.a
                href="#features"
                className="group inline-flex items-center gap-2 rounded-full bg-primary py-1.5 pl-5 pr-1.5 text-sm font-medium text-black transition-[gap] duration-300 hover:gap-3 sm:text-base"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease: EASE_OUT }}
              >
                <span>Join the lab</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-transform duration-300 group-hover:scale-110 sm:h-10 sm:w-10">
                  <ArrowRight className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
                </span>
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  const bodyText =
    'Over the last seven years, I have worked with Parallax, a Berlin-based production house that crafts cinema, series, and Noir Studio in Paris. Together, we have created work that has earned international acclaim at several major festivals.';
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });
  const letters = Array.from(bodyText);

  return (
    <section id="about" className="bg-black px-4 py-16 sm:px-6 sm:py-24 md:py-32">
      <div className="mx-auto max-w-6xl rounded-[1.75rem] bg-[#101010] px-5 py-14 text-center sm:px-8 sm:py-20 md:px-10 md:py-24">
        <p className="mb-8 text-[10px] uppercase tracking-[0.28em] text-primary sm:text-xs">
          Visual arts
        </p>
        <h2 className="mx-auto max-w-3xl text-3xl font-normal leading-[0.95] text-primary sm:text-4xl sm:leading-[0.9] md:text-5xl lg:text-6xl xl:text-7xl">
          <WordsPullUpMultiStyle
            segments={[
              { text: 'I am Marcus Chen,' },
              { text: 'a self-taught director.', className: 'font-serif italic' },
              {
                text: 'I have skills in color grading, visual effects, and narrative design.',
              },
            ]}
          />
        </h2>

        <p
          ref={ref}
          aria-label={bodyText}
          className="mx-auto mt-10 max-w-2xl text-xs leading-[1.65] text-[#DEDBC8] sm:mt-12 sm:text-sm md:text-base"
        >
          {letters.map((letter, index) => (
            <AnimatedLetter
              key={`${letter}-${index}`}
              letter={letter}
              index={index}
              total={letters.length}
              progress={scrollYProgress}
            />
          ))}
        </p>
      </div>
    </section>
  );
}

function VideoFeatureCard({ index }: { index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      className="relative min-h-[360px] overflow-hidden rounded-2xl bg-[#212121] lg:min-h-0"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.85, delay: index * 0.15, ease: CARD_EASE }}
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={featureVideo}
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/70" />
      <p
        className="absolute bottom-0 left-0 right-0 p-5 text-xl font-normal leading-none sm:p-6 sm:text-2xl"
        style={{ color: PRIMARY_TEXT }}
      >
        Your creative canvas.
      </p>
    </motion.div>
  );
}

function FeatureCard({
  card,
  index,
}: {
  card: (typeof featureCards)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.article
      ref={ref}
      className="flex min-h-[360px] flex-col justify-between rounded-2xl bg-[#212121] p-5 sm:p-6 lg:min-h-0"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.85, delay: index * 0.15, ease: CARD_EASE }}
    >
      <div>
        <img
          src={card.icon}
          alt=""
          className="h-10 w-10 rounded object-cover sm:h-12 sm:w-12"
          loading="lazy"
        />

        <div className="mt-8 flex items-start justify-between gap-4 sm:mt-10">
          <h3 className="text-xl font-normal leading-[1.05] text-primary sm:text-2xl">
            {card.title}
          </h3>
          <span className="text-xs text-gray-500">{card.number}</span>
        </div>

        <ul className="mt-8 space-y-4">
          {card.checks.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-[1.25] text-gray-400">
              <Check className="mt-0.5 h-4 w-4 flex-none text-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <a
        href="#"
        className="group mt-10 inline-flex items-center gap-2 self-start text-sm font-medium text-primary"
      >
        <span>Learn more</span>
        <ArrowRight className="h-4 w-4 -rotate-45 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
      </a>
    </motion.article>
  );
}

function Features() {
  return (
    <section id="features" className="relative min-h-screen overflow-hidden bg-black px-4 py-16 sm:px-6 sm:py-24 md:py-32">
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.15]" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-4xl text-center text-xl font-normal leading-[1.05] sm:mb-16 sm:text-2xl md:text-3xl lg:text-4xl">
          <WordsPullUpMultiStyle
            segments={[
              {
                text: 'Studio-grade workflows for visionary creators.',
                className: 'text-primary',
                breakAfter: true,
              },
              { text: 'Built for pure vision. Powered by art.', className: 'text-gray-500' },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:gap-2 md:grid-cols-2 md:gap-1 lg:h-[480px] lg:grid-cols-4">
          <VideoFeatureCard index={0} />
          {featureCards.map((card, index) => (
            <FeatureCard key={card.title} card={card} index={index + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <main className="bg-black" style={{ color: PRIMARY_TEXT }}>
      <Hero />
      <About />
      <Features />
    </main>
  );
}
