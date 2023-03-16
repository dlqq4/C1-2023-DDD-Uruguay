import { DateValueObject } from "../../value-objects/common-value-objects/date/date.value-object";
import { UuidValueObject } from "../../value-objects/common-value-objects/uuid/uuid.value-object";
import { PorcentajeValueObject } from "../../value-objects/cupon/porcentaje.value-object";

export interface ICuponDomainEntityInterface {

    idCupon? : string | UuidValueObject;
    dateCreateCupon? : number | DateValueObject;
    porcentajeCupon? : number | PorcentajeValueObject;
    

}
