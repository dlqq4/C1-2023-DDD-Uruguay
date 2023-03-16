import { Inject, Injectable } from "@nestjs/common";
import { CursoCreadoEventPublisher } from "../../../../domain";
import { IEventPublisher } from "src/libs";
import { ClientProxy } from "@nestjs/microservices";
import { CuponMySqlEntity, CursoMySqlEntity } from "../../../persistence";
import { lastValueFrom } from "rxjs";
import { CuponCreadoEventPublisher } from "../../../../domain/events/publishers/compra/cupon-creado.event-publisher";

@Injectable()
export class CreateCuponPublisher extends CuponCreadoEventPublisher {
    constructor(@Inject('VENTAS_WEB_CONTEXT') private readonly proxy: ClientProxy) {
        super(proxy as unknown as IEventPublisher);
    }


    emit<Result = any, Input = CuponMySqlEntity>(
        pattern: any,
        data: Input,
    ): Promise<Result> {
        return lastValueFrom<Result>(this.proxy.emit(pattern, data));
    }
}