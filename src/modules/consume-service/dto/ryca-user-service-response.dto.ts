import { InscritoDto } from "./inscrito.dto";
import { EstatusDto } from "./estatus.dto";
import { EstudianteDto } from "./estudiante.dto";

export class RycaUserServiceResponseDto {

    estatus: EstatusDto;
    estudiante?: EstudianteDto;
    inscrito?: InscritoDto;

    constructor(data: any) {
        this.estatus = new EstatusDto(data.datos.estatus);
        if(this.estatus.codigo){
            this.estudiante = new EstudianteDto(data.datos.estudiante);
            this.inscrito = new InscritoDto(data.datos.inscrito);
        }
    }
}