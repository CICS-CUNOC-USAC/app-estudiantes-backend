import { Controller, Get, Param } from '@nestjs/common';
import { PrintService } from './print.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { PrintTemplateName } from 'src/core/print/consts';

@ApiTags('Print')
@Controller('print')
export class PrintController {
  constructor(private readonly printService: PrintService) {}

  @Get('/external-loan-receipt/:receiptId')
  getHtmlExternalLoan(@Param('receiptId') receiptId: number) {
    const html = this.printService.getExternalReceiptRender(receiptId);

    return html;
  }

  @Get('/returned-loan-receipt/:receiptId')
  getHtmlReturnedLoan(@Param('receiptId') receiptId: number) {
    const html = this.printService.getReturnedReceiptRender(receiptId);

    return html;
  }
}
