import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("restaurant", { schema: "reservation" })
export class Restaurant {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "bool", name: "is_valid", default: true })
  isValid!: boolean;

  @Column("text")
  location!: string;

  @Column("text")
  name!: string;

  @Column("text")
  description!: string;

  @Column({ type: "float", name: "price_range" })
  priceRange!: number;

  @Column("text")
  image!: string;

  @Column({ type: "float", default: 0 })
  rating!: number;

  @Column("text")
  type!: string;

  @CreateDateColumn({ type: "timestamp without time zone", name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp without time zone", name: "updated_at" })
  updatedAt!: Date;
}
