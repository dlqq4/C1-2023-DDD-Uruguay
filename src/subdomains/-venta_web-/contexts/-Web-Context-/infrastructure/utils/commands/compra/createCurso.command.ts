
import { IsNumber, IsString } from "class-validator";
import { ICreateCursoMethod } from "../../../../domain/interfaces";
import { ApiProperty } from "@nestjs/swagger";


export class ICreateCursoCommand implements ICreateCursoMethod{


    @ApiProperty({   
        example:'8ec4036e-5abb-43e5-bb4b-0e3fe37cdd1b',
        description:'El identificador único del Curso',
    })
    @IsString()
    idCurso: string;


    @ApiProperty({   
        example:'Master en TypeScrip',
        description:'El nombre del Curso',
    })
    @IsString()
    nombreCurso: string;

    @ApiProperty({   
        example:'Pablo Marmol',
        description:'El nombre del Profesor que dicta el curso',
    })
    @IsString()
    nombreTeacher: string;

    @ApiProperty({   
        example:'450',
        description:'El valor del costo del Curso',
    })
    @IsNumber()
    costoCurso: number;

    //@IsUUID()
                    
}