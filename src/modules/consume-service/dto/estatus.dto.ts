export class EstatusDto {

    codigo: number;
    mensaje: string;

    constructor(data: any) {
        console.log('Constructor de estado', data);
        this.codigo = Number(data[0].codigo[0]);
        this.mensaje = data[0].mensaje[0];
    }
}