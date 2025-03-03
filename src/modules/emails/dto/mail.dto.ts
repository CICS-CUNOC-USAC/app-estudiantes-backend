import { IsEmail, IsNotEmpty, MaxLength } from "class-validator";

export class MailDto {
    @IsNotEmpty()
    @IsEmail()
    to: string;

    @IsNotEmpty()
    @MaxLength(255)
    subject: string;

    @IsNotEmpty()
    text: string;
}