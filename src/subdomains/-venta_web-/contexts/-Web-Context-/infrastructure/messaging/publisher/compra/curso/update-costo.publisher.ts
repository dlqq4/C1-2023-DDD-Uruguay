import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { IEventPublisher } from "src/libs";
import { UpdateCostoCursoEventPublisher } from "src/subdomains/-venta_web-/contexts/-Web-Context-/domain";
import { CursoMySqlEntity } from "../../../../persistence";
import { lastValueFrom } from "rxjs";

@Injectable()
export class UpdateCostoPublisher extends UpdateCostoCursoEventPublisher {
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