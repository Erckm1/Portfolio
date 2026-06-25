import { Component } from '@angular/core';

interface NavLink { label: string; href: string; }
interface TechLink { label: string; href: string; }

@Component({
  selector: 'app-footer-component',
  imports: [],
  templateUrl: './footer-component.html',
  styleUrl: './footer-component.css',
})
export class FooterComponent {
  readonly navLinks: NavLink[] = [
    { label: 'About',          href: '#about'          },
    { label: 'Expertise',      href: '#expertise'      },
    { label: 'Projects',       href: '#projects'       },
    { label: 'Experience',     href: '#experience'     },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Contact',        href: '#contact'        },
  ];

  readonly techLinks: TechLink[] = [
    { label: '.NET / C#',          href: '#tech' },
    { label: 'Angular',            href: '#tech' },
    { label: 'Azure Cloud',        href: '#tech' },
    { label: 'SQL Server',         href: '#tech' },
    { label: 'Microservices',      href: '#tech' },
    { label: 'Clean Architecture', href: '#tech' },
  ];

  scrollTop(): void { window.scrollTo({ top: 0, behavior: 'smooth' }); }

  handleNav(href: string): void {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
}
