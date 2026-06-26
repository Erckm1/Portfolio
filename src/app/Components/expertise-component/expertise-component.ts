import { Component } from '@angular/core';

interface ExpertiseCard {
  iconPath: string;
  title: string;
  description: string;
  tags: string[];
  gradient: string;
  border: string;
  iconColor: string;
  iconBg: string;
}

@Component({
  selector: 'app-expertise-component',
  imports: [],
  templateUrl: './expertise-component.html',
  styleUrl: './expertise-component.css',
})
export class ExpertiseComponent {
  readonly cards: ExpertiseCard[] = [
    {
      iconPath: 'M22 12h-4l-3 9L9 3l-3 9H2',
      title: 'Backend Engineering',
      description: 'Building robust, scalable server-side architectures with Clean Architecture, CQRS, and Domain-Driven Design principles.',
      tags: ['.NET 8', 'ASP.NET Core', 'Microservices', 'Clean Architecture', 'MediatR', 'Entity Framework'],
      gradient: 'from-indigo-500/15 to-violet-500/5',
      border: 'hover:border-indigo-500/30',
      iconColor: 'text-indigo-400',
      iconBg: 'bg-indigo-500/10',
    },
    {
      iconPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z',
      title: 'Frontend Development',
      description: 'Crafting performant, accessible, and visually compelling web interfaces with modern frameworks and TypeScript.',
      tags: ['Angular 17', 'Vue.js 3', 'TypeScript', 'RxJS', 'Tailwind CSS', 'Responsive Design'],
      gradient: 'from-violet-500/15 to-fuchsia-500/5',
      border: 'hover:border-violet-500/30',
      iconColor: 'text-violet-400',
      iconBg: 'bg-violet-500/10',
    },
    {
      iconPath: 'M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z',
      title: 'Cloud Solutions',
      description: 'Designing and deploying cloud-native applications on Azure with CI/CD pipelines, containerization, and infrastructure as code.',
      tags: ['Microsoft Azure', 'Azure DevOps', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
      gradient: 'from-sky-500/15 to-cyan-500/5',
      border: 'hover:border-sky-500/30',
      iconColor: 'text-sky-400',
      iconBg: 'bg-sky-500/10',
    },
    {
      iconPath: 'M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z',
      title: 'Database Engineering',
      description: 'Architecting high-performance data layers with relational and NoSQL databases, query optimization, and data modeling.',
      tags: ['SQL Server', 'PostgreSQL', 'MySQL', 'Redis', 'Query Optimization', 'EF Core'],
      gradient: 'from-emerald-500/15 to-teal-500/5',
      border: 'hover:border-emerald-500/30',
      iconColor: 'text-emerald-400',
      iconBg: 'bg-emerald-500/10',
    },
  ];

  getIconPaths(title: string): string[] {
    const icons: Record<string, string[]> = {
      'Backend Engineering': ['M22 12h-4l-3 9L9 3l-3 9H2'],
      'Frontend Development': ['M3 12h18', 'M3 6h18', 'M3 18h18'],
      'Cloud Solutions': ['M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z'],
      'Database Engineering': ['M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z', 'M7 7h.01'],
    };
    return icons[title] ?? ['M12 2v20M2 12h20'];
  }
}
