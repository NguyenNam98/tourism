import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("tour", { schema: "tour" })
export class Tour {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "bool", name: "is_valid", default: true })
  isValid!: boolean;

  @Column("varchar", { length: 255 })
  title!: string;

  @Column("text")
  description!: string;

  @Column("varchar", { length: 255 })
  location!: string;

  @Column("float")
  price!: number;

  @Column("int", { name: "max_participant" })
  maxParticipant!: number;

  @Column("text")
  image!: string;

  @Column({ type: "float", default: 0 })
  rating!: number;

  @CreateDateColumn({ type: "timestamp without time zone", name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp without time zone", name: "updated_at" })
  updatedAt!: Date;
}
