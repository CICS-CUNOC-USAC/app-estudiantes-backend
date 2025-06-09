import { InscritoDto } from "./inscrito.dto";
import { EstatusDto } from "./estatus.dto";
import { EstudianteDto } from "./estudiante.dto";
import { UnauthorizedException } from "@nestjs/common";

export class RycaUserServiceResponseDto {

    estatus: EstatusDto;
    estudiante?: EstudianteDto;
    inscrito?: InscritoDto;

    constructor(data: any) {
        this.estatus = new EstatusDto(data.datos.estatus);
        if(this.estatus.codigo == 1){ // Si el estatus es 1, significa que la consulta fue exitosa
            this.estudiante = new EstudianteDto(data.datos.estudiante);
            this.inscrito = new InscritoDto(data.datos.inscrito);
        }else{
            throw new UnauthorizedException(this.estatus.mensaje); // Si el estatus no es 1, lanzamos una excepción con el mensaje de error
        }
    }
}