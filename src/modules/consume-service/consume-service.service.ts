import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { parseStringPromise } from 'xml2js';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { wrap } from 'module';

@Injectable()
export class ConsumeService {
  constructor(private readonly httpService: HttpService) {}

  /**
   * @param url URL de la cual se desea recuperar datos
   * @description Este método recupera datos de una URL externa utilizando el HttpService.
   * @returns La información de la respuesta de la URL externa.
   */
  async getExternalData(url: string): Promise<any> {
    const response = await lastValueFrom(this.httpService.get(url));
    return response.data;
  }

  /**
   * @param xml XML que se desea convertir a JSON
   * @description Este método convierte un XML a JSON utilizando la librería xml2js.
   * @returns El JSON resultante de la conversión del XML.
   */
  async parseXMLToJSON(xml: string): Promise<any> {
    const wrappedXml = `<datos>${xml}</datos>`; // Envolvemos en un elemento raíz sino el parser no obtiene toda la información
    const jsonData = await parseStringPromise(wrappedXml);
    return jsonData;
  }

  /**
   * @returns El JSON resultante de la conversión del XML de prueba.
   * @description Este método lee un archivo XML de prueba y lo convierte a JSON.
   */
  async getDummyXmlData(): Promise<any> {
    const filePath = join(__dirname, '../../../../test/dummyxml.xml');
    const xmlData = await readFile(filePath, 'utf-8');
    return this.parseXMLToJSON(xmlData);
  }

}