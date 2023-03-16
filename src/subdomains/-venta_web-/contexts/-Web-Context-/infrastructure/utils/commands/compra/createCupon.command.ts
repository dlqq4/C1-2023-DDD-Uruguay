
import { IsNumber, IsString } from "class-validator";
import { ICreateCuponMethod } from "../../../../domain/interfaces/commands/compra/createCupon.command";


export class ICreateCuponCommand implements ICreateCuponMethod{
    
    
    @IsString()
    idCupon: string;

    @IsNumber()
    dateCreateCupon: number;

    @IsNumber()
    porcentajeCupon: number;

                    
}