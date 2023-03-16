import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IRepository } from './base/repository.base';
import { MembershipMySqlEntity } from '../entities/membership.entity';


@Injectable()
export class MembershipRepository implements IRepository<MembershipMySqlEntity>{

    constructor(@InjectRepository(MembershipMySqlEntity) private readonly repository: Repository<MembershipMySqlEntity>) { }



    async create(entity: MembershipMySqlEntity): Promise<MembershipMySqlEntity> {
        return await this.repository.save(entity)
    }

    async findAll(): Promise<MembershipMySqlEntity[]> {
        return await this.repository.find();
    }


    async findById(idMembership: string): Promise<MembershipMySqlEntity> {
        const membership = await this.repository.findOneBy({idMembership})

        if (!membership) throw new BadRequestException(`El cliente con el id: ${idMembership} no se encuentra`)

        return membership;
    }

    async update(idMembership: string, entity: MembershipMySqlEntity): Promise<MembershipMySqlEntity> {
        const data = await this.repository.findOneBy({idMembership});
        
        if (data){
            return this.repository.save(entity)
        }
        throw new BadRequestException(`El cliente con el id: ${idMembership} no se encuentra`)
    }

    /*
    async delete(clientId: string): Promise<boolean> {
        const client = await this.repository.findOneBy({ clientId, deletedAt: undefined });
        if (!client) throw new BadRequestException(`Client with id: ${clientId} not found`)

        return true
    }
    */

}