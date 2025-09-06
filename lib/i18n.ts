export type Language = 'en' | 'es'

export interface Translations {
  // Header
  foundationName: string
  chooseTrack: string
  language: string
  getStarted: string
  
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
