import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"


import { ClienteMySqlEntity } from "./cliente.entity";
import { PlanMySqlEntity } from "./plan.entity";
import { MembershipDomainEntity } from "src/subdomains/-venta_web-/contexts/-Web-Context-/domain";

@Entity()
export class MembershipMySqlEntity extends MembershipDomainEntity {

    @PrimaryGeneratedColumn('uuid')
    idMembership: string;


    //RELACIONES
    
    @JoinColumn()
    @OneToOne( forwardRef => ClienteMySqlEntity, (cliente)=> cliente.idCliente, {cascade:["insert", "update"]}  )
    cliente: ClienteMySqlEntity;
    

    @JoinColumn()
    @OneToOne( ()=> PlanMySqlEntity, (plan)=> plan.idPlan, {cascade:["insert", "update"]}  )
    plan: PlanMySqlEntity;


    

}