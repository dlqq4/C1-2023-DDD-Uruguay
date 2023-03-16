import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"
import { ClienteMySqlEntity } from "./cliente.entity";
import { CursoMySqlEntity } from "./curso.entity";
import { CuponMySqlEntity } from "./cupon.entity";
import { CompraDomainEntity } from "src/subdomains/-venta_web-/contexts/-Web-Context-/domain";

@Entity()
export class CompraMySqlEntity extends CompraDomainEntity {

    @PrimaryGeneratedColumn('uuid')
    idCompra: string;


    //RELACIONES

    @JoinColumn()
    @OneToOne( ()=> ClienteMySqlEntity, (cliente)=> cliente.idCliente, {cascade:["insert", "update"]} )
    idCliente: ClienteMySqlEntity;
    
    @JoinColumn()
    @OneToOne( ()=> CursoMySqlEntity, (curso)=> curso.idCurso, {cascade:["insert", "update"]} )
    idCurso: CursoMySqlEntity;

    @JoinColumn()
    @OneToOne( ()=> CuponMySqlEntity, (cupon)=> cupon.idCupon, {cascade:["insert", "update"]})
    idCupon: CuponMySqlEntity;
}

