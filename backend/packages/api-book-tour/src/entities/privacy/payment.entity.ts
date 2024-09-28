import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('payment')
export class Payment {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column('uuid', { name: 'service_id' })
  serviceId!: string; // tourid or other service id

  @Column('varchar', { length: 255 })
  status!: string; // 0: failed, 1: success, 2: pending

  @Column({ type: "timestamp without time zone", name: "paid_at" })
  paidAt!: Date;

  @Column('text')
  log!: string;

  @CreateDateColumn({ type: "timestamp without time zone", name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp without time zone", name: "updated_at" })
  updatedAt!: Date;
}
