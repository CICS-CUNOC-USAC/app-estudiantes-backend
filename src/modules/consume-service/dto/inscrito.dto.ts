export class InscritoDto {
    
    codigo: string;
    carrera: string;

    constructor(data: any) {
        this.codigo  = data[0].carrera[0].codigo[0];
        this.carrera = data[0].carrera[0].carrera[0];
    }

}