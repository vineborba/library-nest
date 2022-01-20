import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
} from '@nestjs/common';
import { CreateBookDTO } from './dtos/createBook';
import { BooksService } from './books.service';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { createBookSchema } from '../../validators/createBookSchema';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  getAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  find(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.findById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe(createBookSchema))
  create(@Body() newBook: CreateBookDTO) {
    return this.booksService.create(newBook);
  }
}
