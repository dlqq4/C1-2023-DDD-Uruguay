import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"


import { CompraMySqlEntity } from "./compra.entity";
import { CuponDomainEntity } from "src/subdomains/-venta_web-/contexts/-Web-Context-/domain";

@Entity()
export class CuponMySqlEntity extends CuponDomainEntity {

    @PrimaryGeneratedColumn('uuid')
    idCupon: string;

    @Column()
    dateCreateCupon: number;

    @Column()
    porcentajeCupon: number;

    //RELACIONES

    @JoinColumn()
    @OneToOne( ()=> CompraMySqlEntity, (compra)=> compra.idCupon, {cascade:["insert", "update"]} )
    compra: CompraMySqlEntity;
}