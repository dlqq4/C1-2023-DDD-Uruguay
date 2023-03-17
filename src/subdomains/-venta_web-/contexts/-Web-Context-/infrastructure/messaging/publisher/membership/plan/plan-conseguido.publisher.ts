import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { IEventPublisher } from "src/libs";
import {  ClienteConseguidoEventPublisher, CuponConseguidoEventPublisher, PlanConseguidoEventPublisher, UpdatePhoneEventPublisher } from "src/subdomains/-venta_web-/contexts/-Web-Context-/domain";
import { ClienteMySqlEntity, CuponMySqlEntity, PlanMySqlEntity } from "../../../../persistence";
import { lastValueFrom } from "rxjs";


@Injectable()
export class ObtenerPlanPublisher extends PlanConseguidoEventPublisher {
    constructor(@Inject('VENTAS_WEB_CONTEXT') private readonly proxy: ClientProxy) {
        super(proxy as unknown as IEventPublisher);
    }


    emit<Result = any, Input = PlanMySqlEntity>(
        pattern: any,
        data: Input,
    ): Promise<Result> {
        return lastValueFrom<Result>(this.proxy.emit(pattern, data));
    }
}