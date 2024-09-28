import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('restaurant_table')
export class RestaurantTable {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column('int')
  number!: number;

  @Column('uuid', { name: 'restaurant_id' })
  restaurantId!: string;

  @Column('int', { name: 'number_seats' })
  numberSeats!: number;

  @CreateDateColumn({ type: "timestamp without time zone", name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp without time zone", name: "updated_at" })
  updatedAt!: Date;
}
