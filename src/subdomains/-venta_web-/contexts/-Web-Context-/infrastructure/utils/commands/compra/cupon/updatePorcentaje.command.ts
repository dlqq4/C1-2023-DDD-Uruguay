import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { IUpdatePorcentajeMethod } from "src/subdomains/-venta_web-/contexts/-Web-Context-/domain";

export class IUpdatePorcentajeCommand implements IUpdatePorcentajeMethod{


    @ApiProperty({   
        example:'720e87b1-bfb2-47d5-a1c8-ba51bc989b89',
        description:'El identificador único del Cupón',
    })
    @IsString()
    idCupon: string;

    @ApiProperty({   
        example:'720e87b1-bfb2-47d5-a1c8-ba51bc989b89',
        description:'El valor del porcentaje del Cupón',
    })
    @IsNumber()
    porcentajeCupon: number;
    
}