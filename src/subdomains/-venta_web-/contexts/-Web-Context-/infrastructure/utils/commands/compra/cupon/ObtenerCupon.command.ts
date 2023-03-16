import { IsString } from "class-validator";
import { IObtenerCuponMethod } from "src/subdomains/-venta_web-/contexts/-Web-Context-/domain";


export class IObtenerCuponCommand implements IObtenerCuponMethod{

    @IsString()
    idCupon?: string;
                
}