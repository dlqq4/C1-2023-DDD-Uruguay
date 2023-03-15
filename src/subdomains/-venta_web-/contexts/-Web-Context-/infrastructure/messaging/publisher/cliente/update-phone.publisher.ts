import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { IEventPublisher } from "src/libs";
import {  CuponConseguidoEventPublisher, UpdatePhoneEventPublisher } from "src/subdomains/-venta_web-/contexts/-Web-Context-/domain";
import { ClienteMySqlEntity, CuponMySqlEntity } from "../../../persistence";
import { lastValueFrom } from "rxjs";


@Injectable()
export class UpdatePhonePublisher extends UpdatePhoneEventPublisher {
    constructor(@Inject('VENTAS_WEB_CONTEXT') private readonly proxy: ClientProxy) {
        super(proxy as unknown as IEventPublisher);
    }


    emit<Result = any, Input = ClienteMySqlEntity>(
        pattern: any,
        data: Input,
    ): Promise<Result> {
        return lastValueFrom<Result>(this.proxy.emit(pattern, data));
    }
}

