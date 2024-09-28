import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('restaurant')
export class Restaurant {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column('int')
  location!: number;

  @Column('int')
  name!: number; // assuming this is an integer as per your description

  @Column('text')
  description!: string;

  @CreateDateColumn({ type: "timestamp without time zone", name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp without time zone", name: "updated_at" })
  updatedAt!: Date;
}
