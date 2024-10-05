import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { OrderItem } from "./order_item.entity";

@Entity("order")
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("boolean", { name: "is_valid", default: true })
  isValid!: boolean;

  @Column("uuid", { name: "user_id" })
  userId!: string;

  @Column("varchar", { length: 255 })
  name!: string;

  @Column("varchar", { length: 15 })
  mobile!: string;

  @Column({ type: "timestamp without time zone" })
  date!: Date;

  @Column("varchar", { length: 16, name: "card_number" })
  cardNumber!: string;

  @Column({ type: "timestamp without time zone", name: "expiry_date" })
  expiryDate!: Date;

  @Column("varchar", { length: 4 })
  cvv!: string;

  // Replace items with a more detailed structure for orderItems
  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  orderItems!: OrderItem[];

  @Column("decimal", { precision: 10, scale: 2 })
  total!: number;

  @Column("int")
  status!: number; // 1: in-progress, 2: paid, 3: canceled

  @CreateDateColumn({ type: "timestamp without time zone", name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp without time zone", name: "updated_at" })
  updatedAt!: Date;
}
