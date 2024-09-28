import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('order', { schema: 'order' })
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column('uuid', { name: 'table_id' })
  tableId!: string;

  @Column({ type: "bool", name: 'is_valid', default: true})
  isValid!: boolean;

  @Column('uuid', { name: 'restaurant_id' })
  restaurantId!: string;

  @Column('uuid', { name: 'user_id' })
  userId!: string;

  @Column('uuid', { array: true , default: []})
  items!: string[]; // array of UUIDs

  @Column('int')
  status!: number; // 1: in-progress, 2: paid, 3: canceled

  @CreateDateColumn({ type: "timestamp without time zone", name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp without time zone", name: "updated_at" })
  updatedAt!: Date;
}
