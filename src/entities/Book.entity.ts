import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import type { Category } from './Category.entity';
import type { Author } from './Author.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne('Author', 'books')
  author: Author;

  @Column()
  description: string;

  @Column({ name: 'published_at' })
  publishedAt: Date;

  @ManyToMany('Category')
  @JoinTable({ name: 'books_categories' })
  categories: Category[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
