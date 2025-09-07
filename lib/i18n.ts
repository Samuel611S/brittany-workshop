export type Language = 'en' | 'es'

export interface Translations {
  // Header
  foundationName: string
  chooseTrack: string
  language: string
  getStarted: string
  back: string
  home: string
  login: string
  logout: string
  signup: string
  
  // Hero Section
  heroTitle: string
  heroDescription: string
  
  // Community Survey
  surveyTitle: string
  surveyDescription: string
  priorityTopics: string
  communityNeeds: string
  partnershipOpportunities: string
  priorityTopicsDesc: string
  communityNeedsDesc: string
  partnershipDesc: string
  takeSurvey: string
  
  // Track Information
  audience: string
  timeCommitment: string
  learningOutcomes: string
  modulesInTrack: string
  start: string
  begin: string
  
  // Help Section
  needHelp: string
  helpDescription: string
  contactEmail: string
  instagram: string
  facebook: string
  
  // Footer
  copyright: string
  educationalWorkshops: string
  protectedMaterial: string
  notLegalAdvice: string
  footerDescription: string
  quickLinks: string
  learningTracks: string
  contactUs: string
  address: string
  allRightsReserved: string
  privacyPolicy: string
  termsOfService: string
  track1: string
  track2: string
  track3: string
  track4: string
  track5: string
  admin: string
  
  // Signup Modal
  joinFoundation: string
  nameRequired: string
  emailRequired: string
  invalidEmail: string
  nameTooLong: string
  consentRequired: string
  cancel: string
  signUp: string
  signingUp: string
  networkError: string
  successMessage: string
  
  // Navigation
  profile: string
  
  // Workshop
  workshop: string
  learningDashboard: string
  yourProgress: string
  startLearning: string
  feedback: string
  submitFeedback: string
  feedbackSubmitted: string
  
  // Feedback
  shareFeedback: string
  feedbackDescription: string
  rating: string
  tellUsExperience: string
  thankYouFeedback: string
  
  // Common
  loading: string
  error: string
  success: string
}

