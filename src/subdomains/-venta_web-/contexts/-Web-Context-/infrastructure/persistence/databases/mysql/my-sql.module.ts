import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClienteMySqlService, CompraMySqlService, CursoMySqlService } from "./services";
import { ClienteRepository, CompraRepository, CuponRepository, CursoRepository, MembershipRepository, PlanRepository } from "./repositories";
import { TypeOrmMySqlConfigService } from "./configs";
import { ClienteMySqlEntity, CursoMySqlEntity, PlanMySqlEntity, CuponMySqlEntity, CompraMySqlEntity, MembershipMySqlEntity } from "./entities";
import { MembershipMySqlService } from "./services/membershipMySql.service";
import { PlanMySqlService } from "./services/planMySql.service";
import { CuponMySqlService } from "./services/cuponMySql.service";
import { EventService } from "../../services/event.service";
import { EventRepository } from "./repositories/event.repository";
import { EventMySqlEntity } from "./entities/event.entity";



@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useClass: TypeOrmMySqlConfigService,
        }),

        TypeOrmModule.forFeature([
            ClienteMySqlEntity,
            CursoMySqlEntity,
            PlanMySqlEntity,
            CuponMySqlEntity,
            CompraMySqlEntity,
            MembershipMySqlEntity,
            EventMySqlEntity
          
        ])
    ],
    providers: [

    

        TypeOrmMySqlConfigService,

        ClienteMySqlService,
        ClienteRepository,

        CursoMySqlService,
        CursoRepository,

        CompraMySqlService,
        CompraRepository,

        CuponMySqlService,
        CuponRepository,

        MembershipMySqlService,
        MembershipRepository,

        PlanMySqlService,
        PlanRepository,

        EventService,
        EventRepository

    ],
    exports: [
      
        TypeOrmMySqlConfigService,

        ClienteMySqlService,
        ClienteRepository,

        CursoMySqlService,
        CursoRepository,

        CompraMySqlService,
        CompraRepository,

        CuponMySqlService,
        CuponRepository,

        MembershipMySqlService,
        MembershipRepository,

        PlanMySqlService,
        PlanRepository,

        EventService,
        EventRepository
    ]
})
export class MySqlModule { }