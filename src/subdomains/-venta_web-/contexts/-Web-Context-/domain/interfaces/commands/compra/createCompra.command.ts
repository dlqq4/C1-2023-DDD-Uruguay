import { ClienteDomainEntity } from "../../../entities/common-entities/cliente.domain-entity";
import { CompraDomainEntity } from "../../../entities/compra/compra.domain-entity";
import { CuponDomainEntity } from "../../../entities/compra/cupon.domain-entity";
import { CursoDomainEntity } from "../../../entities/compra/curso.domain-entity";

export interface ICreateCompraMethod {

    idCompra? : string;
    idCliente? : string;
    idCupon? : string;
    idCurso? : string;
 
}