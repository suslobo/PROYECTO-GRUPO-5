import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './booking.model';
import { Repository } from 'typeorm';

@Controller('booking')
export class BookingController {

    constructor(
        @InjectRepository(Booking)
        private BookingRepository: Repository<Booking>
    ){}

    @Get()
    findAll(){
        return this.BookingRepository.find();
    }

    @Get('filter-by-id/:id')
    findById(@Param('id', ParseIntPipe) id:number){
        return this.BookingRepository.findOne({
            where: {
                id: id
            }
        });
    }

    @Get('filter-by-user/:id')
    findByUserId(@Param('id', ParseIntPipe) id: number){
        return this.BookingRepository.find({
            where: {
                users: {
                    id: id
                }
            }
        });
    }

    @Get('filter-by-book/:id')
    findByBookId(@Param('id', ParseIntPipe) id: number){
        return this.BookingRepository.find({
            where: {
                house: {
                    id: id
                }
            }
        });
    }

    @Post()
    create(@Body() Booking: Booking) {
        return this.BookingRepository.save(Booking);
    }
}
