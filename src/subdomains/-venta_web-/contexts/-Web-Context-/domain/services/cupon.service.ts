import { CuponDomainEntity } from "../entities";
import { ICreateCuponMethod } from "../interfaces/commands/compra/createCupon.command";
import { IUpdatePorcentajeMethod } from "../interfaces/commands/compra/cupon/updatePorcentaje.command";

export interface  ICuponService {

    updatePorcentaje(data : IUpdatePorcentajeMethod) : Promise<CuponDomainEntity> //Utilizo la interface de Command

    createCupon(cupon : ICreateCuponMethod) : Promise<CuponDomainEntity>;

}
