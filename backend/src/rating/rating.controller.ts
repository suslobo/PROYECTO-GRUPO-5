import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rating } from './rating.model';
import { Repository } from 'typeorm';

@Controller('rating')
export class RatingController {

    constructor(
        @InjectRepository(Rating)
        private ratingRepository: Repository<Rating>
    ) {}

    @Get()
    findAll() {
        return this.ratingRepository.find()
    }

    @Get(':id') 
    findById( @Param('id', ParseIntPipe) id: number ) {
        return this.ratingRepository.findOne({
            where: {
                id: id
            }
        });
    }

    @Get('filter-by-user/:id')
    findByUserId(@Param('id', ParseIntPipe) id: number){
        return this.ratingRepository.find({
            where: {
                user: {
                    id: id
                }
            }, 
            order: {
                createdDate: "DESC"
            }
        });
    }

    /*
        @Get('filter-by-house/:id')
    findByHouseId(@Param('id', ParseIntPipe) id: number){
        return this.ratingRepository.find({
            where: {
                house: {
                    id: id
                }
            }
        });
    }
     */

    @Post()
    create(@Body() rating: Rating) {
        return this.ratingRepository.save(rating);
    }
    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() rating: Rating
        ) {

            // await espera a que el método existsBy termine ya que devuelve Promise<boolean>
            const exists = await this.ratingRepository.existsBy({
               id: id
            });

            if(!exists) {
                throw new NotFoundException('Rating not found');
            }

            return this.ratingRepository.save(rating);
    }

}

