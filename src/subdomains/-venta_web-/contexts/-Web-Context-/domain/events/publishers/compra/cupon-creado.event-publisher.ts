import { EventPublisherBase } from "src/libs/sofka/bases/event-publisher.base";
import { CuponDomainEntity } from "../../../entities/compra";


export abstract class CuponCreadoEventPublisher<Response = CuponDomainEntity> extends EventPublisherBase<Response> {

    publish<Result = any>(): Promise<Result> {
        return this.emit(
            'web-context.cupon-creado',
            JSON.stringify({ data: this.response })
        )
    }

}