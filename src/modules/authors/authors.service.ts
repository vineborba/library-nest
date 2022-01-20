import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindCondition, Repository } from 'typeorm';
import { Author } from '../../entities/Author.entity';
import { CreateAuthorDTO } from './dtos/createAuthor';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private authorsRepository: Repository<Author>,
  ) {}

  findAll() {
    return this.authorsRepository.find();
  }

  findById(id: number) {
    return this.authorsRepository.findOne(id);
  }

  findBy(filters: FindCondition<Author>) {
    return this.authorsRepository.find({
      where: {
        ...filters,
      },
    });
  }

  async findOrCreateAuthor(author: number | string | CreateAuthorDTO) {
    if (typeof author === 'number') {
      const existingAuthor = await this.findById(author);
      if (!existingAuthor) {
        throw new NotFoundException('author not found');
      }
      return existingAuthor;
    } else if (typeof author === 'string') {
      const [existingAuthor] = await this.findBy({ name: author });
      if (!existingAuthor) {
        throw new NotFoundException('author not found');
      }
      return existingAuthor;
    } else {
      return this.create(author);
    }
  }

  create(newAuthor: CreateAuthorDTO) {
    return this.authorsRepository.save(newAuthor);
  }
}