export const translations: Record<Language, Translations> = {
  en: {
    foundationName: 'NextKey Housing Access Foundation',
    chooseTrack: 'Choose Your Learning Track',
    language: 'Language',
    getStarted: 'Get Started',
    back: 'Back',
    home: 'Home',
    login: 'Login',
    logout: 'Logout',
    signup: 'Sign Up',
    profile: 'Profile',
    
    // Workshop
    workshop: 'Workshop',
    learningDashboard: 'Learning Dashboard',
    yourProgress: 'Your Progress',
    startLearning: 'Start Learning',
    feedback: 'Feedback',
    submitFeedback: 'Submit Feedback',
    feedbackSubmitted: 'Feedback Submitted',
    
    // Feedback
    shareFeedback: 'Share Your Feedback',
    feedbackDescription: 'Help us improve our workshops by sharing your experience',
    rating: 'Rating',
    tellUsExperience: 'Tell us about your experience with our workshops...',
    thankYouFeedback: 'Thank you for your feedback! It helps us improve our workshops.',
    
    heroTitle: 'NextKey Housing Access Foundation',
    heroDescription: 'Choose Your Learning Path. NextKey Housing Access Foundation offers specialized workshop tracks designed for different audiences. Select the track that best matches your role and housing goals.',
    
    surveyTitle: 'Help Shape Our Future Content!',
    surveyDescription: 'Your input is crucial for expanding our housing education programs. Take our 8-10 minute community needs survey to help us prioritize new modules and better serve NYC\'s diverse housing needs.',
    priorityTopics: 'Priority Topics Survey',
    communityNeeds: 'Community Needs Assessment',
    partnershipOpportunities: 'Partnership Opportunities',
    priorityTopicsDesc: 'Which housing topics need coverage most?',
    communityNeedsDesc: 'What challenges are you facing?',
    partnershipDesc: 'How can we collaborate?',
    takeSurvey: 'Take Community Survey',
    
    audience: 'Audience',
    timeCommitment: 'Time Commitment',
    learningOutcomes: 'Learning Outcomes',
    modulesInTrack: 'Modules in This Track',
    start: 'Start',
    begin: 'Begin',
    
    needHelp: 'Need Help Choosing?',
    helpDescription: 'Contact NextKey Housing Access Foundation for personalized guidance on which track is right for you.',
    contactEmail: 'nextkeyfoundation@gmail.com',
    instagram: '@nextkeyhousing',
    facebook: 'NextKey Housing Access Foundation',
    
    copyright: '© 2025 NextKey Housing Access Foundation. All rights reserved.',
    educationalWorkshops: 'Educational workshops designed for community empowerment.',
    protectedMaterial: 'This educational material is protected by copyright law. Not legal advice.',
    notLegalAdvice: 'Not legal advice.',
    footerDescription: 'Empowering communities through accessible housing education and support.',
    quickLinks: 'Quick Links',
    learningTracks: 'Learning Tracks',
    contactUs: 'Contact Us',
    address: '123 Housing Ave, City, State 12345',
    allRightsReserved: 'All rights reserved.',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    track1: 'Housing Voucher Basics',
    track2: 'Application Process',
    track3: 'Rights & Responsibilities',
    track4: 'Community Resources',
    track5: 'Success Strategies',
    admin: 'Admin',
    
    joinFoundation: 'Join NextKey Housing Access Foundation',
    nameRequired: 'Name is required',
    emailRequired: 'Email is required',
    invalidEmail: 'Invalid email address',
    nameTooLong: 'Name too long',
    consentRequired: 'You must agree to the terms',
    cancel: 'Cancel',
    signUp: 'Sign Up',
    signingUp: 'Signing up...',
    networkError: 'Network error. Please try again.',
    successMessage: 'Successfully signed up! Check your email for access link.',
    
    loading: 'Loading...',
    error: 'Error',
    success: 'Success'
  },
  es: {
    foundationName: 'Fundación NextKey de Acceso a Vivienda',
    chooseTrack: 'Elige Tu Ruta de Aprendizaje',
    language: 'Idioma',
    getStarted: 'Comenzar',
    back: 'Atrás',
    home: 'Inicio',
    login: 'Iniciar Sesión',
    logout: 'Cerrar Sesión',
    signup: 'Registrarse',
    profile: 'Perfil',
    
    // Workshop
    workshop: 'Taller',
    learningDashboard: 'Panel de Aprendizaje',
    yourProgress: 'Tu Progreso',
    startLearning: 'Comenzar Aprendizaje',
    feedback: 'Comentarios',
    submitFeedback: 'Enviar Comentarios',
    feedbackSubmitted: 'Comentarios Enviados',
    
    // Feedback
    shareFeedback: 'Comparte Tus Comentarios',
    feedbackDescription: 'Ayúdanos a mejorar nuestros talleres compartiendo tu experiencia',
    rating: 'Calificación',
    tellUsExperience: 'Cuéntanos sobre tu experiencia con nuestros talleres...',
    thankYouFeedback: '¡Gracias por tus comentarios! Nos ayudan a mejorar nuestros talleres.',
    
    heroTitle: 'Fundación NextKey de Acceso a Vivienda',
    heroDescription: 'Elige Tu Ruta de Aprendizaje. La Fundación NextKey de Acceso a Vivienda ofrece rutas de talleres especializados diseñados para diferentes audiencias. Selecciona la ruta que mejor coincida con tu rol y objetivos de vivienda.',
    
    surveyTitle: '¡Ayuda a Dar Forma a Nuestro Contenido Futuro!',
    surveyDescription: 'Tu aporte es crucial para expandir nuestros programas de educación en vivienda. Toma nuestra encuesta de necesidades comunitarias de 8-10 minutos para ayudarnos a priorizar nuevos módulos y servir mejor a las diversas necesidades de vivienda de NYC.',
    priorityTopics: 'Encuesta de Temas Prioritarios',
    communityNeeds: 'Evaluación de Necesidades Comunitarias',
    partnershipOpportunities: 'Oportunidades de Colaboración',
    priorityTopicsDesc: '¿Qué temas de vivienda necesitan más cobertura?',
    communityNeedsDesc: '¿Qué desafíos estás enfrentando?',
    partnershipDesc: '¿Cómo podemos colaborar?',
    takeSurvey: 'Tomar Encuesta Comunitaria',
    
    audience: 'Audiencia',
    timeCommitment: 'Compromiso de Tiempo',
    learningOutcomes: 'Resultados de Aprendizaje',
    modulesInTrack: 'Módulos en Esta Ruta',
    start: 'Comenzar',
    begin: 'Iniciar',
    
    needHelp: '¿Necesitas Ayuda para Elegir?',
    helpDescription: 'Contacta a la Fundación NextKey de Acceso a Vivienda para orientación personalizada sobre qué ruta es la adecuada para ti.',
    contactEmail: 'nextkeyfoundation@gmail.com',
    instagram: '@nextkeyhousing',
    facebook: 'Fundación NextKey de Acceso a Vivienda',
    
    copyright: '© 2025 Fundación NextKey de Acceso a Vivienda. Todos los derechos reservados.',
    educationalWorkshops: 'Talleres educativos diseñados para el empoderamiento comunitario.',
    protectedMaterial: 'Este material educativo está protegido por derechos de autor. No es asesoría legal.',
    notLegalAdvice: 'No es asesoría legal.',
    footerDescription: 'Empoderando comunidades a través de educación y apoyo accesible en vivienda.',
    quickLinks: 'Enlaces Rápidos',
    learningTracks: 'Rutas de Aprendizaje',
    contactUs: 'Contáctanos',
    address: '123 Avenida de Vivienda, Ciudad, Estado 12345',
    allRightsReserved: 'Todos los derechos reservados.',
    privacyPolicy: 'Política de Privacidad',
    termsOfService: 'Términos de Servicio',
    track1: 'Conceptos Básicos de Vales de Vivienda',
    track2: 'Proceso de Solicitud',
    track3: 'Derechos y Responsabilidades',
    track4: 'Recursos Comunitarios',
    track5: 'Estrategias de Éxito',
    admin: 'Administrador',
    
    joinFoundation: 'Únete a la Fundación NextKey de Acceso a Vivienda',
    nameRequired: 'El nombre es requerido',
    emailRequired: 'El correo electrónico es requerido',
    invalidEmail: 'Dirección de correo electrónico inválida',
    nameTooLong: 'Nombre muy largo',
    consentRequired: 'Debes aceptar los términos',
    cancel: 'Cancelar',
    signUp: 'Registrarse',
    signingUp: 'Registrando...',
    networkError: 'Error de red. Por favor intenta de nuevo.',
    successMessage: '¡Registro exitoso! Revisa tu correo para el enlace de acceso.',
    
    loading: 'Cargando...',
    error: 'Error',
    success: 'Éxito'
  }
}

export function getTranslations(language: Language): Translations {
  return translations[language] || translations.en
}
