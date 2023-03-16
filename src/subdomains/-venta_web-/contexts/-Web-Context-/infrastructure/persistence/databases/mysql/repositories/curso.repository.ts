import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IRepository } from './base/repository.base';
import { CursoMySqlEntity } from '../entities/curso.entity';




@Injectable()
export class CursoRepository implements IRepository<CursoMySqlEntity>{

    constructor(@InjectRepository(CursoMySqlEntity) private readonly repository: Repository<CursoMySqlEntity>) { }


    async findAll(): Promise<CursoMySqlEntity[]> {
        return await this.repository.find();
    }


    async findById(idCurso: string): Promise<CursoMySqlEntity> {
        const curso = await this.repository.findOneBy({idCurso})

        if (!curso) throw new BadRequestException(`El curso con el id: ${idCurso} no se encuentra`)

        return curso;
    }


    async create(entity: CursoMySqlEntity): Promise<CursoMySqlEntity> {
        return await this.repository.save(entity)
    }


    async update(idCurso: string, entity: CursoMySqlEntity): Promise<CursoMySqlEntity> {
        const data = await this.repository.findOneBy({idCurso});
        if (data){
            return this.repository.save(entity)
        }

        throw new BadRequestException(`El curso con el id: ${idCurso} no se encuentra`)
    }

    /*
    async delete(clientId: string): Promise<boolean> {
        const client = await this.repository.findOneBy({ clientId, deletedAt: undefined });
        if (!client) throw new BadRequestException(`Client with id: ${clientId} not found`)

        return true
    }
    */

}