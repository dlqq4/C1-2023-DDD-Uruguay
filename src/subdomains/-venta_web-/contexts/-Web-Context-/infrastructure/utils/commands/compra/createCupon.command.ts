
import { IsNumber, IsString } from "class-validator";
import { ICreateCuponMethod } from "../../../../domain/interfaces/commands/compra/createCupon.command";
import { ApiProperty } from "@nestjs/swagger";


export class ICreateCuponCommand implements ICreateCuponMethod{
    
    @ApiProperty({   
        example:'8ec4036e-5abb-43e5-bb4b-0e3fe37cdd1b',
        description:'El identificador único del Cupón',
    })
    @IsString()
    idCupon: string;

    @ApiProperty({   
        example: 17032023,
        description:'La fecha de cuando se creó el cupón',
    })
    @IsNumber()
    dateCreateCupon: number;

    @ApiProperty({   
        example: 20,
        description:'El valor del porcentaje para el descuento',
    })
    @IsNumber()
    porcentajeCupon: number;

                    
}