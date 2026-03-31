import { Service } from '@/types/form';

export const services: Service[] = [
  {
    id: 'brand-identity',
    name: 'Brand Identity and Kits',
    description: 'Complete brand identity packages including logo design, color palettes, typography, and brand guidelines.',
    icon: '🎨',
    disabled: false,
    packages: [
      {
        id: 'starter',
        name: 'Starter',
        price: 2500,
        timeline: '2 Weeks',
        prepaidHours: true,
        included: [
          'Logo design with 3 concepts',
          'Color palette development',
          'Typography selection',
          'Basic brand guidelines PDF'
        ],
        notIncluded: [
          'Website design',
          'Marketing materials'
        ]
      },
      {
        id: 'complete',
        name: 'Complete',
        price: 5000,
        timeline: '3-4 Weeks',
        prepaidHours: true,
        included: [
          'Logo design with 5+ concepts',
          'Complete color system',
          'Typography system',
          'Comprehensive brand guidelines',
          'Business card templates',
          'Social media templates'
        ],
        notIncluded: [
          'Website development',
          'Ongoing support'
        ]
      }
    ]
  },
  {
    id: 'web-product-design',
    name: 'Web and Product Design',
    description: 'UI/UX design for websites and digital products, from wireframes to high-fidelity prototypes.',
    icon: '🖼️',
    disabled: false,
    packages: [
      {
        id: 'landing-page',
        name: 'Landing Page',
        price: 3000,
        timeline: '2 Weeks',
        prepaidHours: true,
        included: [
          'Wireframes and user flows',
          'High-fidelity mockups',
          'Responsive design (mobile/tablet/desktop)',
          'Interactive prototype',
          'Design system tokens'
        ],
        notIncluded: [
          'Development/implementation',
          'Content writing'
        ]
      },
      {
        id: 'full-website',
        name: 'Full Website',
        price: 8000,
        timeline: '4-6 Weeks',
        prepaidHours: true,
        included: [
          'Complete site architecture',
          'Wireframes for all pages',
          'High-fidelity designs',
          'Responsive design system',
          'Interactive prototype',
          'Component library'
        ],
        notIncluded: [
          'Development/implementation',
          'SEO optimization'
        ]
      }
    ]
  },
  {
    id: 'web-product-development',
    name: 'Web and Product Development',
    description: 'Full-stack development services for web applications and digital products.',
    icon: '💻',
    disabled: true,
    disabledMessage: 'Dev Services can not be self generated. Requires meetings for technical discussions.',
    packages: []
  }
];

export function getServiceById(id: string): Service | undefined {
  return services.find(service => service.id === id);
}

export function getPackageById(serviceId: string, packageId: string) {
  const service = getServiceById(serviceId);
  return service?.packages.find(pkg => pkg.id === packageId);
}
