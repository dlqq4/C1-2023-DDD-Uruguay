import { Injectable } from "@nestjs/common";
import { CuponRepository } from "../repositories";
import { CuponDomainEntity, ICuponService, IUpdatePorcentajeMethod } from "src/subdomains/-venta_web-/contexts/-Web-Context-/domain";
import { CuponMySqlEntity } from "../entities";
import { ICreateCuponMethod } from "src/subdomains/-venta_web-/contexts/-Web-Context-/domain/interfaces/commands/compra/createCupon.command";



@Injectable()
export class CuponMySqlService implements ICuponService<CuponMySqlEntity> {


    constructor(private readonly cuponRepository: CuponRepository) {   
    }


    createCupon(cupon: CuponMySqlEntity): Promise<CuponMySqlEntity> {
        return this.cuponRepository.create(cupon)
    }

    updatePorcentaje(data: CuponMySqlEntity): Promise<CuponMySqlEntity> {
        return this.cuponRepository.update(data.idCupon, data)
        
    }

    obtenerCupon(cupon: string): Promise<CuponMySqlEntity> {
        return this.cuponRepository.findById(cupon)
    }


    //METODOS

    /*
    createCurso(curso: CursoMySqlEntity): Promise<CursoMySqlEntity> {
        return this.cursoRepository.create(curso);
    }

    updateCosto(data: IUpdateCostoMethod): Promise<CursoDomainEntity> {
        throw new Error("Method not implemented.");
    }

    obtnerCurso(course: string): Promise<CursoDomainEntity> {
        throw new Error("Method not implemented.");
    }
    */
    

}