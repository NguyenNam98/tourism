import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('reservation')
export class Reservation {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column('uuid', { name: 'restaurant_id' })
  restaurantId!: string;

  @Column('uuid', { name: 'table_id' })
  tableId!: string;

  @Column('text')
  note!: string;

  @Column('uuid', { name: 'user_id' })
  userId!: string;

  @Column({ type: "timestamp without time zone", name: "start_at" })
  startAt!: Date;

  @Column({ type: "timestamp without time zone", name: "end_at" })
  endAt!: Date;

  @Column('int')
  status!: number; // 0: in-progress, 1: finished, 2: canceled

  @CreateDateColumn({ type: "timestamp without time zone", name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp without time zone", name: "updated_at" })
  updatedAt!: Date;
}
