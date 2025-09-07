export interface ModuleContent {
  slug: string
  sections: {
    title: string
    content: string
    type: 'text' | 'list' | 'warning' | 'tip' | 'example' | 'resource'
  }[]
  resources?: {
    title: string
    url: string
    description: string
  }[]
  checklist?: string[]
}

export const moduleContent: Record<string, ModuleContent> = {
  'housing-rights-nyc': {
    slug: 'housing-rights-nyc',
    sections: [
      {
        title: 'Understanding Your Rights',
        content: 'As a New York City resident, you have specific rights when it comes to housing. These rights are protected by both federal and local laws, including the Fair Housing Act and NYC Human Rights Law.',
        type: 'text'
      },
      {
        title: 'Protected Classes',
        content: 'You cannot be discriminated against based on:',
        type: 'list'
      },
      {
        title: 'Protected Characteristics',
        content: '• Race, color, or national origin\n• Religion\n• Sex (including gender identity and sexual orientation)\n• Disability\n• Age (18 and over)\n• Marital status\n• Source of income (including housing vouchers)\n• Immigration status\n• Familial status (having children)',
        type: 'text'
      },
      {
        title: 'Common Violations',
        content: 'Watch out for these illegal practices:',
        type: 'warning'
      },
      {
        title: 'Illegal Practices',
        content: '• Refusing to rent to voucher holders\n• Charging different rent or fees based on protected characteristics\n• Requiring different application criteria\n• Harassment or intimidation\n• Retaliation for reporting violations\n• Steering to certain neighborhoods based on protected characteristics',
        type: 'text'
      },
      {
        title: 'NYC Human Rights Law',
        content: 'NYC has some of the strongest housing protections in the country. The NYC Human Rights Law provides additional protections beyond federal law.',
        type: 'tip'
      },
      {
        title: 'What to Do If You Experience Discrimination',
        content: '1. Document everything (dates, times, names, what was said)\n2. Keep all correspondence (emails, texts, letters)\n3. Take photos of any discriminatory materials\n4. Report to the NYC Commission on Human Rights\n5. Consider filing a complaint with HUD\n6. Contact legal aid organizations',
        type: 'example'
      }
    ],
    resources: [
      {
        title: 'NYC Commission on Human Rights',
        url: 'https://www1.nyc.gov/site/cchr/index.page',
        description: 'File discrimination complaints and get help'
      },
      {
        title: 'HUD Fair Housing',
        url: 'https://www.hud.gov/program_offices/fair_housing_equal_opp',
        description: 'Federal fair housing resources and complaint process'
      },
      {
        title: 'Legal Aid Society',
        url: 'https://legalaidnyc.org/',
        description: 'Free legal assistance for housing issues'
      }
    ],
    checklist: [
      'Understand your protected characteristics',
      'Know what constitutes illegal discrimination',
      'Learn how to document violations',
      'Know where to report discrimination',
      'Understand the complaint process'
    ]
  },

  'understanding-nyc-vouchers': {
    slug: 'understanding-nyc-vouchers',
    sections: [
      {
        title: 'Types of NYC Housing Vouchers',
        content: 'New York City offers several housing voucher programs to help low-income residents afford housing. Each program has different eligibility requirements and benefits.',
        type: 'text'
      },
      {
        title: 'CityFHEPS (City Family Homelessness and Eviction Prevention Supplement)',
        content: '• For families in shelters or at risk of homelessness\n• Covers up to 100% of rent\n• Maximum rent: $2,000 for 1BR, $2,500 for 2BR\n• No income limit for families in shelters\n• Must work 20 hours/week or be exempt',
        type: 'list'
      },
      {
        title: 'Section 8 (Housing Choice Voucher)',
        content: '• Federal program administered locally\n• Pays difference between 30% of income and rent\n• Must be under 50% of area median income\n• Long waiting list (often 5+ years)\n• Portable to other cities',
        type: 'list'
      },
      {
        title: 'FHEPS (Family Homelessness and Eviction Prevention Supplement)',
        content: '• State program for families\n• Similar to CityFHEPS but state-funded\n• Covers up to 100% of rent\n• Must be under 200% of federal poverty level',
        type: 'list'
      },
      {
        title: 'HASA (HIV/AIDS Services Administration)',
        content: '• For people living with HIV/AIDS\n• Covers up to 100% of rent\n• No income limit\n• Includes additional support services\n• Must be NYC resident',
        type: 'list'
      },
      {
        title: 'Eligibility Requirements',
        content: 'While each program has specific requirements, most NYC voucher programs require:',
        type: 'tip'
      },
      {
        title: 'Common Requirements',
        content: '• NYC residency\n• Income below program limits\n• No recent evictions for non-payment\n• No recent drug-related criminal activity\n• Must not owe money to NYCHA\n• Must cooperate with program requirements',
        type: 'text'
      },
      {
        title: 'Application Process',
        content: '1. Apply through appropriate agency (DSS, HRA, HPD)\n2. Complete intake interview\n3. Provide required documentation\n4. Wait for approval\n5. Receive voucher and search for housing\n6. Find landlord willing to accept voucher\n7. Complete inspection process\n8. Sign lease and move in',
        type: 'example'
      }
    ],
    resources: [
      {
        title: 'NYC Housing Connect',
        url: 'https://housingconnect.nyc.gov/',
        description: 'Apply for affordable housing and vouchers'
      },
      {
        title: 'HRA Voucher Programs',
        url: 'https://www1.nyc.gov/site/hra/help/voucher-programs.page',
        description: 'Information about HRA-administered voucher programs'
      },
      {
        title: 'HPD Voucher Programs',
        url: 'https://www1.nyc.gov/site/hpd/services-and-information/rental-assistance.page',
        description: 'HPD voucher program information'
      }
    ],
    checklist: [
      'Understand different voucher types',
      'Know eligibility requirements',
      'Learn application process',
      'Understand voucher benefits',
      'Know where to apply'
    ]
  },

  'finding-applying-apartment': {
    slug: 'finding-applying-apartment',
    sections: [
      {
        title: 'Preparing Your Application',
        content: 'Having all your documents ready before you start looking will give you a significant advantage in NYC\'s competitive rental market.',
        type: 'text'
      },
      {
        title: 'Required Documents',
        content: '• Government-issued photo ID\n• Social Security card\n• Birth certificates for all household members\n• Proof of income (pay stubs, tax returns, benefits letters)\n• Bank statements (3-6 months)\n• Voucher or program approval letter\n• Reference letters from previous landlords\n• Employment verification letter',
        type: 'list'
      },
      {
        title: 'Voucher-Specific Documents',
        content: '• Voucher approval letter\n• Program case manager contact information\n• Inspection requirements\n• Rent reasonableness determination\n• Landlord incentive information',
        type: 'list'
      },
      {
        title: 'Where to Search for Apartments',
        content: '• NYC Housing Connect (affordable housing)\n• StreetEasy (voucher-friendly filter)\n• Apartments.com\n• RentHop\n• Craigslist\n• Word of mouth\n• Real estate agents\n• Community organizations',
        type: 'list'
      },
      {
        title: 'Search Strategies',
        content: '1. Start early - begin looking 60-90 days before voucher expires\n2. Cast a wide net - look in multiple neighborhoods\n3. Be flexible on amenities\n4. Consider smaller apartments\n5. Look in less trendy areas\n6. Network with other voucher holders\n7. Contact landlords directly',
        type: 'example'
      },
      {
        title: 'Red Flags to Avoid',
        content: '• Landlords who refuse to accept vouchers\n• Apartments that seem too good to be true\n• Requests for money before viewing\n• No written lease\n• Pressure to sign immediately\n• Unlicensed brokers\n• Apartments that fail inspection',
        type: 'warning'
      },
      {
        title: 'Making Your Application Competitive',
        content: '• Submit complete applications immediately\n• Include a cover letter explaining your situation\n• Provide character references\n• Show stable income history\n• Demonstrate good rental history\n• Be professional and courteous\n• Follow up politely',
        type: 'tip'
      }
    ],
    resources: [
      {
        title: 'StreetEasy Voucher Search',
        url: 'https://streeteasy.com/',
        description: 'Search for voucher-friendly apartments'
      },
      {
        title: 'NYC Housing Connect',
        url: 'https://housingconnect.nyc.gov/',
        description: 'Apply for affordable housing'
      },
      {
        title: 'HPD Housing Search',
        url: 'https://www1.nyc.gov/site/hpd/services-and-information/rental-assistance.page',
        description: 'HPD housing search tools'
      }
    ],
    checklist: [
      'Gather all required documents',
      'Create a search strategy',
      'Know where to look for apartments',
      'Understand application process',
      'Know red flags to avoid'
    ]
  },

  'staying-in-home': {
    slug: 'staying-in-home',
    sections: [
      {
        title: 'Maintaining Your Housing',
        content: 'Once you\'ve secured housing with a voucher, it\'s important to understand how to maintain your tenancy and keep your voucher active.',
        type: 'text'
      },
      {
        title: 'Annual Recertification',
        content: 'You must recertify your income and household composition annually to keep your voucher active.',
        type: 'warning'
      },
      {
        title: 'Recertification Process',
        content: '1. Receive recertification notice (usually 60-90 days before anniversary)\n2. Complete income verification forms\n3. Provide updated documentation\n4. Attend recertification interview\n5. Update household composition if changed\n6. Pay any required rent portion\n7. Receive renewed voucher',
        type: 'example'
      },
      {
        title: 'Rent Payment Responsibilities',
        content: '• Pay your portion of rent on time\n• Keep receipts for all payments\n• Notify case manager of payment issues\n• Understand what happens if you miss payments\n• Know your rights regarding rent increases',
        type: 'list'
      },
      {
        title: 'Right to Counsel',
        content: 'NYC provides free legal representation for tenants facing eviction. This is a crucial resource for maintaining your housing.',
        type: 'tip'
      },
      {
        title: 'When to Contact Right to Counsel',
        content: '• Receive eviction notice\n• Landlord files case in housing court\n• Rent increase disputes\n• Maintenance issues\n• Harassment by landlord\n• Illegal lockouts\n• Any housing court proceedings',
        type: 'text'
      },
      {
        title: 'Budgeting for Partial Rent',
        content: 'When you pay a portion of rent, it\'s important to budget carefully:',
        type: 'tip'
      },
      {
        title: 'Budgeting Tips',
        content: '• Set aside rent money first\n• Create a monthly budget\n• Track all expenses\n• Build emergency savings\n• Know your income sources\n• Plan for rent increases\n• Consider additional income sources',
        type: 'text'
      },
      {
        title: 'Maintaining Good Standing',
        content: '• Pay rent on time\n• Follow lease terms\n• Report maintenance issues promptly\n• Communicate with landlord professionally\n• Keep apartment clean and safe\n• Notify of changes in household\n• Cooperate with inspections',
        type: 'list'
      }
    ],
    resources: [
      {
        title: 'Right to Counsel NYC',
        url: 'https://www1.nyc.gov/site/hra/help/right-to-counsel.page',
        description: 'Free legal help for tenants facing eviction'
      },
      {
        title: 'NYC Housing Court',
        url: 'https://www.nycourts.gov/courts/nyc/housing/',
        description: 'Information about housing court proceedings'
      },
      {
        title: 'Housing Preservation and Development',
        url: 'https://www1.nyc.gov/site/hpd/',
        description: 'Report housing violations and get help'
      }
    ],
    checklist: [
      'Understand recertification process',
      'Know rent payment responsibilities',
      'Learn about Right to Counsel',
      'Create a budget for partial rent',
      'Know how to maintain good standing'
    ]
  }
}

export function getModuleContent(slug: string): ModuleContent | undefined {
  return moduleContent[slug]
}
