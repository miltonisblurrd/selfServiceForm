import { Service } from '@/types/form';

export const services: Service[] = [
  {
    id: 'seo-aeo',
    name: 'SEO & AEO',
    description: 'You\'ll receive a comprehensive audit of your website. This will include: 1) A report of all technical issues in your site, 2) A list of solutions (how you can fix those technical issues) and why those are important to fix, 3) Tips on how to contextualize your site and improve interlinking. We\'ll deliver this with a custom Loom video where we\'ll review your report. Turnaround is 1 week from signup.',
    icon: '🔍',
    packages: [
      {
        id: '1-week',
        name: '1 Week',
        price: 1500,
        timeline: '1 Week',
        prepaidHours: true,
        included: [
          'A report of all technical issues in your site',
          'A list of solutions (how you can fix those technical issues)',
          'Tips on how to contextualize your site and improve interlinking',
          'Custom Loom video where we\'ll review your report'
        ],
        notIncluded: [
          'Implementation of the fixes'
        ]
      }
    ]
  },
  {
    id: 'technical-problem-solving',
    name: 'Technical Problem Solving',
    description: 'Get expert help solving complex technical challenges in your project.',
    icon: '🛠️',
    packages: [
      {
        id: 'hourly-support',
        name: 'Hourly Support',
        price: 150,
        timeline: 'Flexible',
        prepaidHours: true,
        included: [
          'Direct access to technical experts',
          'Problem diagnosis and solution recommendations',
          'Code review and optimization suggestions',
          'Documentation of solutions provided'
        ],
        notIncluded: [
          'Long-term project management',
          'Full application development'
        ]
      },
      {
        id: 'project-package',
        name: 'Project Package',
        price: 5000,
        timeline: '2-4 Weeks',
        prepaidHours: false,
        included: [
          'Full project scope analysis',
          'Complete technical implementation',
          'Testing and quality assurance',
          'Documentation and handoff',
          '2 weeks of post-launch support'
        ],
        notIncluded: [
          'Ongoing maintenance after support period',
          'Third-party service costs'
        ]
      }
    ]
  }
];

export function getServiceById(id: string): Service | undefined {
  return services.find(service => service.id === id);
}

export function getPackageById(serviceId: string, packageId: string) {
  const service = getServiceById(serviceId);
  return service?.packages.find(pkg => pkg.id === packageId);
}
