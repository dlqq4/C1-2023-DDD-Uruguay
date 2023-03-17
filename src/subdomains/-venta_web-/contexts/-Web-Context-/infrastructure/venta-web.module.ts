import {  Module } from "@nestjs/common";
import { PersistenceModule } from './persistence/persistence.module';
import { CompraController, MembershipController } from "./controllers";
import { MessagingModule } from "./messaging/messaging.module";
import { GlobalControllerEvent } from "./messaging/subscribers";

@Module({
    imports:[PersistenceModule, MessagingModule],
    controllers:[CompraController ,MembershipController, GlobalControllerEvent],
    providers:[],
    exports:[]
})
export class VentaWebModule{}