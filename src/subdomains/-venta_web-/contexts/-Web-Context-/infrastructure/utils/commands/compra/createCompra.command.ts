import { IsUUID } from "class-validator";
import { ICreateCompraMethod } from "../../../../domain/interfaces";


export class ICreateCompraCommand implements ICreateCompraMethod {

    @IsUUID()
    idCompra? : string;

    @IsUUID()
    idCliente? : string;

    @IsUUID()
    idCurso? : string;
    
    @IsUUID()
    idCupon? : string;

    
 
 
}