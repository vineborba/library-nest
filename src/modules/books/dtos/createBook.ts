import { CreateAuthorDTO } from '../../authors/dtos/createAuthor';

export class CreateBookDTO {
  title: string;
  author: number | CreateAuthorDTO;
  description: string;
  publishedAt: Date;
  categories: string[];
}
