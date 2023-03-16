import { DateValueObject } from "../../value-objects/common-value-objects/date/date.value-object";
import { UuidValueObject } from "../../value-objects/common-value-objects/uuid/uuid.value-object";
import { PorcentajeValueObject } from "../../value-objects/cupon/porcentaje.value-object";
import { ICuponDomainEntityInterface } from "../interfaces/i-cupon.domain-entity.interface";
import { v4 as uuidv4 } from 'uuid';

export class CuponDomainEntity implements ICuponDomainEntityInterface{

    idCupon?: string | UuidValueObject;
    dateCreateCupon?: number | DateValueObject;
    porcentajeCupon?: number | PorcentajeValueObject;

    constructor( _data? : ICuponDomainEntityInterface ){
        
        if(_data?.idCupon) this.idCupon = _data.idCupon
        
        else this.idCupon = uuidv4();

        if (_data?.porcentajeCupon) this.porcentajeCupon = _data.porcentajeCupon;

        if (_data?.dateCreateCupon) this.dateCreateCupon = _data.dateCreateCupon;

        // this.dateCreateCupon = new Date();
    }
}
