import { Component, inject, signal, OnInit } from '@angular/core';
import { GithubService } from '../../services/github.service';
import { environment } from '../../../environments/environment';

interface TechBadge {
  label: string;
  border: string;
  textClass: string;
  dotClass: string;
  side: 'left' | 'right';
  xValue: string;
  yValue: string;
  background: string;
}

interface CodeLine {
  text: string;
  color: string;
}

@Component({
  selector: 'app-hero-component',
  imports: [],
  templateUrl: './hero-component.html',
  styleUrl: './hero-component.css',
})
export class HeroComponent implements OnInit {
  private githubService = inject(GithubService);

  visible = signal(false);

  techBadges: TechBadge[] = [
    { label: '.NET 8',    border: 'border-violet-500/20', textClass: 'text-violet-300', dotClass: 'bg-violet-300',  side: 'left',  xValue: '5%',  yValue: '30%', background: 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(109,40,217,0.1))' },
    { label: 'C#',        border: 'border-indigo-500/20', textClass: 'text-indigo-300', dotClass: 'bg-indigo-300',  side: 'left',  xValue: '8%',  yValue: '55%', background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(67,56,202,0.1))' },
    { label: 'Azure',     border: 'border-sky-500/20',    textClass: 'text-sky-300',    dotClass: 'bg-sky-300',     side: 'left',  xValue: '3%',  yValue: '72%', background: 'linear-gradient(135deg, rgba(14,165,233,0.2), rgba(2,132,199,0.1))' },
    { label: 'Angular',   border: 'border-red-500/20',    textClass: 'text-red-300',    dotClass: 'bg-red-300',     side: 'right', xValue: '5%',  yValue: '28%', background: 'linear-gradient(135deg, rgba(239,68,68,0.2), rgba(185,28,28,0.1))' },
    { label: 'SQL Server',border: 'border-cyan-500/20',   textClass: 'text-cyan-300',   dotClass: 'bg-cyan-300',    side: 'right', xValue: '7%',  yValue: '50%', background: 'linear-gradient(135deg, rgba(6,182,212,0.2), rgba(8,145,178,0.1))' },
    { label: 'Docker',    border: 'border-blue-500/20',   textClass: 'text-blue-300',   dotClass: 'bg-blue-300',    side: 'right', xValue: '4%',  yValue: '70%', background: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(29,78,216,0.1))' },
  ];

  codeLines: CodeLine[] = [
    { text: 'public class OrderService : IOrderService {', color: 'text-slate-300' },
    { text: '  private readonly IMediator _mediator;',     color: 'text-slate-400' },
    { text: '  public async Task<Result> CreateAsync(',    color: 'text-slate-300' },
    { text: '    CreateOrderCommand cmd) {',               color: 'text-slate-400' },
    { text: '    return await _mediator.Send(cmd);',       color: 'text-indigo-300' },
    { text: '  }',                                         color: 'text-slate-400' },
    { text: '}',                                           color: 'text-slate-300' },
  ];

  contributionWeeks = signal<number[][]>([]);
  totalContributions = signal(0);
  readonly contributionLevels = ['bg-slate-800/60', 'bg-indigo-900/60', 'bg-indigo-600/60', 'bg-indigo-400/80'];

  ngOnInit(): void {
    setTimeout(() => this.visible.set(true), 100);

    this.githubService.getContributions(environment.github.username).subscribe(result => {
      this.contributionWeeks.set(result.weeks);
      this.totalContributions.set(result.total);
    });
  }

  getBadgeStyle(badge: TechBadge): Record<string, string> {
    return {
      left:       badge.side === 'left'  ? badge.xValue : '',
      right:      badge.side === 'right' ? badge.xValue : '',
      top:        badge.yValue,
      background: badge.background,
    };
  }

  get leftColClass(): string {
    return `flex flex-col gap-7 transition-all duration-1000 ${this.visible() ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`;
  }

  get rightColClass(): string {
    return `flex flex-col gap-5 transition-all duration-1000 delay-300 ${this.visible() ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`;
  }

  scrollToSection(selector: string): void {
    const el = document.querySelector(selector);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
}
