import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("booking_tour", { schema: "tour" })
export class BookingTour {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("uuid", { name: "user_id", nullable: true })
  userId!: string;

  @Column("uuid", { name: "tour_id" })
  tourId!: string;

  @Column("date", { name: "date" })
  date!: string;

  @Column("varchar", { name: "name", length: 255 })
  name!: string;

  @Column("varchar", { name: "mobile", length: 15 })
  mobile!: string;

  @Column("int", { name: "max_participants" })
  maxParticipants!: number;

  @Column("varchar", { name: "card_number", length: 16 })
  cardNumber!: string;

  @Column("varchar", { name: "expiry_date", length: 7 }) // Assuming the format "MM/YYYY"
  expiryDate!: string;

  @Column("varchar", { name: "cvv", length: 4 })
  cvv!: string;

  @Column("varchar", { name: "booked_at", length: 255 })
  bookedAt!: string;

  @Column({ type: "int", default: 1 })
  status!: number; // 1:in-progress, 2: paid, 3: canceled

  @CreateDateColumn({ type: "timestamp without time zone", name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp without time zone", name: "updated_at" })
  updatedAt!: Date;
}
