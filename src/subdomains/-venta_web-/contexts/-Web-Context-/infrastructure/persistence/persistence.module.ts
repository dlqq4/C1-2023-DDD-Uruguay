import { Module } from "@nestjs/common";
import { MySqlModule } from './databases/mysql/my-sql.module';

import { CompraService } from "./services/compra.service";
import { CursoService } from "./services/curso.service";
import { EventService } from "./services/event.service";
import { MembershipService } from "./services/membership.service";
import { PlanService } from "./services/plan.service";

import { ClienteService } from "./services/cliente.service";
import { EventRepository } from "./databases/mysql/repositories/event.repository";



@Module({
    imports: [MySqlModule],

    providers: [
        CompraService,
        ClienteService,
        CursoService,

        MembershipService,    
        PlanService,
       

       
    ],
    exports: [
        CompraService,
        ClienteService,
        CursoService,

        MembershipService,    
        PlanService,
       

       
     ]
})
export class PersistenceModule { }