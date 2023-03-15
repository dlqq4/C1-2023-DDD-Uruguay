import { Module } from "@nestjs/common";
import { MySqlModule } from './databases/mysql/my-sql.module';
import { ClienteMySqlService} from "./databases";
import { ClienteService } from "./services/cliente.service";
import { CompraService } from "./services/compra.service";
import { CursoService } from "./services/curso.service";
import { EventService } from "./services/event.service";
import { MembershipService } from "./services/membership.service";
import { PlanService } from "./services/plan.service";



@Module({
    imports: [MySqlModule],
    providers: [
        CompraService,
        ClienteService,
        CursoService,

        MembershipService,    
        PlanService,
        EventService
    ],
    exports: [
        CompraService,
        ClienteService,
        CursoService,

        MembershipService,    
        PlanService,
        EventService
     ]
})
export class PersistenceModule { }