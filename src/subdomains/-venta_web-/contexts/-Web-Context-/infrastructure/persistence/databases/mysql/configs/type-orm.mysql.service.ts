import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ClienteMySqlEntity, CursoMySqlEntity, PlanMySqlEntity, CuponMySqlEntity, CompraMySqlEntity, MembershipMySqlEntity } from "../entities";
import { EventMySqlEntity } from "../entities/event.entity";

@Injectable()
export class TypeOrmMySqlConfigService implements TypeOrmOptionsFactory {

    constructor(private readonly configService: ConfigService) { }

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password:  '12345',
            database:  'ddd_bf_sofka',
            entities: [
                ClienteMySqlEntity,
                CursoMySqlEntity,
                PlanMySqlEntity,
                CuponMySqlEntity,
                CompraMySqlEntity,
                MembershipMySqlEntity,
                EventMySqlEntity 
            ],
            synchronize: true,
            logging: true
        }
    }
}

/*
    DB_HOST=localhost
    DB_PORT=3306
    DB_USER=root
    DB_PASSWORD=SYSTEM
    DB_NAME=ddd_bf_sofka
*/