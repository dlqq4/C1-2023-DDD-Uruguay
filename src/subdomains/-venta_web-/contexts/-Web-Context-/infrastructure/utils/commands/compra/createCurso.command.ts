
import { IsNumber, IsString } from "class-validator";
import { ICreateCursoMethod } from "../../../../domain/interfaces";


export class ICreateCursoCommand implements ICreateCursoMethod{

    @IsString()
    idCurso: string;

    @IsString()
    nombreCurso: string;

    @IsString()
    nombreTeacher: string;

    @IsNumber()
    costoCurso: number;

    //@IsUUID()
                    
}