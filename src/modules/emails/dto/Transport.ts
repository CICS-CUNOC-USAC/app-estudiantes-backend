import dotenv from 'dotenv';

export class Transport {
  host: string;
  auth: {
    user: string;
    pass: string;
  };

  constructor() {
    dotenv.config();
    this.host = process.env.EMAIL_HOST;
    this.auth = {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    };
  }

  get configuration() {
    return {
      host: this.host,
      auth: {
        user: this.auth.user,
        pass: this.auth.pass,
      },
    };
  }
}
