import {
  BeforeInsert,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { nanoid } from 'nanoid';

/**
 * Default entity that is extended by all others
 */
export abstract class Default {
  @PrimaryColumn('varchar', { length: 21, update: false })
  id: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  @BeforeInsert()
  async genID(): Promise<void> {
    this.id = await nanoid();
  }
}
