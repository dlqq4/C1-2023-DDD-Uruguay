import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IRepository } from './base/repository.base';
import {  ClienteMySqlEntity } from '../entities/cliente.entity';
import { BadRequestException, Injectable } from '@nestjs/common';


@Injectable()
export class ClienteRepository implements IRepository<ClienteMySqlEntity>{

    constructor(@InjectRepository(ClienteMySqlEntity) private readonly repository: Repository<ClienteMySqlEntity>) { }

    
    async findAll(): Promise<ClienteMySqlEntity[]> {
        return await this.repository.find();
    }


    async findById(idCliente: string): Promise<ClienteMySqlEntity> {
        const cliente = await this.repository.findOneBy({idCliente})

        if (!cliente) throw new BadRequestException(`El cliente con el id: ${idCliente} no se encuentra`)

        return cliente;
    }


    async create(entity: ClienteMySqlEntity): Promise<ClienteMySqlEntity> {
        return await this.repository.save(entity)
    }


    async update(idCliente: string, entity: ClienteMySqlEntity): Promise<ClienteMySqlEntity> {
        const data = await this.repository.findOneBy({idCliente});
        
        if (data){
            return this.repository.save(entity)
        }
        throw new BadRequestException(`El cliente con el id: ${idCliente} no se encuentra`)
    }

    /*
    async delete(clientId: string): Promise<boolean> {
        const client = await this.repository.findOneBy({ clientId, deletedAt: undefined });
        if (!client) throw new BadRequestException(`Client with id: ${clientId} not found`)

        return true
    }
    */

}


