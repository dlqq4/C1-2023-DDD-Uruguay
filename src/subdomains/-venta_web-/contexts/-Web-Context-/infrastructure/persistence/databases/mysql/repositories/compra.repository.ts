import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IRepository } from './base/repository.base';
import {  ClienteMySqlEntity } from '../entities/cliente.entity';
import { CompraMySqlEntity } from '../entities/compra.entity';




@Injectable()
export class CompraRepository implements IRepository<CompraMySqlEntity>{

    constructor(@InjectRepository(CompraMySqlEntity) private readonly repository: Repository<CompraMySqlEntity>) { }


    async findAll(): Promise<CompraMySqlEntity[]> {
        return await this.repository.find();
    }


    async findById(idCompra: string): Promise<CompraMySqlEntity> {
        const compra = await this.repository.findOneBy({idCompra})

        if (!compra) throw new BadRequestException(`La compra con el id: ${idCompra} no se encuentra`)

        return compra;
    }


    async create(entity: CompraMySqlEntity): Promise<CompraMySqlEntity> {
        return await this.repository.save(entity)
    }



    async update(idCompra: string, entity: CompraMySqlEntity): Promise<CompraMySqlEntity> {
        const data = await this.repository.findOneBy({idCompra});
        
        if (data){
            return this.repository.save(entity)
        }
        throw new BadRequestException(`La compra con el id: ${idCompra} no se encuentra`)
    }

    /*
    async delete(clientId: string): Promise<boolean> {
        const client = await this.repository.findOneBy({ clientId, deletedAt: undefined });
        if (!client) throw new BadRequestException(`Client with id: ${clientId} not found`)

        return true
    }
    */

}