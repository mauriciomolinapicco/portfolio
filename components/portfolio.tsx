'use client';

import { useEffect, useState } from 'react';
import { chooseInitialLocale, persistLocale } from '../lib/locale.mjs';
import { copy, experience, products, services, type Locale, locales } from '../lib/content';
import styles from './portfolio.module.css';

const languageOptions = [
  { value: 'es', flag: '🇦🇷', name: 'Español' },
  { value: 'pt', flag: '🇧🇷', name: 'Português' },
  { value: 'en', flag: '🇬🇧', name: 'English' },
] as const;

export function Portfolio() {
  const [locale, setLocale] = useState<Locale>('es');
  const text = copy[locale];

  useEffect(() => {
    const initial = chooseInitialLocale(navigator.languages?.length ? navigator.languages : [navigator.language]);
    setLocale(initial as Locale);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = `Mauricio Molina — ${{ es: 'Software para tu negocio', pt: 'Software para seu negócio', en: 'Software for your business' }[locale]}`;
  }, [locale]);

  function changeLocale(value: string) {
    if (!locales.includes(value as Locale)) return;
    const selected = value as Locale;
    setLocale(selected);
    persistLocale(selected);
  }

  return <div className={styles.page}>
    <a className={styles.skip} href="#contenido">{text.skip}</a>
    <div className={styles.wrap}>
      <header className={styles.header}>
        <a className={styles.brand} href="#contenido">Mauricio Molina<span>.</span></a>
        <nav className={styles.nav} aria-label={text.locale}>
          <a href="#servicios">{text.navServices}</a><a href="#productos">{text.navProducts}</a><a href="#experiencia">{text.navAbout}</a>
        </nav>
        <label className={styles.language}>
          <span className={styles.srOnly}>{text.locale}</span>
          <select aria-label={text.locale} value={locale} onChange={event => changeLocale(event.target.value)}>
            {languageOptions.map(option => <option key={option.value} value={option.value}>{option.flag} {option.value.toUpperCase()} · {option.name}</option>)}
          </select>
        </label>
      </header>
      <main id="contenido">
        <section className={styles.hero} aria-labelledby="hero-title">
          <p className={styles.eyebrow}>{text.eyebrow}</p>
          <h1 id="hero-title">{text.headline.split('|')[0]}<br /><em>{text.headline.split('|')[1]}</em></h1>
          <div className={styles.heroBottom}>
            <div><p className={styles.intro}>{text.intro}</p><div className={styles.actions}>
              <a className={styles.button} href="#contacto">{text.cta}<span aria-hidden="true">↗</span></a>
              <a className={styles.textLink} href="#productos">{text.explore}</a>
            </div></div><p className={styles.index}>{text.index}</p>
          </div>
        </section>
        <div className={styles.proof}>
          <p className={styles.label}>{text.proof}</p><div className={styles.companies}><span>Delto</span><span>MercadoLibre <small>{text.via}</small></span><span>Rooster Software</span></div>
        </div>
        <section className={styles.content} id="productos" aria-labelledby="products-title">
          <div className={styles.sectionHead}><p className={styles.label}>{text.productsLabel}</p><h2 id="products-title">{text.productsTitle}</h2></div>
          {products.map(product => <article className={styles.product} key={product.name}>
            <div className={styles.productArt} aria-label={product.name} role="img"><strong>{product.name}<span aria-hidden="true">.</span></strong><span>{product.category[locale].toUpperCase()}</span></div>
            <div className={styles.projectCopy}><p className={styles.label}>{text.productType}</p><h3>{product.name}</h3><p>{text[product.descriptionKey]}</p><a className={styles.textLink} href="#contacto">{text.productCta} <span aria-hidden="true">↗</span></a></div>
          </article>)}
          <div className={styles.next}><span>{text.more}</span><span>{text.moreSub}</span></div>
        </section>
        <section className={styles.content} id="servicios" aria-labelledby="services-title">
          <div className={styles.sectionHead}><p className={styles.label}>{text.servicesLabel}</p><h2 id="services-title">{text.servicesTitle}</h2></div>
          <div className={styles.services}>{services.map((number, index) => <article className={styles.service} key={number}>
            <span className={styles.num}>{String(number).padStart(2, '0')}</span><h3>{text[`service${number}`]}</h3><p>{text[`detail${number}`]}</p>
          </article>)}</div>
        </section>
        <section className={styles.content} id="experiencia" aria-labelledby="experience-title">
          <div className={styles.sectionHead}><p className={styles.label}>{text.aboutLabel}</p><h2 id="experience-title">{text.aboutTitle}</h2></div>
          <div className={styles.experienceLayout}><div><div className={styles.bio}><p>{text.bio}</p><p>{text.bio2}</p></div><p className={styles.tech}>Python / FastAPI / Django / React<br />AWS / GCP / Azure / Docker</p></div>
            <div>{experience.map(job => <article className={styles.job} key={job.company}><div><h3>{job.company}</h3><p>{text[job.roleKey]}</p></div><span>{job.period}{job.current && text.present}</span></article>)}<p className={styles.variantNote}>{text.cv}</p></div>
          </div>
        </section>
        <section className={styles.contact} id="contacto" aria-labelledby="contact-title">
          <p className={styles.label}>{text.contactLabel}</p><h2 id="contact-title">{text.contactTitle.split('|')[0]}<em>{text.contactTitle.split('|')[1]}</em></h2>
          <p>{text.contactBody}</p><a className={styles.button} href="tel:+543571690426">{text.contactCta}<span aria-hidden="true">↗</span></a>
          <a className={styles.phone} href="tel:+543571690426">+54 3571 690426</a>
          <div className={styles.socials}><a href="https://github.com/mauriciomolinapicco" target="_blank" rel="noreferrer">GitHub · mauriciomolinapicco</a><a href="https://www.linkedin.com/in/mauricio-molina-picco/" target="_blank" rel="noreferrer">LinkedIn · mauricio-molina-picco</a></div>
        </section>
      </main>
      <footer className={styles.footer}><span>© Mauricio Molina · {text.location}</span><span>{text.footer}</span></footer>
    </div>
  </div>;
}
