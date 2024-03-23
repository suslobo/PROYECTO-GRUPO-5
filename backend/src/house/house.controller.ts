import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { House } from './house.model';

@Controller('house')
export class HouseController {

    constructor(
        @InjectRepository(House) private houseRepository: Repository<House>
    ){}

    @Get()
    findAll() {
        return this.houseRepository.find();
    }

    /* @Get('filter-by-id/:id') 
    findById(@Param('id', ParseIntPipe) id: number ) {
        return this.houseRepository.findOne({
           
            where: {
                id: id
            }
        });
    }
        

    @Get('filter-by-title/:title')
    findByTitle(@Param('title') title: string) {
        return this.houseRepository.find({
            where: {
                title: title 
            }
        });
    }

    

    @Get('filter-by-price/:min/:max')
    findByPriceBetweenMinAndMax(
        @Param('min', ParseIntPipe) min: number,
        @Param('max', ParseIntPipe) max: number
    ) {
        return this.houseRepository.find({
            where: {
                price: Between(min, max)
            }
        });
    }

    @Post()
    create(@Body() house: House) {
        return this.houseRepository.save(house);
    }

   
    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() house: House
        ) {
            
            const exists = await this.houseRepository.existsBy({
               id: id
            });

            if(!exists) {
                throw new NotFoundException('Book not found');
            }

            return this.houseRepository.save(house);

    }

    
    @Delete(':id')
    async deleteById(
        @Param('id', ParseIntPipe) id: number
    ) {

        const exists = await this.houseRepository.existsBy({
            id: id
         });

         if(!exists) {
             throw new NotFoundException('House not found');
         }        
        
    } */
}
