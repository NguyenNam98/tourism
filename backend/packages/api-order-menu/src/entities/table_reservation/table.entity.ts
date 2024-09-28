import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('restaurant_table', { schema: 'reservation' })
export class RestaurantTable {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "bool", name: 'is_valid', default: true})
  isValid!: boolean;

  @Column('int', { name: 'table_number' })
  tableNumber!: number;

  @Column('uuid', { name: 'restaurant_id' })
  restaurantId!: string;

  @Column('int', { name: 'number_seat' })
  numberSeat!: number;

  @Column('text')
  detail!: string; // assuming this is an integer as per your description


  @CreateDateColumn({ type: "timestamp without time zone", name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp without time zone", name: "updated_at" })
  updatedAt!: Date;
}
