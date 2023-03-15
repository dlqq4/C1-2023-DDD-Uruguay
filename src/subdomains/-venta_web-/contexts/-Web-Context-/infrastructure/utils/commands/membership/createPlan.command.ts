import { IsNumber, IsString } from "class-validator";
import { ICreatePlanMethod } from "../../../../domain/interfaces/commands/membership";



export class ICreatePlanCommand implements ICreatePlanMethod{

    
    @IsString()
    idPlan: string;
    
    @IsString()
    nombrePlan: string;

    @IsNumber()
    dateInicioPlan: number;

    @IsNumber()
    dateFinPlan: number;

    @IsNumber()
    costoPlan: number;
                     
}