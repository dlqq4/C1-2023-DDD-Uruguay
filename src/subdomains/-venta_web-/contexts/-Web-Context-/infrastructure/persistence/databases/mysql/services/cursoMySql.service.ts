import { Injectable } from "@nestjs/common";
import { ClienteRepository, CursoRepository } from "../repositories";
import { ClienteDomainEntity, CursoDomainEntity, IClienteService, ICompraService, ICreateClienteMethod, ICreateCursoMethod, ICursoService, IUpdateCostoMethod, IUpdatePhoneMethod } from "src/subdomains/-venta_web-/contexts/-Web-Context-/domain";
import { CursoMySqlEntity } from "../entities/curso.entity";



@Injectable()
export class CursoMySqlService implements ICursoService<CursoMySqlEntity> {


    constructor(private readonly cursoRepository: CursoRepository) {   
    }


    //METODOS

    createCurso(curso: CursoMySqlEntity): Promise<CursoMySqlEntity> {
        return this.cursoRepository.create(curso);
    }

    updateCosto(data: CursoMySqlEntity): Promise<CursoDomainEntity> {
        return this.cursoRepository.update(data.idCurso, data);
      
    }

    obtnerCurso(course: string): Promise<CursoDomainEntity> {
        return this.cursoRepository.findById(course);
        
    }
    
    

}