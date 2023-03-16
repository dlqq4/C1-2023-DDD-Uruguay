
import { CompraDomainEntity } from "../entities/compra/compra.domain-entity";
import { ICreateCompraMethod } from "../interfaces/commands/compra/createCompra.command";



export interface ICompraService <T extends CompraDomainEntity =  CompraDomainEntity>{

    //createCompra(compra : T ) : Promise<T>;
    createCompra(compra : T ) : Promise<T>;
    

/*
   createCompra(compra : ICreateCompraMethod ) : Promise<CompraDomainEntity>;
    createCliente(cliente : ICreateClienteMethod) : Promise <ClienteDomainEntity>;
    createCurso(curso : ICreateCursoMethod) : Promise<CursoDomainEntity>;

    //METODOS PARA OBTENER LAS ENTIDADES ASOCIADAS AL AGREGADO
    obtenerCliente(client : string) : Promise <ClienteDomainEntity>; //SE LE PASA UN ID?
    obtnerCurso(course : string) : Promise<CursoDomainEntity>;
*/

}
