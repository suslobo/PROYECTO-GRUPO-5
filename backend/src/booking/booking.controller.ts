import { Body, ConflictException, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './booking.model';
import { Repository } from 'typeorm';
import { House } from 'src/houses/houses.model';

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

    

}
