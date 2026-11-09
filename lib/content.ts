export const locales = ['es', 'pt', 'en'] as const;
export type Locale = (typeof locales)[number];

type Copy = Record<string, string>;

export const copy: Record<Locale, Copy> = {
  es: {
    skip: 'Ir al contenido', navServices: 'Servicios', navProducts: 'Productos', navAbout: 'Experiencia', locale: 'Idioma',
    eyebrow: 'Mauricio Molina · Software engineer', headline: 'Tu próximo paso,|con buen software.',
    intro: 'Ayudo a dueños de negocios a convertir ideas y procesos en software útil. Desarrollo productos, integro sistemas y colaboro con equipos que necesitan experiencia técnica.',
    cta: 'Hablemos de tu negocio', explore: 'Explorar mi trabajo', index: 'ESTRATEGIA / DESARROLLO / PRODUCTO',
    proof: 'Experiencia en equipos de', via: 'vía Globant', productsLabel: '02 / Productos y colaboraciones',
    productsTitle: 'No solo desarrollo. También construyo.', productType: 'Producto en colaboración', productBody: 'Un software para gimnasios que gestiono junto a un socio. Un proyecto donde también estoy del lado de construir y sostener un producto.',
    productCta: 'Conversar sobre Lymbo', more: 'Este espacio va a seguir creciendo.', moreSub: 'Más productos y colaboraciones, a medida que pueda compartirlos.',
    servicesLabel: '01 / Lo que puedo hacer', servicesTitle: 'Tecnología al servicio de tu negocio.',
    service1: 'De la idea al producto', detail1: 'Diseño y desarrollo aplicaciones web para transformar una necesidad de tu negocio en una herramienta concreta.',
    service2: 'Menos tareas, más tiempo', detail2: 'Conecto tus sistemas e integro automatizaciones e inteligencia artificial para simplificar procesos.',
    service3: 'Experiencia para tu equipo', detail3: 'Me sumo a equipos de ingeniería para trabajar en backend, arquitectura e integraciones complejas.',
    aboutLabel: '03 / Quién está detrás', aboutTitle: 'Soy Mauricio. Ingeniero, constructor y colaborador.',
    bio: 'Trabajo en software desde 2022, con experiencia en productos financieros, aplicaciones web e integraciones. Me interesa entender el problema antes de proponer una solución.',
    bio2: 'Hoy trabajo en Delto. Antes formé parte de Globant, en proyectos para MercadoLibre, y de Rooster Software. También construyo productos propios y en colaboración.',
    roleDelto: 'Software Engineer · banca conversacional', roleGlobant: 'Software Engineer SSr Adv · MercadoLibre',
    roleRooster: 'Full Stack Developer', roleFreelance: 'Full Stack Developer · independiente', present: 'actualidad',
    contactLabel: '04 / Empecemos una conversación', contactTitle: '¿Qué necesita tu negocio |ahora?',
    contactBody: 'Contame qué querés construir o qué te está haciendo perder tiempo. También podemos conversar sobre una oportunidad en tu equipo.',
    contactCta: 'Llamame y conversemos', location: 'Córdoba, Argentina · Trabajo remoto', footer: 'Software con criterio. Productos con propósito.',
    cv: 'Trayectoria basada en mi CV.',
  },
  pt: {
    skip: 'Ir para o conteúdo', navServices: 'Serviços', navProducts: 'Produtos', navAbout: 'Experiência', locale: 'Idioma',
    eyebrow: 'Mauricio Molina · Software engineer', headline: 'Seu próximo passo,|com um bom software.',
    intro: 'Ajudo donos de negócios a transformar ideias e processos em software útil. Desenvolvo produtos, conecto sistemas e colaboro com equipes que precisam de experiência técnica.',
    cta: 'Vamos falar sobre seu negócio', explore: 'Conheça meu trabalho', index: 'ESTRATÉGIA / DESENVOLVIMENTO / PRODUTO',
    proof: 'Experiência em equipes de', via: 'via Globant', productsLabel: '02 / Produtos e colaborações',
    productsTitle: 'Além de desenvolver, também construo.', productType: 'Produto em colaboração', productBody: 'Um software para academias que gerencio com um sócio. Um projeto em que também participo da construção e da continuidade de um produto.',
    productCta: 'Conversar sobre o Lymbo', more: 'Este espaço vai continuar crescendo.', moreSub: 'Mais produtos e colaborações, à medida que puder compartilhá-los.',
    servicesLabel: '01 / Como posso ajudar', servicesTitle: 'Tecnologia a serviço do seu negócio.',
    service1: 'Da ideia ao produto', detail1: 'Projeto e desenvolvo aplicações web para transformar uma necessidade do seu negócio em uma ferramenta prática.',
    service2: 'Menos tarefas, mais tempo', detail2: 'Conecto seus sistemas e integro automações e inteligência artificial para simplificar processos.',
    service3: 'Experiência para sua equipe', detail3: 'Colaboro com equipes de engenharia em backend, arquitetura e integrações complexas.',
    aboutLabel: '03 / Quem está por trás', aboutTitle: 'Sou Mauricio. Engenheiro, criador e colaborador.',
    bio: 'Trabalho com software desde 2022, com experiência em produtos financeiros, aplicações web e integrações. Procuro entender o problema antes de propor uma solução.',
    bio2: 'Hoje trabalho na Delto. Antes, fiz parte da Globant, em projetos para o MercadoLibre, e da Rooster Software. Também construo produtos próprios e em colaboração.',
    roleDelto: 'Software Engineer · serviços bancários conversacionais', roleGlobant: 'Software Engineer SSr Adv · MercadoLibre',
    roleRooster: 'Full Stack Developer', roleFreelance: 'Full Stack Developer · autônomo', present: 'atualmente',
    contactLabel: '04 / Vamos conversar', contactTitle: 'Do que seu negócio precisa |agora?',
    contactBody: 'Conte o que você quer construir ou o que está tomando seu tempo. Também podemos conversar sobre uma oportunidade na sua equipe.',
    contactCta: 'Vamos conversar por telefone', location: 'Córdoba, Argentina · Trabalho remoto', footer: 'Software com critério. Produtos com propósito.',
    cv: 'Trajetória baseada no meu currículo.',
  },
  en: {
    skip: 'Skip to content', navServices: 'Services', navProducts: 'Products', navAbout: 'Experience', locale: 'Language',
    eyebrow: 'Mauricio Molina · Software engineer', headline: 'Your next step,|with better software.',
    intro: 'I help business owners turn ideas and processes into useful software. I build products, connect systems and work with teams that need engineering experience.',
    cta: "Let's talk about your business", explore: 'Explore my work', index: 'STRATEGY / ENGINEERING / PRODUCT',
    proof: 'Experience with teams at', via: 'via Globant', productsLabel: '02 / Products & collaborations',
    productsTitle: 'More than development. I build products, too.', productType: 'Collaborative product', productBody: 'Gym software that I manage with a business partner. A project where I also take on the work of building and sustaining a product.',
    productCta: "Let's talk about Lymbo", more: 'Room for what comes next.', moreSub: 'More products and collaborations as I can share them.',
    servicesLabel: '01 / How I can help', servicesTitle: 'Technology that works for your business.',
    service1: 'From idea to product', detail1: 'I design and build web applications that turn a business need into a practical tool.',
    service2: 'Fewer tasks, more time', detail2: 'I connect your systems and integrate automation and AI to simplify processes.',
    service3: 'Experience for your team', detail3: 'I work with engineering teams on backend development, architecture and complex integrations.',
    aboutLabel: '03 / The person behind the work', aboutTitle: "I'm Mauricio. Engineer, builder and collaborator.",
    bio: "I've worked in software since 2022, with experience in financial products, web applications and integrations. I focus on understanding the problem before proposing a solution.",
    bio2: 'I currently work at Delto. Previously, I worked at Globant on projects for MercadoLibre, and at Rooster Software. I also build products independently and with partners.',
    roleDelto: 'Software Engineer · conversational banking', roleGlobant: 'Software Engineer SSr Adv · MercadoLibre',
    roleRooster: 'Full Stack Developer', roleFreelance: 'Full Stack Developer · freelance', present: 'present',
    contactLabel: '04 / Start a conversation', contactTitle: 'What does your business need |next?',
    contactBody: "Tell me what you want to build or what's taking up your time. I'm also open to discussing an opportunity on your team.",
    contactCta: "Let's talk on the phone", location: 'Córdoba, Argentina · Remote', footer: 'Thoughtful software. Purposeful products.',
    cv: 'Experience based on my CV.',
  },
};

export const products = [{
  name: 'Lymbo', category: { es: 'Software para gimnasios', pt: 'Software para academias', en: 'Software for gyms' },
  descriptionKey: 'productBody',
}];

export const services = [1, 2, 3];

export const experience = [
  { company: 'Delto', roleKey: 'roleDelto', period: '2026 — ', current: true },
  { company: 'Globant', roleKey: 'roleGlobant', period: '2025 — 2026' },
  { company: 'Rooster Software', roleKey: 'roleRooster', period: '2024 — 2025' },
  { company: 'Freelance', roleKey: 'roleFreelance', period: '2022 — 2024' },
];
