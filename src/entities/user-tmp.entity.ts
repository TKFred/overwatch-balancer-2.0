import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserTmp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passHash: string;

  @Column()
  registrationCode: number;
}