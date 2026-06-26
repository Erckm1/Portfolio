import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { environment } from '../../environments/environment';

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class EmailService {
  private readonly serviceId  = environment.emailjs.serviceId;
  private readonly templateId = environment.emailjs.templateId;
  private readonly publicKey  = environment.emailjs.publicKey;

  send(form: ContactForm): Promise<void> {
    return emailjs.send(
      this.serviceId,
      this.templateId,
      {
        from_name:  form.name,
        from_email: form.email,
        subject:    form.subject,
        message:    form.message,
      },
      { publicKey: this.publicKey }
    ).then(() => undefined);
  }
}
