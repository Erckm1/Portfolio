import { Component } from '@angular/core';

interface Certification {
  name: string;
  issuer: string;
  date: string;
  id: string;
  description: string;
  color: string;
  icon: string;
  verifyUrl: string;
}

interface ColorTokens {
  border: string;
  bg: string;
  text: string;
  badge: string;
}

@Component({
  selector: 'app-certifications-component',
  imports: [],
  templateUrl: './certifications-component.html',
  styleUrl: './certifications-component.css',
})
export class CertificationsComponent {
  readonly colorMap: Record<string, ColorTokens> = {
    sky:     { border: 'border-sky-500/20 hover:border-sky-500/40',         bg: 'bg-sky-500/8',     text: 'text-sky-300',     badge: 'bg-sky-500/15 text-sky-300'       },
    indigo:  { border: 'border-indigo-500/20 hover:border-indigo-500/40',   bg: 'bg-indigo-500/8',  text: 'text-indigo-300',  badge: 'bg-indigo-500/15 text-indigo-300' },
    violet:  { border: 'border-violet-500/20 hover:border-violet-500/40',   bg: 'bg-violet-500/8',  text: 'text-violet-300',  badge: 'bg-violet-500/15 text-violet-300' },
    red:     { border: 'border-red-500/20 hover:border-red-500/40',         bg: 'bg-red-500/8',     text: 'text-red-300',     badge: 'bg-red-500/15 text-red-300'       },
    emerald: { border: 'border-emerald-500/20 hover:border-emerald-500/40', bg: 'bg-emerald-500/8', text: 'text-emerald-300', badge: 'bg-emerald-500/15 text-emerald-300'},
  };

  readonly certifications: Certification[] = [
    { name: 'AZ-900: Azure Fundamentals',     issuer: 'Microsoft',    date: 'Nov 2022', id: 'AZ-900', description: 'Foundational knowledge of cloud services and Azure platform.',                            color: 'sky',     icon: '☁️', verifyUrl: '#' },
    { name: 'AZ-204: Azure Developer Associate', issuer: 'Microsoft', date: 'Mar 2023', id: 'AZ-204', description: 'Design, build, test and maintain cloud applications on Azure.',                          color: 'indigo',  icon: '⚡', verifyUrl: '#' },
    { name: 'AZ-104: Azure Administrator',    issuer: 'Microsoft',    date: 'Aug 2023', id: 'AZ-104', description: 'Manage Azure subscriptions, infrastructure, and cloud resources.',                       color: 'violet',  icon: '🔧', verifyUrl: '#' },
    { name: 'Certified Ethical Hacker (CEH)', issuer: 'EC-Council',   date: 'Jan 2024', id: 'CEH',    description: 'Security assessment, penetration testing, and vulnerability analysis.',                  color: 'red',     icon: '🛡️', verifyUrl: '#' },
    { name: 'Scrum Fundamentals Certified',   issuer: 'SCRUMstudy',   date: 'Jun 2021', id: 'SFC',    description: 'Agile methodology, sprint planning, and Scrum framework mastery.',                       color: 'emerald', icon: '🔄', verifyUrl: '#' },
  ];

  colors(color: string): ColorTokens {
    return this.colorMap[color];
  }
}
