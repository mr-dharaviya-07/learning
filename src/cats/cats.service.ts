import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from './cat.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catsRepository: Repository<Cat>,
  ) {}

  async create(catData: Cat): Promise<void> {
    const newCat = await this.catsRepository.save(catData);
    console.log(newCat);
  }

  async findAll(): Promise<Cat[]> {
    return this.catsRepository.find();
  }
  async findOne(id: number): Promise<Cat> {
    const cat = await this.catsRepository.findOne({ where: { id } });
    if (!cat) {
      throw new Error('Cat not found');
    }
    return cat;
  }
}
