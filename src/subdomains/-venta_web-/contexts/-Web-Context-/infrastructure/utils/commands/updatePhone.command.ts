import { IsString, IsUUID } from "class-validator";
import { IUpdatePhoneMethod } from "../../../domain/interfaces";
import { ApiProperty } from "@nestjs/swagger";

export class IUpdatePhoneCommand implements IUpdatePhoneMethod {


    @ApiProperty({   
        example:'720e87b1-bfb2-47d5-a1c8-ba51bc989b89',
        description:'El identificador único del Cliente',
    })
    @IsUUID()
    idCliente: string;

    @ApiProperty({   
        example: '091364417',
        description:'El teléfono de contacto del Cliente',
    })
    @IsString()
    phoneCliente: string;
    
}