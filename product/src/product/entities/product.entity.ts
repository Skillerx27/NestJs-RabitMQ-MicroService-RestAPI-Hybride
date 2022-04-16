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
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: string;

  @Column({ name: 'name', type: 'varchar', length: 30 })
  @IsDefined()
  @IsNotEmpty()
  name!: string;

  @Column({ name: 'price', type: 'int' })
  @IsDefined()
  @IsNotEmpty()
  price!: number;

  @Column({ name: 'quantity', type: 'int' })
  @IsDefined()
  @IsNotEmpty()
  quantity!: number;

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
