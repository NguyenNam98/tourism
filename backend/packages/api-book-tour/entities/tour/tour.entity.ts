import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('booking_tour')
export class BookingTour {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column('uuid', { name: 'user_id' })
  userId!: string;

  @Column('uuid', { name: 'tour_id' })
  tourId!: string;

  @Column('varchar', { name: 'booked_at', length: 255 })
  bookedAt!: string;

  @Column('varchar', { length: 255 })
  status!: string; // 0:in-progess, 1 paid, 2: canceled

  @CreateDateColumn({ type: "timestamp without time zone", name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp without time zone", name: "updated_at" })
  updatedAt!: Date;
}
