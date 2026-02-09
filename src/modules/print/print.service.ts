
import { Injectable, NotFoundException } from '@nestjs/common';
import * as Handlebars from 'handlebars';
import { readFileSync } from 'fs';
import { PrintTemplateName } from 'src/core/print/consts';
import { PRINT_TEMPLATE_PATHS } from 'src/core/print/templates.registry';
import { registerPrintHelpersOnce } from 'src/core/print/templates/helpers';

@Injectable()
export class PrintService {
  private readonly cache = new Map<PrintTemplateName, Handlebars.TemplateDelegate>();

  constructor() {}

  render(templateName: PrintTemplateName, data: unknown): string {
    registerPrintHelpersOnce()

    const tpl = this.getCompiled(templateName);
    return tpl(data);
  }

  private getCompiled(templateName: PrintTemplateName) {
    const cached = this.cache.get(templateName);
    if (cached) return cached;

    const path = PRINT_TEMPLATE_PATHS[templateName];
    if (!path) throw new NotFoundException(`Unknown print template: ${templateName}`);

    const source = readFileSync(path, 'utf8');
    const compiled = Handlebars.compile(source);

    this.cache.set(templateName, compiled);
    return compiled;
  }
}
