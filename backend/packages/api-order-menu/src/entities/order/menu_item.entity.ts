import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('menu_item', { schema: 'order' })
export class MenuItem {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "bool", name: 'is_valid', default: true})
  isValid!: boolean;

  @Column('int', { name: 'status', default: 1 })
  status!: number; // 1: serve, 2: not serve

  @Column('uuid', { name: 'restaurant_id' })
  restaurantId!: string;

  @Column('varchar', { length: 255 })
  title!: string;

  @Column('text')
  description!: string;

  @Column('varchar', { length: 255 })
  price!: string;

  @CreateDateColumn({ type: "timestamp without time zone", name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp without time zone", name: "updated_at" })
  updatedAt!: Date;
}
