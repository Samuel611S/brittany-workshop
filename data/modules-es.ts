import { Module, LearningTrack } from './modules'

export const learningTracksEs: LearningTrack[] = [
  {
    id: 'tenant-voucher-holder',
    name: 'Ruta de Inquilinos y Titulares de Vales',
    description: 'Desmitificar los complejos programas de vivienda de NYC para que las personas puedan usarlos realmente',
    audience: 'Familias e individuos navegando programas de vivienda de NYC',
    timeCommitment: '4 módulos • ~6 horas total',
    learningOutcomes: [
      'Conoce tus derechos',
      'Usa los vales efectivamente',
      'Encuentra vivienda más rápido',
      'Mantén estabilidad en la vivienda'
    ],
    color: 'blue',
    modules: [
      {
        slug: 'housing-rights-nyc',
        title: 'Tus Derechos de Vivienda en NYC',
        summary: 'Leyes de Vivienda Justa, Ley de Derechos Humanos de NYC, cómo responder a "no aceptamos vales"',
        track: 'tenant-voucher-holder',
        order: 1,
        duration: '90 minutos',
        outcomes: ['Entender protecciones de vivienda justa', 'Saber cómo responder a discriminación', 'Aprender sobre la Ley de Derechos Humanos de NYC']
      },
      {
        slug: 'understanding-nyc-vouchers',
        title: 'Entendiendo los Vales de NYC',
        summary: 'CityFHEPS, Sección 8, FHEPS, HASA — elegibilidad, cobertura y aplicaciones',
        track: 'tenant-voucher-holder',
        order: 2,
        duration: '90 minutos',
        outcomes: ['Identificar qué programa de vales se ajusta a tu situación', 'Entender requisitos de elegibilidad', 'Navegar procesos de aplicación']
      },
      {
        slug: 'finding-applying-apartment',
        title: 'Encontrar y Aplicar para un Apartamento',
        summary: 'Papeles requeridos, consejos del mercado competitivo, estrategias de aplicación',
        track: 'tenant-voucher-holder',
        order: 3,
        duration: '90 minutos',
        outcomes: ['Organizar documentos requeridos', 'Desarrollar estrategias de búsqueda efectivas', 'Dominar procesos de aplicación']
      },
      {
        slug: 'staying-in-home',
        title: 'Permanecer en Tu Hogar',
        summary: 'Recertificación, Derecho a Consejo, presupuesto cuando pagas renta parcial',
        track: 'tenant-voucher-holder',
        order: 4,
        duration: '90 minutos',
        outcomes: ['Mantener estabilidad en la vivienda', 'Navegar recertificación', 'Acceder a recursos legales']
      }
    ]
  },
  {
    id: 'landlord-property-manager',
    name: 'Ruta de Propietarios y Administradores',
    description: 'Reducir el estigma alrededor de inquilinos con vales mostrando beneficios comerciales y hoja de ruta de cumplimiento',
    audience: 'Propietarios, administradores de propiedades y proveedores de vivienda',
    timeCommitment: '4 módulos • ~5 horas total',
    learningOutcomes: [
      'Reducir tasas de vacantes',
      'Aumentar ingresos por alquiler',
      'Asegurar cumplimiento',
      'Mejores relaciones con inquilinos'
    ],
    color: 'green',
    modules: [
      {
        slug: 'why-rent-voucher-holders',
        title: '¿Por Qué Rentar a Titulares de Vales?',
        summary: 'Renta garantizada, programas de bonificación para propietarios, aumentos de renta vinculados a estándares HUD/HPD',
        track: 'landlord-property-manager',
        order: 1,
        duration: '75 minutos',
        outcomes: ['Entender beneficios financieros', 'Aprender sobre programas de bonificación', 'Calcular ingresos garantizados']
      },
      {
        slug: 'nyc-lease-up-process',
        title: 'El Proceso de Arrendamiento de NYC',
        summary: 'Aceptación hasta mudanza, navegando inspecciones de HRA y HPD',
        track: 'landlord-property-manager',
        order: 2,
        duration: '75 minutos',
        outcomes: ['Dominar flujo de trabajo de arrendamiento', 'Navegar procesos de inspección', 'Evitar retrasos comunes']
      },
      {
        slug: 'working-case-managers',
        title: 'Trabajando con Administradores de Casos y Agencias',
        summary: 'Comunicación fluida, a quién llamar cuando surgen problemas',
        track: 'landlord-property-manager',
        order: 3,
        duration: '75 minutos',
        outcomes: ['Construir asociaciones efectivas', 'Resolver problemas rápidamente', 'Mantener relaciones positivas']
      },
      {
        slug: 'keeping-properties-compliant',
        title: 'Mantener Propiedades en Cumplimiento',
        summary: 'Inspecciones HPD, Estándares de Calidad de Vivienda, evitar violaciones',
        track: 'landlord-property-manager',
        order: 4,
        duration: '75 minutos',
        outcomes: ['Mantener estándares HQS', 'Pasar inspecciones consistentemente', 'Evitar violaciones y multas']
      }
    ]
  },
  {
    id: 'housing-secrets',
    name: 'Ruta de Secretos de Vivienda',
    description: 'Dar a familias y propietarios el "conocimiento interno" que no está escrito en los sitios web de la ciudad',
    audience: 'Buscadores de vivienda y propietarios que quieren conocimiento interno',
    timeCommitment: '4 módulos • ~5 horas total',
    learningOutcomes: [
      'Aprobaciones más rápidas',
      'Acceder a programas ocultos',
      'Construir redes',
      'Maximizar beneficios'
    ],
    color: 'purple',
    modules: [
      {
        slug: 'fast-tracking-application',
        title: 'Acelerar Tu Aplicación',
        summary: 'Organizar documentos para que HRA/HPD no los rechace, evitar retrasos',
        track: 'housing-secrets',
        order: 1,
        duration: '75 minutos',
        outcomes: ['Organizar documentos efectivamente', 'Evitar razones comunes de rechazo', 'Acelerar proceso de aprobación']
      },
      {
        slug: 'landlord-incentives-programs',
        title: 'Incentivos y Programas para Propietarios',
        summary: 'Pagos de bonificación por arrendamientos CityFHEPS, programas de reparación y beneficios fiscales',
        track: 'housing-secrets',
        order: 2,
        duration: '75 minutos',
        outcomes: ['Acceder a programas de pago de bonificación', 'Utilizar asistencia de reparación', 'Maximizar beneficios fiscales']
      },
      {
        slug: 'finding-open-doors',
        title: 'Encontrar Puertas Abiertas',
        summary: 'Identificar corredores, agentes, propietarios amigables con vales, consejos de networking',
        track: 'housing-secrets',
        order: 3,
        duration: '75 minutos',
        outcomes: ['Construir redes profesionales', 'Identificar socios amigables con vales', 'Acceder a oportunidades internas']
      },
      {
        slug: 'beyond-vouchers',
        title: 'Más Allá de los Vales',
        summary: 'One-Shot Deals, asistencia de servicios públicos, subvenciones de mudanza, apoyo de comida y cuidado infantil',
        track: 'housing-secrets',
        order: 4,
        duration: '75 minutos',
        outcomes: ['Acceder a programas de apoyo adicionales', 'Maximizar beneficios disponibles', 'Construir red de apoyo integral']
      }
    ]
  },
  {
    id: 'advocate-community',
    name: 'Ruta de Defensores y Comunidad',
    description: 'Equipar a trabajadores sociales, personal de refugios y líderes comunitarios con herramientas para luchar contra barreras sistémicas',
    audience: 'Trabajadores sociales, personal de refugios, líderes comunitarios y defensores de base',
    timeCommitment: '4 módulos • ~6 horas total',
    learningOutcomes: [
      'Defensa efectiva',
      'Navegación del sistema',
      'Organización comunitaria',
      'Influencia en políticas'
    ],
    color: 'orange',
    modules: [
      {
        slug: 'nyc-housing-systems-101',
        title: 'Sistemas de Vivienda de NYC 101',
        summary: 'Cómo se conectan DSS, HRA, HPD y NYCHA, por qué ocurren retrasos, cómo resistir',
        track: 'advocate-community',
        order: 1,
        duration: '90 minutos',
        outcomes: ['Entender conexiones del sistema', 'Identificar causas de retrasos', 'Desarrollar estrategias de resistencia']
      },
      {
        slug: 'advocacy-skills-families',
        title: 'Habilidades de Defensa para Familias',
        summary: 'Ayudar a clientes a escribir apelaciones, contactar concejales, escalar casos efectivamente',
        track: 'advocate-community',
        order: 2,
        duration: '90 minutos',
        outcomes: ['Dominar procesos de apelación', 'Construir habilidades de comunicación efectivas', 'Escalar casos estratégicamente']
      },
      {
        slug: 'building-community-power',
        title: 'Construyendo Poder Comunitario',
        summary: 'Asociaciones de manzana, iglesias, organizaciones sin fines de lucro apoyando buscadores de vivienda, organización de inquilinos',
        track: 'advocate-community',
        order: 3,
        duration: '90 minutos',
        outcomes: ['Construir redes comunitarias', 'Organizar grupos de inquilinos', 'Aprovechar apoyo institucional']
      },
      {
        slug: 'policy-change-nyc-housing',
        title: 'Política y Cambio en Vivienda de NYC',
        summary: 'Reformas actuales, expansión de CityFHEPS, Derecho a Consejo, influencia comunitaria',
        track: 'advocate-community',
        order: 4,
        duration: '90 minutos',
        outcomes: ['Entender panorama político actual', 'Influir en desarrollo de políticas', 'Impulsar cambio sistémico']
      }
    ]
  },
  {
    id: 'real-estate-professional',
    name: 'Ruta de Profesional Inmobiliario (NYC)',
    description: 'Entrenamiento profesional completo para agentes, corredores, PMs y propietarios. Domina programas de vales de NYC para ventaja competitiva.',
    audience: 'Agentes inmobiliarios, corredores, administradores de propiedades, propietarios y profesionales de vivienda',
    timeCommitment: '8 módulos • ~12 horas total + certificación',
    learningOutcomes: [
      'Arrendamientos más rápidos con vales',
      'Cumplimiento completo de vivienda justa',
      'Menos inspecciones fallidas',
      'Pagos más fluidos'
    ],
    color: 'red',
    modules: [
      {
        slug: 'nyc-voucher-specialist-certification',
        title: 'Certificación de Especialista en Programas de Vales de NYC',
        summary: '8 módulos integrales cubriendo cumplimiento, flujos de trabajo y manejo de crisis',
        track: 'real-estate-professional',
        order: 1,
        duration: '12 horas',
        outcomes: ['Lograr certificación profesional', 'Dominar todos los programas de vales', 'Construir ventaja competitiva']
      }
    ]
  }
]

export const modulesEs: Module[] = learningTracksEs.flatMap(track => track.modules)
export const tracksEs = learningTracksEs
