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

   /*  @Get('filter-by-id/:id')
    findById(@Param('id', ParseIntPipe) id:number){
        return this.bookingRepository.findOne({
            where: {
                id: id
            }
        });
    } */

   @Get('filter-by-user/:email')
    findByUserId(@Param('email') email: string){
        return this.bookingRepository.find({
            where: {
                users: {
                    email: email
                }
            }
        });
    } 

   

  /*   @Get('filter-by-destination')
    findByBookId(@Param('id', ParseIntPipe) id: string){
        return this.bookingRepository.find({
            where: {
                destination: id
            }
        });
    }  */
    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number) {
       return this.bookingRepository.findOne({
            where: {
               id: id
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
    const exists = await this.bookingRepository.existsBy({ id: id });

    if (!exists) {
        throw new NotFoundException('Booking not found');
    }

    try {
        await this.bookingRepository.delete(id);
    } catch (error) {
        console.log("Error al borrar la reserva", error);
        throw new ConflictException('No se puede borrar.');
    }
}

}
