import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"


import { CompraMySqlEntity } from "./compra.entity";
import { MembershipMySqlEntity } from "./membership.entity";
import { forwardRef } from "@nestjs/common";
import { ClienteDomainEntity } from "src/subdomains/-venta_web-/contexts/-Web-Context-/domain";

@Entity()
export class ClienteMySqlEntity extends ClienteDomainEntity {
   
    @PrimaryGeneratedColumn('uuid')
    idCliente: string;

    @Column()
    nombreCliente: string;

    @Column()
    phoneCliente: string;

    @Column()
    emailCliente: string;

    //RELACIONES
   
   
    @OneToOne( ()=> CompraMySqlEntity, (compra)=> compra.idCompra )
    Compra: CompraMySqlEntity;
    
    
    
    @OneToOne( ()=> MembershipMySqlEntity, (membership)=> membership.idMembership  )
    membership: MembershipMySqlEntity;
    
    
}