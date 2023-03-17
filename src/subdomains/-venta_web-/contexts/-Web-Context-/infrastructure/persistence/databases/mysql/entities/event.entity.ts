import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('event')
export class EventMySqlEntity {

  
    @PrimaryGeneratedColumn('uuid')
    eventId: string;

    @Column()
    type: string;

    @Column({ length: 1500 })
    data: string;

    @Column()
    createdAt: string;



}