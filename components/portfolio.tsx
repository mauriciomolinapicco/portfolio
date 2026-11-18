'use client';

import { Fragment, useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react';
import { chooseInitialLocale, persistLocale } from '../lib/locale.mjs';
import { splitWords, revealDelay } from '../lib/motion.mjs';
import { copy, experience, products, services, type Locale, locales } from '../lib/content';
import styles from './portfolio.module.css';

const languageOptions = [
  { value: 'es', flag: '🇦🇷', name: 'Español' },
  { value: 'pt', flag: '🇧🇷', name: 'Português' },
  { value: 'en', flag: '🇬🇧', name: 'English' },
] as const;

const companies = ['Delto', 'MercadoLibre', 'Rooster Software'];

/** Word-by-word animated text; the full sentence stays readable for assistive technology. */
function SplitText({ text, start = 0 }: { text: string; start?: number }) {
  return <>
    <span className={styles.srOnly}>{text}</span>
    <span aria-hidden="true" className={styles.split}>{splitWords(text, start).map(({ word, index }) => <Fragment key={index}>
      <span className={styles.w}><span style={{ '--i': index } as CSSProperties}>{word}</span></span>{' '}
    </Fragment>)}</span>
  </>;
}

/** Two-part title separated by "|": the second part is highlighted and keeps the word stagger going. */
function SplitTitle({ title }: { title: string }) {
  const [first, second = ''] = title.split('|');
  return <><SplitText text={first} /><em><SplitText text={second} start={splitWords(first).length} /></em></>;
}

function Roll({ label }: { label: string }) {
  return <span className={styles.roll}><span>{label}</span></span>;
}

const delay = (index: number) => ({ '--d': revealDelay(index) }) as CSSProperties;

export function Portfolio() {
  const [locale, setLocale] = useState<Locale>('es');
  const [motionReady, setMotionReady] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);
  const text = copy[locale];
  const cycleWords = text.index.split(' / ');

  useEffect(() => {
    const initial = chooseInitialLocale(navigator.languages?.length ? navigator.languages : [navigator.language]);
    setLocale(initial as Locale);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = `Mauricio Molina — ${{ es: 'Software para tu negocio', pt: 'Software para seu negócio', en: 'Software for your business' }[locale]}`;
  }, [locale]);

  // Scroll reveals: content is visible by default and only hidden once the observer is running.
  useEffect(() => {
    const page = pageRef.current;
    if (!page || !('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        (entry.target as HTMLElement).dataset.in = '';
        observer.unobserve(entry.target);
      }
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
    page.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element));
    setMotionReady(true);
    return () => observer.disconnect();
  }, []);

  function changeLocale(value: string) {
    if (!locales.includes(value as Locale)) return;
    const selected = value as Locale;
    setLocale(selected);
    persistLocale(selected);
  }

  function moveSpotlight(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== 'mouse') return;
    const box = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--mx', `${event.clientX - box.left}px`);
    event.currentTarget.style.setProperty('--my', `${event.clientY - box.top}px`);
  }

  return <div ref={pageRef} className={`${styles.page}${motionReady ? ` ${styles.motionReady}` : ''}`}>
    <div className={styles.progress} aria-hidden="true" />
    <a className={styles.skip} href="#contenido">{text.skip}</a>
    <div className={styles.wrap}>
      <header className={styles.header}>
        <a className={styles.brand} href="#contenido">Mauricio Molina<span>.</span></a>
        <nav className={styles.nav} aria-label={text.locale}>
          <a href="#servicios"><Roll label={text.navServices} /></a><a href="#productos"><Roll label={text.navProducts} /></a><a href="#experiencia"><Roll label={text.navAbout} /></a>
        </nav>
        <label className={styles.language}>
          <span className={styles.srOnly}>{text.locale}</span>
          <select aria-label={text.locale} value={locale} onChange={event => changeLocale(event.target.value)}>
            {languageOptions.map(option => <option key={option.value} value={option.value}>{option.flag} {option.value.toUpperCase()} · {option.name}</option>)}
          </select>
        </label>
      </header>
      <main id="contenido">
        <section className={styles.hero} aria-labelledby="hero-title" onPointerMove={moveSpotlight}>
          <div className={styles.spotlight} aria-hidden="true" />
          <p className={styles.eyebrow}>{text.eyebrow}</p>
          <h1 id="hero-title" key={locale}><SplitTitle title={text.headline} /></h1>
          <div className={styles.heroBottom} key={`bottom-${locale}`}>
            <div><p className={styles.intro}>{text.intro}</p><div className={styles.actions}>
              <a className={styles.button} href="#contacto">{text.cta}<span aria-hidden="true">↗</span></a>
              <a className={styles.textLink} href="#productos">{text.explore}</a>
            </div></div>
            <p className={styles.index}>
              <span className={styles.srOnly}>{text.index}</span>
              <span aria-hidden="true" className={styles.cycler}><span className={styles.cycleList}>{[...cycleWords, cycleWords[0]].map((word, index) => <span key={index}>{word}</span>)}</span></span>
            </p>
          </div>
        </section>
        <div className={styles.proof}>
          <p className={styles.label}>{text.proof}</p>
          <p className={styles.srOnly}>Delto, MercadoLibre ({text.via}), Rooster Software</p>
          <div className={styles.marquee}>
            <div className={styles.marqueeTrack} aria-hidden="true">{[0, 1].map(copyIndex => <div className={styles.companies} key={copyIndex}>
              {companies.map(company => <span key={company}>{company}{company === 'MercadoLibre' && <small> {text.via}</small>}<i>✦</i></span>)}
              {companies.map(company => <span key={`${company}-again`}>{company}{company === 'MercadoLibre' && <small> {text.via}</small>}<i>✦</i></span>)}
            </div>)}</div>
          </div>
        </div>
        <section className={styles.content} id="productos" aria-labelledby="products-title">
          <div className={styles.sectionHead} data-reveal=""><p className={styles.label}>{text.productsLabel}</p><h2 id="products-title" key={locale}><SplitText text={text.productsTitle} /></h2></div>
          {products.map(product => <article className={styles.product} key={product.name} data-reveal="wipe">
            <div className={styles.productArt} aria-label={product.name} role="img">
              <svg className={styles.badge} viewBox="0 0 100 100" aria-hidden="true">
                <defs><path id={`badge-${product.name}`} d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" /></defs>
                <text textLength="236" lengthAdjust="spacing"><textPath href={`#badge-${product.name}`}>{`${product.name} · ${product.category[locale]} · `.toUpperCase()}</textPath></text>
              </svg>
              <strong>{product.name}<span aria-hidden="true">.</span></strong><span>{product.category[locale].toUpperCase()}</span>
            </div>
            <div className={styles.projectCopy}><p className={styles.label}>{text.productType}</p><h3>{product.name}</h3><p>{text[product.descriptionKey]}</p><a className={styles.textLink} href="#contacto">{text.productCta} <span aria-hidden="true">↗</span></a></div>
          </article>)}
          <div className={styles.next} data-reveal=""><span>{text.more}</span><span>{text.moreSub}</span></div>
        </section>
        <section className={styles.content} id="servicios" aria-labelledby="services-title">
          <div className={styles.sectionHead} data-reveal=""><p className={styles.label}>{text.servicesLabel}</p><h2 id="services-title" key={locale}><SplitText text={text.servicesTitle} /></h2></div>
          <div className={styles.services}>{services.map((number, index) => <article className={styles.service} key={number} data-reveal="" style={delay(index)}>
            <span className={styles.num}>{String(number).padStart(2, '0')}</span><h3>{text[`service${number}`]}</h3><p>{text[`detail${number}`]}</p>
          </article>)}</div>
        </section>
        <section className={styles.content} id="experiencia" aria-labelledby="experience-title">
          <div className={styles.sectionHead} data-reveal=""><p className={styles.label}>{text.aboutLabel}</p><h2 id="experience-title" key={locale}><SplitText text={text.aboutTitle} /></h2></div>
          <div className={styles.experienceLayout}><div data-reveal=""><div className={styles.bio}><p>{text.bio}</p><p>{text.bio2}</p></div><p className={styles.tech}>Python / FastAPI / Django / React<br />AWS / GCP / Azure / Docker</p></div>
            <div className={styles.jobs}>{experience.map((job, index) => <article className={styles.job} key={job.company} data-reveal="" style={delay(index + 1)}><div><h3>{job.company}</h3><p>{text[job.roleKey]}</p></div><span>{job.period}{job.current && text.present}</span></article>)}<p className={styles.variantNote}>{text.cv}</p></div>
          </div>
        </section>
        <section className={styles.contact} id="contacto" aria-labelledby="contact-title">
          <p className={styles.label}>{text.contactLabel}</p><div data-reveal=""><h2 id="contact-title" key={locale}><SplitTitle title={text.contactTitle} /></h2></div>
          <div className={styles.contactBody} data-reveal="" style={delay(3)}>
            <p>{text.contactBody}</p><a className={styles.button} href="tel:+543571690426">{text.contactCta}<span aria-hidden="true">↗</span></a>
            <a className={styles.phone} href="tel:+543571690426">+54 3571 690426</a>
            <div className={styles.socials}><a href="https://github.com/mauriciomolinapicco" target="_blank" rel="noreferrer">GitHub · mauriciomolinapicco</a><a href="https://www.linkedin.com/in/mauricio-molina-picco/" target="_blank" rel="noreferrer">LinkedIn · mauricio-molina-picco</a></div>
          </div>
        </section>
      </main>
      <p className={styles.signature} aria-hidden="true">Mauricio Molina</p>
      <footer className={styles.footer}><span>© Mauricio Molina · {text.location}</span><span>{text.footer}</span></footer>
    </div>
  </div>;
}
