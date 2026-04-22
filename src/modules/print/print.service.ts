import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import * as Handlebars from 'handlebars';
import { readFileSync } from 'fs';
import {
  PRINT_TEMPLATES_NAMES,
  PrintTemplateName,
} from 'src/core/print/consts';
import { PRINT_TEMPLATE_PATHS } from 'src/core/print/templates.registry';
import { registerPrintHelpersOnce } from 'src/core/print/templates/helpers';
import { LibraryReceiptModel } from '../library/entities/library_receipt.model';
import { ModelClass } from 'objection';

@Injectable()
export class PrintService {
  private readonly cache = new Map<
    PrintTemplateName,
    Handlebars.TemplateDelegate
  >();

  constructor(
    @Inject(LibraryReceiptModel.name)
    private libraryReceiptModel: ModelClass<LibraryReceiptModel>,
  ) {}

  async getExternalReceiptRender(receiptId: number): Promise<string> {
    const foundReceipt = await this.libraryReceiptModel
      .query()
      .findById(receiptId)
      .withGraphFetched('library_reference.book');

    if (!foundReceipt) {
      throw new NotFoundException('Prestamo externo no encontrado');
    }

    const templateData = {
      copiesArray: [
        {
          frontend_url: 'https://cics.cunoc.edu.gt/estudiantes',
          receipt: {
            correlativeText: `Biblioteca-${foundReceipt.id}`,
            issuedAt: foundReceipt.created_at,
            ...foundReceipt,
          },
        },
      ],
    };

    return this.render(
      PRINT_TEMPLATES_NAMES.EXTERNAL_LOAN_RECEIPT,
      templateData,
    );
  }

  async getReturnedReceiptRender(receiptId: number): Promise<string> {
    const foundReceipt = await this.libraryReceiptModel
      .query()
      .findById(receiptId)
      .withGraphFetched('library_reference.book');

    if (!foundReceipt) {
      throw new NotFoundException('Prestamo externo no encontrado');
    }

    const createdAt = new Date(foundReceipt.created_at);
    const returnedAt = new Date(foundReceipt.returned_at);
    const loanDays = Math.ceil(
      (returnedAt.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24),
    );

    const templateData = {
      copiesArray: [
        {
          frontend_url: 'https://cics.cunoc.edu.gt/estudiantes',
          receipt: {
            correlativeText: `Biblioteca-${foundReceipt.id}`,
            issuedAt: foundReceipt.returned_at,
            loanDays,
            ...foundReceipt,
          },
        },
      ],
    };

    return this.render(
      PRINT_TEMPLATES_NAMES.RETURNED_LOAN_RECEIPT,
      templateData,
    );
  }

  render(templateName: PrintTemplateName, data: unknown): string {
    registerPrintHelpersOnce();

    const tpl = this.getCompiled(templateName);
    return tpl(data);
  }

  private getCompiled(templateName: PrintTemplateName) {
    const cached = this.cache.get(templateName);
    if (cached) return cached;

    const path = PRINT_TEMPLATE_PATHS[templateName];
    if (!path)
      throw new NotFoundException(`Plantilla desconocida: ${templateName}`);

    const source = readFileSync(path, 'utf8');
    const compiled = Handlebars.compile(source);

    this.cache.set(templateName, compiled);
    return compiled;
  }
}
