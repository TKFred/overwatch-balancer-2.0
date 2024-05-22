import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  battleTag: string;

  @Column({ nullable: true })
  tankRating: number | null;

  @Column({ nullable: true })
  dpsRating: number | null;

  @Column({ nullable: true })
  supportRating: number | null;

  @Column({ default: '111' })
  rolesMask: string;
}
