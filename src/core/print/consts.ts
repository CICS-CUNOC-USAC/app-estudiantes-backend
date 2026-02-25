export const PRINT_TEMPLATES_NAMES = {
  EXTERNAL_LOAN_RECEIPT: 'external-loan-receipt',
} as const;

export type PrintTemplateName =
  (typeof PRINT_TEMPLATES_NAMES)[keyof typeof PRINT_TEMPLATES_NAMES];
