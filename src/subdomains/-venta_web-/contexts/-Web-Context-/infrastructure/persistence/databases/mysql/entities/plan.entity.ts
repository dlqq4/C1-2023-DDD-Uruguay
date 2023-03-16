import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"


import { MembershipMySqlEntity } from "./membership.entity";
import { ClienteDomainEntity, PlanDomainEntity } from "src/subdomains/-venta_web-/contexts/-Web-Context-/domain";

@Entity()
export class PlanMySqlEntity extends PlanDomainEntity {
    

    @PrimaryGeneratedColumn('uuid')
    idPlan: string;

    @Column()
    nombrePlan: string;

    @Column()
    dateInicioPlan: number;

    @Column()
    dateFinPlan: number;

    @Column()
    costoPlan: number;

    //RELACIONES
    @JoinColumn()
    @OneToOne( ()=> MembershipMySqlEntity, (menbership)=> menbership.idMembership, {cascade:["insert", "update"]} )
    membership: MembershipMySqlEntity;
}