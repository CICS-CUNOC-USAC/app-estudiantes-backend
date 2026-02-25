import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res,
  Response,
  ValidationPipe,
} from '@nestjs/common';
import { PrintService } from './print.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { PrintTemplateName } from 'src/core/print/consts';

@ApiTags('Print')
@Controller('print')
export class PrintController {
  constructor(private readonly printService: PrintService) {}

  @Get('/external-loan-receipt/:receiptId')
  getHtml(@Param('receiptId') receiptId: number) {
    const html = this.printService.getExternalReceiptRender(receiptId);

    // sending a string is enough; you can also explicitly set type('html')
    return html;
  }
}
