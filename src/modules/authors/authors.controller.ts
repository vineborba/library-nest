import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
} from '@nestjs/common';
import { createAuthorSchema } from 'src/validators/createAuthorSchema';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { AuthorsService } from './authors.service';
import { CreateAuthorDTO } from './dtos/createAuthor';

@Controller('authors')
export class AuthorsController {
  constructor(private authorsService: AuthorsService) {}

  @Get()
  getAll() {
    return this.authorsService.findAll();
  }

  @Get(':id')
  find(@Param('id', ParseIntPipe) id: number) {
    return this.authorsService.findById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe(createAuthorSchema))
  create(@Body() newBook: CreateAuthorDTO) {
    return this.authorsService.create(newBook);
  }
}
