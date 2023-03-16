import { ClienteDomainEntity } from "../../../entities/common-entities/cliente.domain-entity";
import { PhoneValueObject } from "../../../value-objects/cliente/phone/phone.value-object";
import { FullnameValueObject } from "../../../value-objects/common-value-objects/fullname/fullname.value-object";

export interface ICreateClienteMethod {

    idCliente?: string;
    nombreCliente: string;
    phoneCliente: string;
    emailCliente: string;

    /*
    EL COMANDO ES LA REPRESENTACION DE LOS DATOS.
    ESTA INTERFAZ ES USADA PARA ESTABLECER LA ESTRUCTURA DE DATOS
    UTILIZADA EN LOS METODOS
    */               
}