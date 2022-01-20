import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindCondition, Repository, In } from 'typeorm';
import { Category } from '../../entities/Category.entity';
import { createCategoryDTO } from './dtos/createCategory';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriessRepository: Repository<Category>,
  ) {}

  findAll() {
    return this.categoriessRepository.find();
  }

  findById(id: number) {
    return this.categoriessRepository.findOne(id);
  }

  findBy(filters: FindCondition<Category>) {
    return this.categoriessRepository.find({
      where: {
        ...filters,
      },
    });
  }

  async findOrCreateCategories(categoriesNames: string[]) {
    const existingCategories = await this.findBy({
      name: In(categoriesNames),
    });

    if (!existingCategories.length) {
      return Promise.all(
        categoriesNames.map((cat) => this.create({ name: cat })),
      );
    }

    let missingCategories: Category[] = [];
    if (categoriesNames.length > existingCategories.length) {
      const missingCategoriesNames: createCategoryDTO[] = existingCategories
        .filter((cat) => !categoriesNames.includes(cat.name))
        .map((cat) => ({
          name: cat.name,
        }));

      missingCategories = await Promise.all(
        missingCategoriesNames.map((cat) => this.create(cat)),
      );
    }

    return [...existingCategories, ...missingCategories];
  }

  create(newCategory: createCategoryDTO) {
    return this.categoriessRepository.save(newCategory);
  }
}
