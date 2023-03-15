
import { IsNumber, IsUUID } from "class-validator";
import { IUpdateCostoMethod } from "src/subdomains/-venta_web-/contexts/-Web-Context-/domain/interfaces/commands/membership";

export class IUpdateCostoCommand implements IUpdateCostoMethod {
   
    @IsUUID()
    idPlan: string;

    @IsNumber()
    costoPlan: number;
    
}