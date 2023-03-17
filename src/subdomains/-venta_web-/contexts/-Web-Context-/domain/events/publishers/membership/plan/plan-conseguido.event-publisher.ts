import { EventPublisherBase } from "src/libs";
import { PlanDomainEntity } from "../../../../entities";

export class PlanConseguidoEventPublisher<Response = PlanDomainEntity> extends EventPublisherBase<Response> {

    publish<Result = any>(): Promise<Result> {
        return this.emit('web-context.plan-conseguido', JSON.stringify({ data: this.response }))
    }
}