import { Component, signal, effect } from '@angular/core';
import { NavbarComponent }         from './Components/navbar-component/navbar-component';
import { HeroComponent }           from './Components/hero-component/hero-component';
import { StatsComponent }          from './Components/stats-component/stats-component';
import { ExpertiseComponent }      from './Components/expertise-component/expertise-component';
import { TechStackComponent }      from './Components/tech-stack-component/tech-stack-component';
import { ProjectsComponent }       from './Components/projects-component/projects-component';
import { ExperienceComponent }     from './Components/experience-component/experience-component';
import { CertificationsComponent } from './Components/certifications-component/certifications-component';
import { ContactComponent }        from './Components/contact-component/contact-component';
import { FooterComponent }         from './Components/footer-component/footer-component';

@Component({
  selector: 'app-root',
  imports: [
    NavbarComponent, HeroComponent, StatsComponent, ExpertiseComponent,
    TechStackComponent, ProjectsComponent, ExperienceComponent,
    CertificationsComponent, ContactComponent, FooterComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  darkMode = signal(true);

  constructor() {
    // Apply dark class on init
    document.documentElement.classList.add('dark');

    effect(() => {
      document.documentElement.classList.toggle('dark', this.darkMode());
    });
  }

  toggleDarkMode(): void {
    this.darkMode.update(v => !v);
  }
}
