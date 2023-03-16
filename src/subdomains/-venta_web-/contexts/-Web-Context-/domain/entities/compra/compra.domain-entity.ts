import { UuidValueObject } from "../../value-objects/common-value-objects/uuid/uuid.value-object";
import { IClienteDomainEntityInterface, ICursoDomainEntityInterface, ICuponDomainEntityInterface, ICompraDomainEntityInterface } from "../interfaces";

import { v4 as uuidv4 } from 'uuid';

export class CompraDomainEntity implements ICompraDomainEntityInterface{


    idCompra?: string | UuidValueObject;
    idCliente?:  IClienteDomainEntityInterface;
    idCurso?:   ICursoDomainEntityInterface;
    idCupon?:  ICuponDomainEntityInterface;

    constructor( _data? : ICompraDomainEntityInterface){
        
        if(_data?.idCompra) this.idCompra = _data.idCompra
        
        else this.idCompra = uuidv4();

        if (_data?.idCliente) this.idCliente = _data.idCliente;

        if (_data?.idCurso) this.idCurso = _data.idCurso;

        if (_data?.idCupon) this.idCupon = _data.idCupon;

    }

}
