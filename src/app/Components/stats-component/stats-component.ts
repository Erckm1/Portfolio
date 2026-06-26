import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { InViewDirective } from '../../directives/in-view.directive';

interface Stat {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

@Component({
  selector: 'app-stats-component',
  imports: [InViewDirective],
  templateUrl: './stats-component.html',
  styleUrl: './stats-component.css',
})
export class StatsComponent {
  animationStarted = false;

  stats: Stat[] = [
    { value: 8,   suffix: '+', label: 'Years of Experience', description: 'Enterprise software development' },
    { value: 50,  suffix: '+', label: 'Projects Delivered',  description: 'Across multiple industries' },
    { value: 120, suffix: '+', label: 'APIs Developed',      description: 'REST, GraphQL, gRPC' },
    { value: 5,   suffix: '',  label: 'Certifications',      description: 'Azure, Security & Agile' },
  ];

  counts = signal([0, 0, 0, 0]);

  onInView(): void {
    if (this.animationStarted) return;
    this.animationStarted = true;
    this.stats.forEach((stat, index) => this.animateCount(stat.value, 1800, index));
  }

  private animateCount(target: number, duration: number, index: number): void {
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = [...this.counts()];
      current[index] = Math.floor(eased * target);
      this.counts.set(current);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
}
