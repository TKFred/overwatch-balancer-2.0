import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  code: string;

  @Column()
  winner: number;

  @Column()
  ratingChange: number;

  @Column({
    default: new Date()
  })
  matchDate: Date;
}
