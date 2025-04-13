export class EstudianteDto {

    carne: string;
    nombres: string;
    apellidos: string;
    completos: string;
    correo: string;

    constructor(data: any) {
        console.log('Constructor de estudiante', data);
        this.carne = data[0].carne[0];
        this.nombres = data[0].nombres[0];
        this.apellidos = data[0].apellidos[0];
        this.completos = data[0].completos[0];
        this.correo = data[0].correo[0];
    }

}