import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { IEventPublisher } from "src/libs";
import { MembershipCreadaEventPublisher } from "src/subdomains/-venta_web-/contexts/-Web-Context-/domain";
import { lastValueFrom } from "rxjs";
import { MembershipMySqlEntity } from "../../../persistence";


@Injectable()
export class CreateMembershipPublisher extends MembershipCreadaEventPublisher {
    constructor(@Inject('VENTAS_WEB_CONTEXT') private readonly proxy: ClientProxy) {
        super(proxy as unknown as IEventPublisher);
    }


    emit<Result = any, Input = MembershipMySqlEntity>(
        pattern: any,
        data: Input,
    ): Promise<Result> {
        return lastValueFrom<Result>(this.proxy.emit(pattern, data));
    }
}