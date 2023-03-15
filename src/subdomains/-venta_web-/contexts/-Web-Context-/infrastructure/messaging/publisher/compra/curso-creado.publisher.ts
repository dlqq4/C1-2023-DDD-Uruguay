import { Inject, Injectable } from "@nestjs/common";
import { CursoCreadoEventPublisher } from "../../../../domain";
import { IEventPublisher } from "src/libs";
import { ClientProxy } from "@nestjs/microservices";
import { CursoMySqlEntity } from "../../../persistence";
import { lastValueFrom } from "rxjs";

@Injectable()
export class CreateCursoPublisher extends CursoCreadoEventPublisher {
    constructor(@Inject('VENTAS_WEB_CONTEXT') private readonly proxy: ClientProxy) {
        super(proxy as unknown as IEventPublisher);
    }


    emit<Result = any, Input = CursoMySqlEntity>(
        pattern: any,
        data: Input,
    ): Promise<Result> {
        return lastValueFrom<Result>(this.proxy.emit(pattern, data));
    }
}