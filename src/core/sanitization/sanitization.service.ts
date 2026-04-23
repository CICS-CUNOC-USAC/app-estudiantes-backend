import { BadRequestException, Injectable } from '@nestjs/common';
import { ProfanityEngine } from '@coffeeandfun/google-profanity-words';
import sanitizeHtml from 'sanitize-html';
import { CUSTOM_PROFANITY_WORDS } from './profanity-custom-words.config';

@Injectable()
export class SanitizationService {
  private static readonly MAX_COMMENT_LENGTH = 1000;
  private static readonly EXCESSIVE_REPETITION_REGEX = /(.)\1{5,}/u;
  private static readonly URL_REGEX = /(https?:\/\/|www\.)/i;
  private static readonly CONTROL_CHARS_REGEX =
    /[\x00-\x1F\x7F\u200B\u200C\u200D\uFEFF\u00AD]/g;
  private readonly spanishProfanityEngine = new ProfanityEngine({
    language: 'es',
  });
  private readonly englishProfanityEngine = new ProfanityEngine({
    language: 'en',
  });
  private readonly customProfanityWords = CUSTOM_PROFANITY_WORDS.map((word) =>
    word.normalize('NFC').toLowerCase().trim(),
  ).filter((word) => word.length > 0);

  async sanitizeComment(content: string): Promise<string> {
    const plainText = this.sanitizeText(content);

    if (!plainText.length) {
      throw new BadRequestException('El comentario no puede estar vacio');
    }

    if (plainText.length > SanitizationService.MAX_COMMENT_LENGTH) {
      throw new BadRequestException(
        `El comentario no puede exceder ${SanitizationService.MAX_COMMENT_LENGTH} caracteres`,
      );
    }

    if (SanitizationService.EXCESSIVE_REPETITION_REGEX.test(plainText)) {
      throw new BadRequestException(
        'El comentario contiene caracteres repetidos en exceso',
      );
    }

    if (SanitizationService.URL_REGEX.test(plainText)) {
      throw new BadRequestException('No se permiten URLs en los comentarios');
    }

    if (await this.containsProfanity(plainText)) {
      throw new BadRequestException(
        'El comentario contiene lenguaje inapropiado',
      );
    }

    return plainText;
  }

  sanitizeStrapiPostId(strapiPostId: string): string {
    const sanitizedPostId = this.sanitizeText(strapiPostId);
    if (!sanitizedPostId.length) {
      throw new BadRequestException('El identificador del post es invalido');
    }

    return sanitizedPostId;
  }

  private sanitizeText(value: string): string {
    const safeValue = this.ensureString(value);
    const normalizedValue = safeValue.normalize('NFC');
    const trimmedValue = normalizedValue.trim();
    const cleanValue = trimmedValue.replace(
      SanitizationService.CONTROL_CHARS_REGEX,
      '',
    );

    return sanitizeHtml(cleanValue, {
      allowedTags: [],
      allowedAttributes: {},
    }).trim();
  }

  private ensureString(value: string): string {
    if (typeof value !== 'string') {
      throw new BadRequestException('El contenido del comentario es invalido');
    }

    return value;
  }

  private async containsProfanity(text: string): Promise<boolean> {
    const [hasSpanishProfanity, hasEnglishProfanity] = await Promise.all([
      this.spanishProfanityEngine.hasCurseWords(text),
      this.englishProfanityEngine.hasCurseWords(text),
    ]);

    if (hasSpanishProfanity || hasEnglishProfanity) {
      return true;
    }

    if (!this.customProfanityWords.length) {
      return false;
    }

    const normalizedText = text.normalize('NFC').toLowerCase();
    return this.customProfanityWords.some((word) =>
      this.containsWholeWord(normalizedText, word),
    );
  }

  private containsWholeWord(text: string, word: string): boolean {
    const escapedWord = this.escapeRegex(word);
    const pattern = new RegExp(
      `(^|[^\\p{L}\\p{N}_])${escapedWord}($|[^\\p{L}\\p{N}_])`,
      'u',
    );

    return pattern.test(text);
  }

  private escapeRegex(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}
