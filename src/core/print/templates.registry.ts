import { join } from 'path';
import { PRINT_TEMPLATES_NAMES, PrintTemplateName } from './consts';

export const PRINT_TEMPLATE_PATHS: Record<PrintTemplateName, string> = {
  [PRINT_TEMPLATES_NAMES.EXTERNAL_LOAN_RECEIPT]: join(
    process.cwd(),
    'src',
    'core',
    'print',
    'templates',
    'external-loan-receipt.hbs',
  ),
};
