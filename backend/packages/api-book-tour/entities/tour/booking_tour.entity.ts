import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('tour')
export class Tour {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column('varchar', { length: 255 })
  title!: string;

  @Column('text')
  description!: string;

  @Column('varchar', { length: 255 })
  location!: string;

  @Column('varchar', { length: 255 })
  price!: string;

  @Column('int', { name: 'max_paticipant' })
  maxParticipant!: number;

  @CreateDateColumn({ type: "timestamp without time zone", name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp without time zone", name: "updated_at" })
  updatedAt!: Date;
}
