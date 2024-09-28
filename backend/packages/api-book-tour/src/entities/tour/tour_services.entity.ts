import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('tour_services', { schema: 'tour' })
export class TourServices {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column('varchar', { length: 255 })
  title!: string;

  @Column('text')
  description!: string;

  @Column('varchar', { length: 255 })
  location!: string;

  @Column('uuid', { name: 'tour_id' })
  tourId!: string;

  @CreateDateColumn({ type: "timestamp without time zone", name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp without time zone", name: "updated_at" })
  updatedAt!: Date;
}
