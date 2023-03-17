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
            host: this.configService.get<string>('DB_HOST'),
            port: this.configService.get<number>('DB_PORT'),
            username: this.configService.get<string>('DB_USER'),
            password: this.configService.get<string>('DB_PASSWORD'),
            database: this.configService.get<string>('DB_NAME'),
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