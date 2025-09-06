export interface Module {
  slug: string
  title: string
  summary: string
  track: string
  order: number
  duration?: string
  outcomes?: string[]
}

export interface LearningTrack {
  id: string
  name: string
  description: string
  audience: string
  timeCommitment: string
  learningOutcomes: string[]
  modules: Module[]
  color: string
}

export const learningTracks: LearningTrack[] = [
  {
    id: 'tenant-voucher-holder',
    name: 'Tenant & Voucher Holder Track',
    description: 'Demystify NYC\'s complex housing programs so people can actually use them',
    audience: 'Families & individuals navigating NYC housing programs',
    timeCommitment: '4 modules • ~6 hours total',
    learningOutcomes: [
      'Know your rights',
      'Use vouchers effectively', 
      'Find housing faster',
      'Maintain housing stability'
    ],
    color: 'blue',
    modules: [
      {
        slug: 'housing-rights-nyc',
        title: 'Your Housing Rights in NYC',
        summary: 'Fair Housing laws, NYC Human Rights Law, how to respond to \'no vouchers\'',
        track: 'tenant-voucher-holder',
        order: 1,
        duration: '90 minutes',
        outcomes: ['Understand fair housing protections', 'Know how to respond to discrimination', 'Learn about NYC Human Rights Law']
      },
      {
        slug: 'understanding-nyc-vouchers',
        title: 'Understanding NYC Vouchers',
        summary: 'CityFHEPS, Section 8, FHEPS, HASA — eligibility, coverage, and applications',
        track: 'tenant-voucher-holder',
        order: 2,
        duration: '90 minutes',
        outcomes: ['Identify which voucher program fits your situation', 'Understand eligibility requirements', 'Navigate application processes']
      },
      {
        slug: 'finding-applying-apartment',
        title: 'Finding & Applying for an Apartment',
        summary: 'Required paperwork, competitive market tips, application strategies',
        track: 'tenant-voucher-holder',
        order: 3,
        duration: '90 minutes',
        outcomes: ['Organize required documents', 'Develop effective search strategies', 'Master application processes']
      },
      {
        slug: 'staying-in-home',
        title: 'Staying in Your Home',
        summary: 'Recertification, Right-to-Counsel, budgeting when you pay partial rent',
        track: 'tenant-voucher-holder',
        order: 4,
        duration: '90 minutes',
        outcomes: ['Maintain housing stability', 'Navigate recertification', 'Access legal resources']
      }
    ]
  },
  {
    id: 'landlord-property-manager',
    name: 'Landlord & Property Manager Track',
    description: 'Reduce stigma around voucher tenants by showing business benefits and compliance roadmap',
    audience: 'Landlords, property managers, and housing providers',
    timeCommitment: '4 modules • ~5 hours total',
    learningOutcomes: [
      'Reduce vacancy rates',
      'Increase rental income',
      'Ensure compliance',
      'Better tenant relationships'
    ],
    color: 'green',
    modules: [
      {
        slug: 'why-rent-voucher-holders',
        title: 'Why Rent to Voucher Holders?',
        summary: 'Guaranteed rent, landlord bonus programs, rent increases tied to HUD/HPD standards',
        track: 'landlord-property-manager',
        order: 1,
        duration: '75 minutes',
        outcomes: ['Understand financial benefits', 'Learn about bonus programs', 'Calculate guaranteed income']
      },
      {
        slug: 'nyc-lease-up-process',
        title: 'The NYC Lease-Up Process',
        summary: 'Acceptance to move-in, navigating HRA and HPD inspections',
        track: 'landlord-property-manager',
        order: 2,
        duration: '75 minutes',
        outcomes: ['Master lease-up workflow', 'Navigate inspection processes', 'Avoid common delays']
      },
      {
        slug: 'working-case-managers',
        title: 'Working With Case Managers & Agencies',
        summary: 'Smooth communication, who to call when issues arise',
        track: 'landlord-property-manager',
        order: 3,
        duration: '75 minutes',
        outcomes: ['Build effective partnerships', 'Resolve issues quickly', 'Maintain positive relationships']
      },
      {
        slug: 'keeping-properties-compliant',
        title: 'Keeping Properties Compliant',
        summary: 'HPD inspections, Housing Quality Standards, avoiding violations',
        track: 'landlord-property-manager',
        order: 4,
        duration: '75 minutes',
        outcomes: ['Maintain HQS standards', 'Pass inspections consistently', 'Avoid violations and penalties']
      }
    ]
  },
  {
    id: 'housing-secrets',
    name: 'Housing Secrets Track',
    description: 'Give families and landlords the \'inside scoop\' that isn\'t written on city websites',
    audience: 'Housing seekers and landlords wanting insider knowledge',
    timeCommitment: '4 modules • ~5 hours total',
    learningOutcomes: [
      'Faster approvals',
      'Access hidden programs',
      'Build networks',
      'Maximize benefits'
    ],
    color: 'purple',
    modules: [
      {
        slug: 'fast-tracking-application',
        title: 'Fast-Tracking Your Application',
        summary: 'Organize documents so HRA/HPD doesn\'t bounce them back, avoid delays',
        track: 'housing-secrets',
        order: 1,
        duration: '75 minutes',
        outcomes: ['Organize documents effectively', 'Avoid common rejection reasons', 'Speed up approval process']
      },
      {
        slug: 'landlord-incentives-programs',
        title: 'Landlord Incentives & Programs',
        summary: 'Bonus payments for CityFHEPS leases, repair and tax benefit programs',
        track: 'housing-secrets',
        order: 2,
        duration: '75 minutes',
        outcomes: ['Access bonus payment programs', 'Utilize repair assistance', 'Maximize tax benefits']
      },
      {
        slug: 'finding-open-doors',
        title: 'Finding Open Doors',
        summary: 'Identify voucher-friendly brokers, agents, landlords, networking tips',
        track: 'housing-secrets',
        order: 3,
        duration: '75 minutes',
        outcomes: ['Build professional networks', 'Identify voucher-friendly partners', 'Access insider opportunities']
      },
      {
        slug: 'beyond-vouchers',
        title: 'Beyond Vouchers',
        summary: 'One-Shot Deals, utility assistance, moving grants, food & childcare support',
        track: 'housing-secrets',
        order: 4,
        duration: '75 minutes',
        outcomes: ['Access additional support programs', 'Maximize available benefits', 'Build comprehensive support network']
      }
    ]
  },
  {
    id: 'advocate-community',
    name: 'Advocate & Community Track',
    description: 'Equip caseworkers, shelter staff, and grassroots leaders with tools to fight systemic barriers',
    audience: 'Caseworkers, shelter staff, community leaders, and grassroots advocates',
    timeCommitment: '4 modules • ~6 hours total',
    learningOutcomes: [
      'Effective advocacy',
      'System navigation',
      'Community organizing',
      'Policy influence'
    ],
    color: 'orange',
    modules: [
      {
        slug: 'nyc-housing-systems-101',
        title: 'NYC Housing Systems 101',
        summary: 'How DSS, HRA, HPD, and NYCHA connect, why delays happen, how to push back',
        track: 'advocate-community',
        order: 1,
        duration: '90 minutes',
        outcomes: ['Understand system connections', 'Identify delay causes', 'Develop push-back strategies']
      },
      {
        slug: 'advocacy-skills-families',
        title: 'Advocacy Skills for Families',
        summary: 'Help clients write appeals, contact councilmembers, escalate cases effectively',
        track: 'advocate-community',
        order: 2,
        duration: '90 minutes',
        outcomes: ['Master appeal processes', 'Build effective communication skills', 'Escalate cases strategically']
      },
      {
        slug: 'building-community-power',
        title: 'Building Community Power',
        summary: 'Block associations, churches, nonprofits supporting housing seekers, tenant organizing',
        track: 'advocate-community',
        order: 3,
        duration: '90 minutes',
        outcomes: ['Build community networks', 'Organize tenant groups', 'Leverage institutional support']
      },
      {
        slug: 'policy-change-nyc-housing',
        title: 'Policy & Change in NYC Housing',
        summary: 'Current reforms, CityFHEPS expansion, Right-to-Counsel, community influence',
        track: 'advocate-community',
        order: 4,
        duration: '90 minutes',
        outcomes: ['Understand current policy landscape', 'Influence policy development', 'Drive systemic change']
      }
    ]
  },
  {
    id: 'real-estate-professional',
    name: 'Real Estate Professional Track (NYC)',
    description: 'Complete professional training for agents, brokers, PMs, and landlords. Master NYC voucher programs for competitive advantage.',
    audience: 'Real estate agents, brokers, property managers, landlords, and housing professionals',
    timeCommitment: '8 modules • ~12 hours total + certification',
    learningOutcomes: [
      'Faster lease-ups with vouchers',
      'Full fair housing compliance',
      'Fewer failed inspections',
      'Smoother payments'
    ],
    color: 'red',
    modules: [
      {
        slug: 'nyc-voucher-specialist-certification',
        title: 'NYC Voucher Program Specialist Certification',
        summary: '8 comprehensive modules covering compliance, workflows, and crisis management',
        track: 'real-estate-professional',
        order: 1,
        duration: '12 hours',
        outcomes: ['Achieve professional certification', 'Master all voucher programs', 'Build competitive advantage']
      }
    ]
  }
]

export const modules: Module[] = learningTracks.flatMap(track => track.modules)

export const tracks = learningTracks

export function getModuleBySlug(slug: string): Module | undefined {
  return modules.find(module => module.slug === slug)
}

export function getModulesBySection(section: string): Module[] {
  return modules.filter(module => module.section === section)
}

export function getTotalModules(): number {
  return modules.length
}

export function getModules(): Module[] {
  return modules
}

export function getModule(slug: string): Module | undefined {
  return getModuleBySlug(slug)
}

export function getNextSlug(currentSlug: string): string | null {
  const currentIndex = modules.findIndex(m => m.slug === currentSlug)
  if (currentIndex === -1 || currentIndex === modules.length - 1) {
    return null
  }
  return modules[currentIndex + 1].slug
}


