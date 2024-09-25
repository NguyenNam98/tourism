import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column('varchar', { name: 'first_name', length: 255 })
  firstName!: string;

  @Column('varchar', { name: 'last_name', length: 255 })
  lastName!: string;

  @Column('uuid', { name: 'auth_id' })
  authId!: string;

  @CreateDateColumn({ type: "timestamp without time zone", name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp without time zone", name: "updated_at" })
  updatedAt!: Date;
}
