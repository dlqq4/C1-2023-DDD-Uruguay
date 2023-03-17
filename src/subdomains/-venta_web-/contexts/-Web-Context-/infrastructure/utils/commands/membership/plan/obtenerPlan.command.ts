
import { IsString, IsUUID } from "class-validator";
import { IObtenerPlanMethod } from "src/subdomains/-venta_web-/contexts/-Web-Context-/domain/interfaces/commands/membership";


export class IObtenerPlanCommand implements IObtenerPlanMethod {

    @IsUUID()
    idPlan?: string;
    
         
}