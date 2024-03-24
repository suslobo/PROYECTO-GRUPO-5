import { Body, ConflictException, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './booking.model';
import { Repository } from 'typeorm';


@Controller('booking')
export class BookingController {

    constructor(
        @InjectRepository(Booking)
        private bookingRepository: Repository<Booking>
    ){}

    @Get()
    findAll(){
        return this.bookingRepository.find();
    }

    @Get('filter-by-id/:id')
    findById(@Param('id', ParseIntPipe) id:number){
        return this.bookingRepository.findOne({
            where: {
                id: id
            }
        });
    }

    @Get('filter-by-user/:id')
    findByUserId(@Param('id', ParseIntPipe) id: number){
        return this.bookingRepository.find({
            where: {
                users: {
                    id: id
                }
            }
        });
    }

    @Get('filter-by-book/:id')
    findByBookId(@Param('id', ParseIntPipe) id: number){
        return this.bookingRepository.find({
            where: {
                house: {
                    id: id
                }
            }
        });
    }

    @Post()
    create(@Body() Booking: Booking) {
        return this.bookingRepository.save(Booking);
    }

    @Delete(':id')
    async deleteById(
        @Param('id', ParseIntPipe) id: number
    ) {

        const exists = await this.bookingRepository.existsBy({
            id: id
         });

         if(!exists) {
             throw new NotFoundException('House not found');
         }

        try {
           
            const house = await this.bookingRepository.findOne({
                where: {id: id}
            });
           
            await this.bookingRepository.save(house);
        } catch (error) {
            console.log("Error al borrar la casa")
            throw new ConflictException('No se puede borrar.');
        }
        
    }

}
