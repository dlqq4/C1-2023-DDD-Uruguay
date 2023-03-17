import { IsUUID } from "class-validator";
import { IObtenerClienteMethod } from "../../../domain/interfaces/commands";
import { ApiProperty } from "@nestjs/swagger";


export class IObtenerClienteCommand implements IObtenerClienteMethod{


    @ApiProperty({   
        example:'720e87b1-bfb2-47d5-a1c8-ba51bc989b89',
        description:'El identificador único del Cliente',
    })
    @IsUUID()
    idCliente?: string;
    
                  
}

