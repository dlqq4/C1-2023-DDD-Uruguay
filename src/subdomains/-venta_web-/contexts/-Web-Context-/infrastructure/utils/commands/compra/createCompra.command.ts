import { IsUUID } from "class-validator";
import { ICreateCompraMethod } from "../../../../domain/interfaces";
import { ApiProperty } from "@nestjs/swagger";


export class ICreateCompraCommand implements ICreateCompraMethod {

    @ApiProperty({   
        example:'8ec4036e-5abb-43e5-bb4b-0e3fe37cdd1b',
        description:'El identificador único de la Compra',
    })
    @IsUUID()
    idCompra? : string;

    @ApiProperty({   
        example:'720e87b1-bfb2-47d5-a1c8-ba51bc989b89',
        description:'El identificador único del Cliente',
    })
    @IsUUID()
    idCliente? : string;

    @ApiProperty({   
        example:'624b4098-8f50-4116-aac1-e912220a97f5',
        description:'El identificador único del Curso',
    })
    @IsUUID()
    idCurso? : string;
    
    @ApiProperty({   
        example:'386ccb87-2084-4248-88f1-bb8b621d5c19',
        description:'El identificador único del Cupón',
    })
    @IsUUID()
    idCupon? : string;

    
 
}