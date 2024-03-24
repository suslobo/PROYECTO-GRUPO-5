import { Body, ConflictException, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './booking.model';
import { Repository } from 'typeorm';


@Controller('booking')
export class BookingController {

    constructor(
        @InjectRepository(Booking)
        private bookingRepository: Repository<Booking>
    ) {}

    @Get()
    findAll() {
        return this.bookingRepository.find();
    }

    @Get('filter-by-id/:id') // :id es una variable, parámetro en la url
    findById( @Param('id', ParseIntPipe) id: number ) {
        return this.bookingRepository.findOne({
            where: {
                id: id
            }
        });
    }

         //http://localhost:3000/booking/filter-by-user/2
        @Get('filter-by-user/:id')
        findByUserId(@Param('id', ParseIntPipe) id: number){
            return this.bookingRepository.find({
                where: {
                    user: {
                        id: id
                    }
                }
            });
        }

        @Post()
        create(@Body() booking: Booking) {
            return this.bookingRepository.save(booking);
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
