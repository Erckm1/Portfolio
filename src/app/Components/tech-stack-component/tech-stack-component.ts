import { Component, signal, computed } from '@angular/core';

type Category = 'All' | 'Backend' | 'Frontend' | 'Database' | 'Cloud';

interface Technology {
  name: string;
  category: Category;
  icon: string;
  color: string;
  bg: string;
  border: string;
  level: number;
}

@Component({
  selector: 'app-tech-stack-component',
  imports: [],
  templateUrl: './tech-stack-component.html',
  styleUrl: './tech-stack-component.css',
})
export class TechStackComponent {
  readonly categories: Category[] = ['All', 'Backend', 'Frontend', 'Database', 'Cloud'];

  readonly technologies: Technology[] = [
    { name: 'C#',             category: 'Backend',  icon: '⚙️', color: 'text-violet-300', bg: 'bg-violet-500/8', border: 'border-violet-500/15', level: 99 },
    { name: '.NET 8',         category: 'Backend',  icon: '🔷', color: 'text-indigo-300', bg: 'bg-indigo-500/8', border: 'border-indigo-500/15', level: 98 },
    { name: 'ASP.NET Core',   category: 'Backend',  icon: '🌐', color: 'text-blue-300',   bg: 'bg-blue-500/8',   border: 'border-blue-500/15',   level: 97 },
    { name: 'Entity Framework',category:'Backend',  icon: '🗃️', color: 'text-indigo-300', bg: 'bg-indigo-500/8', border: 'border-indigo-500/15', level: 95 },
    { name: 'MediatR',        category: 'Backend',  icon: '⚡', color: 'text-yellow-300', bg: 'bg-yellow-500/8', border: 'border-yellow-500/15', level: 90 },
    { name: 'SignalR',        category: 'Backend',  icon: '📡', color: 'text-green-300',  bg: 'bg-green-500/8',  border: 'border-green-500/15',  level: 88 },
    { name: 'REST APIs',      category: 'Backend',  icon: '🔗', color: 'text-cyan-300',   bg: 'bg-cyan-500/8',   border: 'border-cyan-500/15',   level: 99 },
    { name: 'gRPC',           category: 'Backend',  icon: '🚀', color: 'text-violet-300', bg: 'bg-violet-500/8', border: 'border-violet-500/15', level: 82 },
    { name: 'Angular',        category: 'Frontend', icon: '🅰️', color: 'text-red-300',    bg: 'bg-red-500/8',    border: 'border-red-500/15',    level: 94 },
    { name: 'Vue.js',         category: 'Frontend', icon: '💚', color: 'text-emerald-300',bg: 'bg-emerald-500/8',border: 'border-emerald-500/15',level: 90 },
    { name: 'TypeScript',     category: 'Frontend', icon: '🔵', color: 'text-blue-300',   bg: 'bg-blue-500/8',   border: 'border-blue-500/15',   level: 96 },
    { name: 'RxJS',           category: 'Frontend', icon: '🔄', color: 'text-pink-300',   bg: 'bg-pink-500/8',   border: 'border-pink-500/15',   level: 88 },
    { name: 'Tailwind CSS',   category: 'Frontend', icon: '🎨', color: 'text-sky-300',    bg: 'bg-sky-500/8',    border: 'border-sky-500/15',    level: 92 },
    { name: 'HTML/CSS',       category: 'Frontend', icon: '🖼️', color: 'text-orange-300', bg: 'bg-orange-500/8', border: 'border-orange-500/15', level: 95 },
    { name: 'SQL Server',     category: 'Database', icon: '🗄️', color: 'text-red-300',    bg: 'bg-red-500/8',    border: 'border-red-500/15',    level: 97 },
    { name: 'PostgreSQL',     category: 'Database', icon: '🐘', color: 'text-blue-300',   bg: 'bg-blue-500/8',   border: 'border-blue-500/15',   level: 90 },
    { name: 'MySQL',          category: 'Database', icon: '🐬', color: 'text-cyan-300',   bg: 'bg-cyan-500/8',   border: 'border-cyan-500/15',   level: 88 },
    { name: 'Redis',          category: 'Database', icon: '⚡', color: 'text-red-300',    bg: 'bg-red-500/8',    border: 'border-red-500/15',    level: 84 },
    { name: 'MongoDB',        category: 'Database', icon: '🍃', color: 'text-green-300',  bg: 'bg-green-500/8',  border: 'border-green-500/15',  level: 78 },
    { name: 'Microsoft Azure',category: 'Cloud',    icon: '☁️', color: 'text-sky-300',    bg: 'bg-sky-500/8',    border: 'border-sky-500/15',    level: 92 },
    { name: 'Azure DevOps',   category: 'Cloud',    icon: '🔧', color: 'text-blue-300',   bg: 'bg-blue-500/8',   border: 'border-blue-500/15',   level: 90 },
    { name: 'Docker',         category: 'Cloud',    icon: '🐳', color: 'text-blue-300',   bg: 'bg-blue-500/8',   border: 'border-blue-500/15',   level: 88 },
    { name: 'Kubernetes',     category: 'Cloud',    icon: '⎈', color: 'text-cyan-300',   bg: 'bg-cyan-500/8',   border: 'border-cyan-500/15',   level: 78 },
    { name: 'GitHub Actions', category: 'Cloud',    icon: '⚙️', color: 'text-violet-300', bg: 'bg-violet-500/8', border: 'border-violet-500/15', level: 86 },
    { name: 'Terraform',      category: 'Cloud',    icon: '🏗️', color: 'text-purple-300', bg: 'bg-purple-500/8', border: 'border-purple-500/15', level: 72 },
  ];

  activeCategory = signal<Category>('All');

  filteredTechnologies = computed(() =>
    this.activeCategory() === 'All'
      ? this.technologies
      : this.technologies.filter(t => t.category === this.activeCategory())
  );

  setCategory(cat: Category): void {
    this.activeCategory.set(cat);
  }

  isActive(cat: Category): boolean {
    return this.activeCategory() === cat;
  }
}
