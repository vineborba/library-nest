import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorsService } from '../authors/authors.service';
import { CategoriesService } from '../categories/categories.service';
import { Book } from 'src/entities/Book.entity';
import { FindCondition, Repository } from 'typeorm';
import { CreateBookDTO } from './dtos/createBook';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
    private categoriesService: CategoriesService,
    private authorsService: AuthorsService,
  ) {}

  findAll() {
    return this.booksRepository.find();
  }

  findById(id: number) {
    return this.booksRepository.findOne(id);
  }

  findBy(filters: FindCondition<Book>) {
    return this.booksRepository.find({
      where: {
        ...filters,
      },
    });
  }

  async create(newBookRequest: CreateBookDTO) {
    const categories = await this.categoriesService.findOrCreateCategories(
      newBookRequest.categories,
    );
    const author = await this.authorsService.findOrCreateAuthor(
      newBookRequest.author,
    );

    const newBook: Partial<Book> = {
      ...newBookRequest,
      publishedAt: new Date(newBookRequest.publishedAt),
      author,
      categories,
    };
    return this.booksRepository.save(newBook);
  }
}
