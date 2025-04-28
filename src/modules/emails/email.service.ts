import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { MailDto } from './dto/mail.dto';

@Injectable()
export class EmailService {
  constructor(private readonly mailService: MailerService) {}

  /**
   * Método que se utiliza para enviar un correo personalizado, acepta un objeto con las propiedades necesarias para enviar un correo
   * @param mailDto DTO para enviar correos personalizados
   * @returns El estado del correo enviado
   */
  async sendMail(mailDto: MailDto) {
    return await this.mailService.sendMail({ ...mailDto });
  }
}
