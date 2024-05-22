import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PlayerXMatch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  playerId: number;

  @Column()
  matchId: number;

  @Column()
  team: number;

  @Column()
  role: string;
}
