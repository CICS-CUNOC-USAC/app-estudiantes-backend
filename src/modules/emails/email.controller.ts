import { Body, Controller, Post, Response, ValidationPipe } from "@nestjs/common";
import { EmailService } from "./email.service";
import { MailDto } from "./dto/mail.dto";
import { ApiBody, ApiTags } from "@nestjs/swagger";

@ApiTags('Email')
@Controller('email')
export class EmailController {

    constructor(private readonly emailService: EmailService){}

    /**
     * Método de uso general para enviar correos con cuerpo, asunto y destinatario personalizado
     * @param body Cuerpo con las propiedades báscias para enviar el correo personalizado
     * @param res Response de petición realizada
     * @returns 
     */
    @Post('send')
    @ApiBody({type: MailDto})
    async sendMail(@Body(new ValidationPipe({transform: true})) body: MailDto, @Response() res){
        const state = await this.emailService.sendMail(body);
        return res.send(state);
    }

}