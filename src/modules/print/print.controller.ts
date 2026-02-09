
import { Body, Controller, Get, Param, Post, Query, Res, Response, ValidationPipe } from "@nestjs/common";
import { PrintService } from "./print.service";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { PrintTemplateName } from "src/core/print/consts";

@ApiTags('Print')
@Controller('print')
export class PrintController {

  constructor(private readonly printService: PrintService){}

  @Get(':templateName')
  getHtml(
    @Param('templateName') templateName: PrintTemplateName,
    @Query() query: any,
  ) {
    const copies = Number(query.copies ?? 1);

    const data = {
      // used in {{#each copiesArray}} and {{#unless @last}} ...
      copiesArray: Array.from({ length: Math.max(1, copies) }, (_, i) => i + 1),

      // used for image src: {{assetsBaseUrl}}/images/...
      assetsBaseUrl: "", // or "https://your-domain.com" if you serve assets elsewhere

      // used in {{amountInWords}}
      amountInWords: "CINCUENTA QUETZALES EXACTOS",

      // used in many places: {{receipt.*}}
      receipt: {
        correlativeText: "AEIO-000123",
        issuedAt: "2026-02-07T14:30:00-06:00",

        student: {
          firstName: "Luis",
          lastName: "Monterroso",
          carnet: "20210001",
          career: { name: "Ingeniería en Sistemas" },
        },

        items: [
          {
            serviceNameSnapshot: "Inscripción Semestre 1",
            quantity: 1,
            unitPrice: 50.0,
            lineTotal: 50.0,
          },
          {
            serviceNameSnapshot: "Carné / Reposición",
            quantity: 1,
            unitPrice: 10.0,
            lineTotal: 10.0,
          },
        ],

        total: 60.0,
      },
    };

    const html = this.printService.render(templateName, data);

    // sending a string is enough; you can also explicitly set type('html')
    return html
  }
}
