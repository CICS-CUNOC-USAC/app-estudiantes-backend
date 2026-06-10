import { BadRequestException, Injectable } from '@nestjs/common';
import { PDFParse } from 'pdf-parse';

export interface ParsedCourse {
  code: string;
  name: string;
  grade: number | null;
  approvedAt: Date;
}

@Injectable()
export class CertificateParserService {
  private readonly courseLineRegex =
    /^([0-9A-Z]+)\s+(.+?)\s+(EQ|\d+)\s+(\d{4}-\d{2}-\d{2})$/i;

  async parseCertificate(pdfBuffer: Buffer): Promise<ParsedCourse[]> {
    let rawText = '';
    const pdfDataAsUint8 = Uint8Array.from(pdfBuffer);
    const parser = new PDFParse({ data: pdfDataAsUint8 });

    try {
      const pdfData = await parser.getText();
      rawText = pdfData.text || '';
    } catch {
      throw new BadRequestException('No se pudo procesar el PDF');
    } finally {
      await parser.destroy().catch(() => undefined);
    }

    const lines = rawText.replace(/\r/g, '').split('\n');
    const startIndex = lines.findIndex((line) =>
      /CODIGO\s+NOMBRE\s+DEL\s+CURSO\s+CALIFICACION\s+FECHA/i.test(
        line.replace(/\s+/g, ' ').trim(),
      ),
    );
    const endIndex = lines.findIndex(
      (line, index) => index > startIndex && /ULTIMA\s+LINEA/i.test(line),
    );

    if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
      throw new BadRequestException('Formato de certificacion no reconocido');
    }

    const parsedCourses: ParsedCourse[] = [];
    for (const line of lines.slice(startIndex + 1, endIndex)) {
      const trimmed = line.trim();
      if (!trimmed) {
        continue;
      }

      const match = trimmed.match(this.courseLineRegex);
      if (!match) {
        continue;
      }

      const [, code, rawName, rawGrade, rawDate] = match;
      const grade = rawGrade.toUpperCase() === 'EQ' ? null : Number(rawGrade);
      if (grade !== null && Number.isNaN(grade)) {
        continue;
      }

      const approvedAt = new Date(`${rawDate}T00:00:00.000Z`);
      if (Number.isNaN(approvedAt.getTime())) {
        continue;
      }

      parsedCourses.push({
        code,
        name: rawName.replace(/\s+/g, ' ').trim(),
        grade,
        approvedAt,
      });
    }

    return parsedCourses;
  }
}
