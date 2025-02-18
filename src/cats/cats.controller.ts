/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
  ParseIntPipe,
  HttpStatus,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './cat.entity';
import { Response } from 'express';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  async create(@Body() catData: Cat, @Res() res: Response): Promise<void> {
    await this.catsService.create(catData);
    res.status(201).send('New Cat Add....');
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
  @Get(':id')
  async findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<Cat> {
    return this.catsService.findOne(id);
  }
}
