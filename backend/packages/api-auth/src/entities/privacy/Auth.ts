import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm'

export enum LoginType {
  Email = 1,
  Facebook = 2,
  Twitter = 3,
  Google = 4,
}
export enum StatusType {
  inactive = 0,
  active = 1,
  suspended = 2,
  blocked = 3,
  deleted = 4,
}

export enum tenantType {
  CollectionManager = 1,
  CollectAssist = 2,
  WorkAssist = 3,
}
@Entity('auth', { schema: 'privacy' })
export class Auth {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({
    type: 'boolean',
    name: 'is_valid',
    width: 1,
    default: () => true,
  })
  isValid: boolean

  @Column({
    type: 'enum',
    enum: StatusType,
    name: 'user_status',
    width: 1,
    default: () => StatusType.inactive,
  })
  userStatus: StatusType

  @Column({
    type: 'enum',
    enum: LoginType,
    name: 'login_type',
    width: 1,
    default: () => LoginType.Email,
  })
  loginType: LoginType

  @Column('varchar', {
    name: 'mail_address',
    nullable: true,
    length: 64,
  })
  email: string | null

  @Column('varchar', {
    name: 'password',
    nullable: true,
    length: 64,
  })
  password: string | null


  @Column('varchar', {
    name: 'first_name',
    nullable: true,
    length: 64,
  })
  firstName: string | null

  @Column('varchar', {
    name: 'last_name',
    nullable: true,
    length: 64,
  })
  lastName: string | null


  @Column({
    type: 'uuid',
    name: 'role_id',
    nullable: true,
  })
  roleId: string

  @Column('timestamp', {
    name: 'last_access_at',
    default: () => '0000-00-00 00:00:00',
  })
  lastAccessAt: Date

  @Column('timestamp', {
    name: 'last_login_at',
    nullable: true,
  })
  lastLoginAt: Date | null

  @Column('varchar', {
    name: 'ip_address',
    nullable: true,
    length: 64,
  })
  ipAddress: string | null

  @Column('text', {
    name: 'user_agent',
    nullable: true,
  })
  userAgent: string | null


  @CreateDateColumn({ type: "timestamp without time zone", name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp without time zone", name: "updated_at" })
  updatedAt!: Date;
}
