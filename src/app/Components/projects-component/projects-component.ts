import { Component, signal, computed } from '@angular/core';

type FilterTag = 'All' | '.NET' | 'Angular' | 'Azure' | 'Microservices' | 'SQL';

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tags: string[];
  techStack: string[];
  features: string[];
  github: string;
  live: string;
  color: string;
  accentColor: string;
}

@Component({
  selector: 'app-projects-component',
  imports: [],
  templateUrl: './projects-component.html',
  styleUrl: './projects-component.css',
})
export class ProjectsComponent {
  readonly filters: FilterTag[] = ['All', '.NET', 'Angular', 'Azure', 'Microservices', 'SQL'];

  readonly projects: Project[] = [
    {
      id: 1, title: 'Banking Platform', subtitle: 'Core Banking System',
      description: 'Full-scale core banking platform handling real-time transactions, account management, and regulatory compliance. Built with microservices architecture ensuring 99.99% uptime and sub-100ms response times.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop&auto=format',
      tags: ['.NET', 'Microservices', 'SQL', 'Azure'],
      techStack: ['ASP.NET Core', 'SQL Server', 'Azure Service Bus', 'Docker', 'Redis'],
      features: ['Real-time transaction processing', 'Multi-currency support', 'Regulatory compliance (PCI-DSS)', 'Event-sourcing architecture'],
      github: '#', live: '#', color: 'from-indigo-500/20 to-violet-500/5', accentColor: 'indigo',
    },
    {
      id: 2, title: 'Credit Card Administration System', subtitle: 'Card Lifecycle Management',
      description: 'Enterprise credit card management system processing 2M+ daily transactions. Features automated fraud detection, real-time spend analytics, and seamless card issuance workflows.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop&auto=format',
      tags: ['.NET', 'SQL', 'Azure'],
      techStack: ['.NET 8', 'Angular 17', 'SQL Server', 'SignalR', 'Azure Functions'],
      features: ['Fraud detection ML pipeline', 'Real-time transaction monitoring', 'Card issuance automation', 'Regulatory reporting'],
      github: '#', live: '#', color: 'from-violet-500/20 to-fuchsia-500/5', accentColor: 'violet',
    },
    {
      id: 3, title: 'Enterprise API Gateway', subtitle: 'Centralized API Management',
      description: 'High-throughput API gateway routing 50K+ requests/minute with intelligent load balancing, rate limiting, authentication, and real-time monitoring dashboards.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop&auto=format',
      tags: ['.NET', 'Microservices', 'Azure'],
      techStack: ['ASP.NET Core', 'Ocelot', 'Redis', 'Azure API Management', 'Prometheus'],
      features: ['50K+ req/min throughput', 'JWT & OAuth2 auth', 'Circuit breaker pattern', 'Real-time telemetry'],
      github: '#', live: '#', color: 'from-sky-500/20 to-cyan-500/5', accentColor: 'sky',
    },
    {
      id: 4, title: 'Cloud Native Microservices Platform', subtitle: 'Distributed Systems Architecture',
      description: 'Greenfield microservices platform deployed on Azure Kubernetes Service with automated CI/CD, service mesh, distributed tracing, and infrastructure as code.',
      image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=500&fit=crop&auto=format',
      tags: ['.NET', 'Microservices', 'Azure'],
      techStack: ['.NET 8', 'Kubernetes', 'Azure DevOps', 'Terraform', 'Dapr'],
      features: ['AKS deployment', 'Service mesh (Istio)', 'IaC with Terraform', 'Distributed tracing'],
      github: '#', live: '#', color: 'from-emerald-500/20 to-teal-500/5', accentColor: 'emerald',
    },
    {
      id: 5, title: 'E-Commerce Solution', subtitle: 'Full-Stack Commerce Platform',
      description: 'Modern e-commerce platform with Angular frontend, .NET backend, and Azure infrastructure. Features inventory management, payment integration, and real-time order tracking.',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=500&fit=crop&auto=format',
      tags: ['.NET', 'Angular', 'SQL', 'Azure'],
      techStack: ['Angular 17', 'ASP.NET Core', 'PostgreSQL', 'Stripe API', 'Azure CDN'],
      features: ['Multi-vendor marketplace', 'Payment gateway integration', 'Real-time inventory', 'PWA support'],
      github: '#', live: '#', color: 'from-orange-500/20 to-amber-500/5', accentColor: 'orange',
    },
  ];

  readonly accentMap: Record<string, string> = {
    indigo:  'border-indigo-500/30 text-indigo-300 bg-indigo-500/10',
    violet:  'border-violet-500/30 text-violet-300 bg-violet-500/10',
    sky:     'border-sky-500/30 text-sky-300 bg-sky-500/10',
    emerald: 'border-emerald-500/30 text-emerald-300 bg-emerald-500/10',
    orange:  'border-orange-500/30 text-orange-300 bg-orange-500/10',
  };

  readonly tagColorMap: Record<string, string> = {
    '.NET':         'border-indigo-500/20 text-indigo-400',
    'Angular':      'border-red-500/20 text-red-400',
    'Azure':        'border-sky-500/20 text-sky-400',
    'Microservices':'border-violet-500/20 text-violet-400',
    'SQL':          'border-cyan-500/20 text-cyan-400',
  };

  activeFilter = signal<FilterTag>('All');
  expandedId   = signal<number | null>(null);

  filteredProjects = computed(() =>
    this.activeFilter() === 'All'
      ? this.projects
      : this.projects.filter(p => p.tags.includes(this.activeFilter()))
  );

  setFilter(f: FilterTag): void { this.activeFilter.set(f); }
  isFilterActive(f: FilterTag): boolean { return this.activeFilter() === f; }
  isExpanded(id: number): boolean { return this.expandedId() === id; }
  toggleExpand(id: number): void { this.expandedId.set(this.expandedId() === id ? null : id); }
  getTagColor(tag: string): string { return this.tagColorMap[tag] ?? 'border-gray-500/20 text-gray-400'; }
  getAccentClass(color: string): string { return this.accentMap[color] ?? ''; }
}
