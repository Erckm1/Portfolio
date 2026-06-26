import { Component, signal } from '@angular/core';

interface Experience {
  id: number;
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  description: string;
  responsibilities: string[];
  achievements: string[];
  tech: string[];
  color: string;
}

interface ColorTokens {
  dot: string;
  badge: string;
  hover: string;
}

@Component({
  selector: 'app-experience-component',
  imports: [],
  templateUrl: './experience-component.html',
  styleUrl: './experience-component.css',
})
export class ExperienceComponent {
  expandedId = signal<number>(1);

  readonly colorMap: Record<string, ColorTokens> = {
    indigo:  { dot: 'bg-indigo-500  ring-4 ring-indigo-500/30',  badge: 'text-indigo-400  border-indigo-500/20  bg-indigo-500/8',  hover: 'hover:border-indigo-500/20'  },
    violet:  { dot: 'bg-violet-500  ring-4 ring-violet-500/30',  badge: 'text-violet-400  border-violet-500/20  bg-violet-500/8',  hover: 'hover:border-violet-500/20'  },
    sky:     { dot: 'bg-sky-500     ring-4 ring-sky-500/30',     badge: 'text-sky-400     border-sky-500/20     bg-sky-500/8',     hover: 'hover:border-sky-500/20'     },
    emerald: { dot: 'bg-emerald-500 ring-4 ring-emerald-500/30', badge: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/8', hover: 'hover:border-emerald-500/20' },
  };

  readonly experiences: Experience[] = [
    {
      id: 1, company: 'Capgemini', role: 'Senior Full Stack Developer',
      period: 'Jan 2022 – Present', location: 'Remote', type: 'Full-time',
      description: 'Leading backend architecture and development for enterprise banking and financial systems serving 2M+ users.',
      responsibilities: [
        'Architected microservices platform processing 50K+ daily transactions using .NET 8 and Azure Service Bus',
        'Led a team of 6 engineers, conducting code reviews and driving Clean Architecture adoption across all services',
        'Reduced API response times by 40% through query optimization, caching strategies, and async patterns',
        'Designed and implemented CI/CD pipelines with Azure DevOps, achieving 95% automated test coverage',
      ],
      achievements: [
        'Delivered banking core system 3 weeks ahead of schedule',
        'Mentored 3 junior developers to mid-level promotions',
        'Reduced infrastructure costs by 30% via Azure optimization',
      ],
      tech: ['.NET 8', 'C#', 'Angular 17', 'Azure', 'SQL Server', 'Docker', 'Kubernetes'],
      color: 'indigo',
    },
    {
      id: 2, company: 'EPAM Systems', role: 'Full Stack Developer',
      period: 'Mar 2020 – Dec 2021', location: 'Mexico City, MX', type: 'Full-time',
      description: 'Developed enterprise e-commerce and logistics platforms for Fortune 500 clients across North America.',
      responsibilities: [
        'Built RESTful APIs and Angular SPAs serving 500K+ concurrent users for a logistics optimization platform',
        'Implemented Domain-Driven Design patterns using MediatR and CQRS for complex business workflows',
        'Migrated legacy monolith to microservices architecture, improving deployment frequency by 10x',
        'Integrated payment gateways (Stripe, PayPal) handling $5M+ monthly transaction volume',
      ],
      achievements: [
        'Delivered 15 features across 4 product releases',
        'Achieved 99.95% API uptime SLA for enterprise clients',
        'Won internal innovation award for microservices migration blueprint',
      ],
      tech: ['ASP.NET Core', 'Angular', 'Vue.js', 'PostgreSQL', 'Redis', 'Azure DevOps'],
      color: 'violet',
    },
    {
      id: 3, company: 'Softtek', role: 'Backend Developer',
      period: 'Jun 2018 – Feb 2020', location: 'Monterrey, MX', type: 'Full-time',
      description: 'Developed backend APIs and data pipelines for enterprise ERP and CRM systems in manufacturing sector.',
      responsibilities: [
        'Developed 40+ REST API endpoints for ERP integration layer consumed by 8 enterprise clients',
        'Optimized SQL Server database queries reducing execution time by 60% through indexing strategies',
        'Built ETL pipelines processing 10GB+ of daily manufacturing data into analytics dashboards',
        'Implemented authentication and authorization using ASP.NET Identity and JWT tokens',
      ],
      achievements: [
        'Promoted from Junior to Mid-level within 12 months',
        'Database optimization saved client $120K annually in infrastructure',
        'Built reusable API framework adopted company-wide',
      ],
      tech: ['ASP.NET Core', 'C#', 'SQL Server', 'Entity Framework', 'Azure', 'Vue.js'],
      color: 'sky',
    },
    {
      id: 4, company: 'Freelance', role: '.NET Developer',
      period: 'Jan 2017 – May 2018', location: 'Remote', type: 'Contract',
      description: 'Provided full-stack development services for startups and small businesses, building web applications and APIs.',
      responsibilities: [
        'Built 10+ web applications for clients in retail, healthcare, and education sectors',
        'Designed and implemented SQL Server databases with proper normalization and indexing',
        'Delivered responsive frontends using Angular and Vue.js with a focus on UX',
        'Managed projects end-to-end, from requirements gathering to deployment and maintenance',
      ],
      achievements: [
        '100% client retention across 12 project engagements',
        'Delivered all projects within agreed timelines and budgets',
      ],
      tech: ['.NET Framework', 'MVC', 'Angular', 'SQL Server', 'Bootstrap'],
      color: 'emerald',
    },
  ];

  isExpanded(id: number): boolean { return this.expandedId() === id; }
  toggle(id: number): void { this.expandedId.set(this.expandedId() === id ? 0 : id); }
  colors(color: string): ColorTokens { return this.colorMap[color]; }
}
