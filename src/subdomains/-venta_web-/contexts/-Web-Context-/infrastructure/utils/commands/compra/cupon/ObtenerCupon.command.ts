import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { IObtenerCuponMethod } from "src/subdomains/-venta_web-/contexts/-Web-Context-/domain";


export class IObtenerCuponCommand implements IObtenerCuponMethod{

    @ApiProperty({   
        example:'720e87b1-bfb2-47d5-a1c8-ba51bc989b89',
        description:'El identificador único del Cupón',
    })
    @IsString()
    idCupon?: string;
                
}