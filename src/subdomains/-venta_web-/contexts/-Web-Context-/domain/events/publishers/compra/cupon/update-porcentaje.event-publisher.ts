import { EventPublisherBase } from "src/libs/sofka/bases/event-publisher.base";
import { CuponDomainEntity } from "../../../../entities/compra/cupon.domain-entity";


export abstract class UpdatePorcentajeEventPublisher<Response = CuponDomainEntity> extends EventPublisherBase<Response> {

    publish<Result = any>(): Promise<Result> {
        return this.emit(
            'web-context.update-porcentaje',
            JSON.stringify({ data: this.response })
        )
    }

}