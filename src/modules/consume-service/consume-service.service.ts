import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { parseStringPromise } from 'xml2js';
import { readFile } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class ConsumeService {
  constructor(private readonly httpService: HttpService) {}

  async getExternalData(url: string): Promise<any> {
    const response = await lastValueFrom(this.httpService.get(url));
    return response.data;
  }

  async parseXMLToJSON(xml: string): Promise<any> {
    const jsonData = await parseStringPromise(xml);
    return jsonData;
  }

  async getDummyXmlData(): Promise<any> {
    const filePath = join(__dirname, '../../../../../cics/script/dummyxml.xml');
    const xmlData = await readFile(filePath, 'utf-8');
    return this.parseXMLToJSON(xmlData);
  }

}