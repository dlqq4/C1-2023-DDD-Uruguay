import { ApiProperty } from "@nestjs/swagger";
import { ICreateClienteMethod } from "../../../domain";
import { IsString } from 'class-validator';

export class CreateClienteCommand implements ICreateClienteMethod{

    @ApiProperty({   
        example:'720e87b1-bfb2-47d5-a1c8-ba51bc989b89',
        description:'El identificador único del Cliente',
    })
    @IsString()
    idCliente?: string;

    @ApiProperty({   
        example:'Homero Simpson',
        description:'El nombre completo del Cliente',
    })
    @IsString()
    nombreCliente: string;

    @ApiProperty({   
        example:'09136447',
        description:'El teléfono de contacto del Cliente',
    })
    @IsString()
    phoneCliente: string 

    @ApiProperty({   
        example:'dlqq@outlook.es',
        description:'El email del Cliente',
    })
    @IsString()
    emailCliente: string;
             
}