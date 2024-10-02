import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("menu_item", { schema: "order" })
export class MenuItem {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("int")
  status!: number; // 1: serve, 2: not serve

  @Column("uuid", { name: "restaurant_id", nullable: true })
  restaurantId!: string;

  @Column("varchar", { length: 255 })
  title!: string;

  @Column("text")
  description!: string;

  @Column("float")
  price!: number;

  @Column("text")
  image!: string;

  @Column({ type: "float", default: 0 })
  rating!: number;

  @CreateDateColumn({ type: "timestamp without time zone", name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp without time zone", name: "updated_at" })
  updatedAt!: Date;
}
