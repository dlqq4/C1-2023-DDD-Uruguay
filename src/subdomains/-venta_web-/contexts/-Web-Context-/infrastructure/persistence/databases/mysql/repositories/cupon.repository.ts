import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IRepository } from './base/repository.base';
import {  ClienteMySqlEntity } from '../entities/cliente.entity';
import { CuponMySqlEntity } from '../entities/cupon.entity';




@Injectable()
export class CuponRepository implements IRepository<CuponMySqlEntity>{

    constructor(@InjectRepository(CuponMySqlEntity) private readonly repository: Repository<CuponMySqlEntity>) { }


    async findAll(): Promise<CuponMySqlEntity[]> {
        return await this.repository.find();
    }


    async findById(idCupon: string): Promise<CuponMySqlEntity> {

        const cupon = await this.repository.findOneBy({idCupon})

        if (!cupon) throw new BadRequestException(`El cupon con el id: ${idCupon} no se encuentra`)

        return cupon;
    }


    async create(entity: CuponMySqlEntity): Promise<CuponMySqlEntity> {
        return await this.repository.save(entity)
    }

    
    async update(idCupon: string, entity: CuponMySqlEntity): Promise<CuponMySqlEntity> {
        const data = await this.repository.findOneBy({idCupon});
        if (data){
            return this.repository.save(entity)
        }

        throw new BadRequestException(`El cupon con el id: ${idCupon} no se encuentra`)
    }

    /*
    async delete(clientId: string): Promise<boolean> {
        const client = await this.repository.findOneBy({ clientId, deletedAt: undefined });
        if (!client) throw new BadRequestException(`Client with id: ${clientId} not found`)

        return true
    }
    */

}