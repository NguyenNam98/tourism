import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('auth')
export class Auth {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column('varchar', { length: 255 })
  role!: string;

  @Column('varchar', { length: 255 })
  permission!: string;

  @Column('varchar', { length: 255 })
  email!: string;

  @Column('varchar', { name: 'user_name', length: 255 })
  userName!: string;

  @Column('varchar', { length: 255 })
  password!: string;

  @Column('varchar', { name: 'user_agent', length: 255 })
  userAgent!: string;

  @Column('varchar', { name: 'ip_address', length: 255 })
  ipAddress!: string;

  @CreateDateColumn({ type: "timestamp without time zone", name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp without time zone", name: "updated_at" })
  updatedAt!: Date;
}
