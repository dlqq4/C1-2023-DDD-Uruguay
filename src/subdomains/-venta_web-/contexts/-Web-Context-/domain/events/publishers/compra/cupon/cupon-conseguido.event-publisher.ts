import { EventPublisherBase } from "src/libs";
import { ClienteDomainEntity, CuponDomainEntity } from "../../../../entities";

export class CuponConseguidoEventPublisher<Response = CuponDomainEntity> extends EventPublisherBase<Response> {

    publish<Result = any>(): Promise<Result> {
        return this.emit('web-context.cupon-conseguido', JSON.stringify({ data: this.response }))
    }

}