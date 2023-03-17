import { EventPublisherBase } from "src/libs/sofka/bases/event-publisher.base";
import { ClienteDomainEntity } from "../../../entities/common-entities/cliente.domain-entity";


export abstract class ClienteCreadoEventPublisher<Response = ClienteDomainEntity> extends EventPublisherBase<Response> {

    /**
     * ESTE METODO RETORNA UNA PROMESA QUE DE MOMENTO RETORNA UN RESULTADO GENERICO
     * 
    El  método publish(), llama al método emit() heredado de la clase EventPublisherBase
    para emitir un evento llamado 'web-context.cliente-creado'.
    Este evento contiene los datos del cliente recién creado.
    Este objeto es adaptado o serializado como una cadena JSON utilizando el método JSON.stringify().

     * 
     * The function returns a promise that resolves when the event is emitted
     * @returns The result of the emit function.
     */
    publish<Result = any>(): Promise<Result> {
        return this.emit('web-context.cliente-creado', JSON.stringify({ data: this.response }))
    }


}