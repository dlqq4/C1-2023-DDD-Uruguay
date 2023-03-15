import { Controller, Module } from "@nestjs/common";
import { PersistenceModule } from './persistence/persistence.module';
import { CompraController, MembershipController } from "./controllers";
import { MessagingModule } from "./messaging/messaging.module";

@Module({
    imports:[PersistenceModule, MessagingModule],
    controllers:[CompraController ,MembershipController],
    providers:[],
    exports:[]
})
export class VentaWebModule{}