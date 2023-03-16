import {  CuponDomainEntity} from "../../../entities";


export interface ICuponConseguidoResponse {

    success: boolean;
    data: CuponDomainEntity | null;
    
}