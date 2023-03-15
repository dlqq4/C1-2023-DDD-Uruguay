import { IsNumber, IsString } from "class-validator";
import { IUpdatePorcentajeMethod } from "src/subdomains/-venta_web-/contexts/-Web-Context-/domain";

export class IUpdatePorcentajeCommand implements IUpdatePorcentajeMethod{

    @IsString()
    idCupon: string;

    @IsNumber()
    porcentajeCupon: number;
    
}