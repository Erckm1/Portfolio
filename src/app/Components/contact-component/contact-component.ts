import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmailService, ContactForm } from '../../services/email.service';

@Component({
  selector: 'app-contact-component',
  imports: [FormsModule],
  templateUrl: './contact-component.html',
  styleUrl: './contact-component.css',
})
export class ContactComponent {
  private emailService = inject(EmailService);

  form = signal<ContactForm>({ name: '', email: '', subject: '', message: '' });
  submitted = signal(false);
  loading   = signal(false);
  error     = signal(false);

  updateField(field: keyof ContactForm, value: string): void {
    this.form.update(f => ({ ...f, [field]: value }));
  }

  async handleSubmit(): Promise<void> {
    this.loading.set(true);
    this.error.set(false);
    try {
      await this.emailService.send(this.form());
      this.submitted.set(true);
    } catch {
      this.error.set(true);
    } finally {
      this.loading.set(false);
    }
  }

  reset(): void {
    this.submitted.set(false);
    this.error.set(false);
    this.form.set({ name: '', email: '', subject: '', message: '' });
  }

  readonly inputClass = 'w-full px-4 py-3 rounded-xl border border-[var(--glass-border)] bg-[var(--input-background)] text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all duration-200';
}
