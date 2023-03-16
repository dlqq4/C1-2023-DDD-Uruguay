import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"


import { CompraMySqlEntity } from "./compra.entity";
import { CursoDomainEntity } from "src/subdomains/-venta_web-/contexts/-Web-Context-/domain";

@Entity()
export class CursoMySqlEntity extends CursoDomainEntity {

    @PrimaryGeneratedColumn('uuid')
    idCurso: string;

    @Column()
    nombreCurso: string;

    @Column()
    nombreTeacher: string;

    @Column()
    costoCurso: number;

    //RELACIONES
    @JoinColumn()
    @OneToOne( ()=> CompraMySqlEntity, (compra)=> compra.idCompra, {cascade:["insert", "update"]})
    compra: CompraMySqlEntity;
}