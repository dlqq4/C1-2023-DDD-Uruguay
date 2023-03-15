import { Inject, Injectable } from "@nestjs/common";
import { CompraCreadaEventPublisher } from "../../../../domain";
import { IEventPublisher } from "src/libs";
import { lastValueFrom } from "rxjs";
import { CompraMySqlEntity } from "../../../persistence";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class CreateCompraPublisher extends CompraCreadaEventPublisher {
    constructor(@Inject('VENTAS_WEB_CONTEXT') private readonly proxy: ClientProxy) {
        super(proxy as unknown as IEventPublisher);
    }


    emit<Result = any, Input = CompraMySqlEntity>(
        pattern: any,
        data: Input,
    ): Promise<Result> {
        return lastValueFrom<Result>(this.proxy.emit(pattern, data));
    }
}