import {
  Entity,
  Column,
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  Timestamp,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  IsDefined,
  IsNotEmpty,
  IsMobilePhone,
  IsEmail,
  IsString,
} from 'class-validator';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: string;

  @Column({ name: 'firstName', type: 'varchar', length: 30 })
  @IsDefined()
  @IsNotEmpty()
  firstName!: string;

  @Column({ name: 'lastName', type: 'varchar', length: 30 })
  @IsDefined()
  @IsNotEmpty()
  lastName!: string;

  @Column({ name: 'phone', type: 'varchar', length: 30, unique: true })
  @IsMobilePhone()
  phone?: string;

  @CreateDateColumn({
    name: 'createdAt',
    type: 'timestamp',
    // default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt!: Timestamp;

  @UpdateDateColumn({
    name: 'updatedAt',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt!: Timestamp;

  @DeleteDateColumn({ name: 'deletedAt' })
  deletedAt!: Timestamp;
}
