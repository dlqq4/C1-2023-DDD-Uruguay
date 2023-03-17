import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { IUpdateCostoMethod } from "src/subdomains/-venta_web-/contexts/-Web-Context-/domain";


export class IUpdateCostoCommand implements IUpdateCostoMethod {


    @ApiProperty({   
        example:'720e87b1-bfb2-47d5-a1c8-ba51bc989b89',
        description:'El identificador único del Curso',
    })
    @IsString()
    idCurso: string;


    @ApiProperty({   
        example: 500,
        description:'El valor del costo del Curso',
    })
    @IsNumber()
    costoCurso: number;
    
}