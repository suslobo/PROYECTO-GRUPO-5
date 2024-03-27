import { Body, ConflictException, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { House } from './houses.model';
import { Repository } from 'typeorm';

@Controller('houses')
export class HousesController {
    constructor(@InjectRepository(House) 
    private houseRepository: Repository<House>) {}

    @Get()
    findAll() {
        return this.houseRepository.find();
    }


    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number) {
        return this.houseRepository.findOne({
            where: {
                id: id
            }
        });
    }

    @Get('filter-by-title')
    findByTitle(@Param('id', ParseIntPipe) id: string) {
        return this.houseRepository.findOne({
            where: {
                title: id
            }
        });
    }

    @Get('filter-by-address')
    findByAdress(@Param('id', ParseIntPipe) id: string) {
        return this.houseRepository.findOne({
            where: {
                address: id
            }
        });
    }

    @Get('filter-by-phone')
    findByPhone(@Param('id', ParseIntPipe) id: string) {
        return this.houseRepository.findOne({
            where: {
                phone: id
            }
        });
    }

    @Get('filter-by-places')
    findByPlaces(@Param('id', ParseIntPipe) id: string) {
        return this.houseRepository.findOne({
            where: {
                places: id
            }
        });
    }

    @Get('filter-by-bedrooms')
    findByBedrooms(@Param('id', ParseIntPipe) id: number) {
        return this.houseRepository.findOne({
            where: {
                bedrooms: id
            }
        });
    }

    @Get('filter-by-bathrooms')
    findByBathrooms(@Param('id', ParseIntPipe) id: number) {
        return this.houseRepository.findOne({
            where: {
                bathrooms: id
            }
        });
    }

    /*
    @Get('filter-by-price/:min/:max')
    findByPriceBetweenMinAndMax(
        @Param('min', ParseIntPipe) min: number,
        @Param('max', ParseIntPipe) max: number) {
        return this.houseRepo.find({
            where: {
                price: Between(min, max)
            }
        });
    }
    */

    @Get('filter-by-price')
    findByPrice(@Param('id', ParseIntPipe) id: number) {
        return this.houseRepository.findOne({
            where: {
                price: id
            }
        });
    }

    @Get('filter-by-meters')
    findBymeters(@Param('id', ParseIntPipe) id: number) {
        return this.houseRepository.findOne({
            where: {
                meters: id
            }
        });
    }

    @Get('filter-by-destination')
    findByDestination(@Param('id', ParseIntPipe) id: string) {
        return this.houseRepository.findOne({
            where: {
                destination: id
            }
        });
    }

    @Get('filter-by-petFriendly')
    findByPetFriendly(@Param('id', ParseIntPipe) id: boolean) {
        return this.houseRepository.find({
            where: {
                petFriendly: id
            }
        });
    }

    @Get('filter-by-pool')
    findByPool(@Param('id', ParseIntPipe) id: boolean) {
        return this.houseRepository.find({
            where: {
                pool: id
            }
        });
    }

    @Get('filter-by-garden')
    findByGarden(@Param('id', ParseIntPipe) id: boolean) {
        return this.houseRepository.find({
            where: {
                garden: id
            }
        });
    }

    @Get('filter-by-terrace')
    findByTerrace(@Param('id', ParseIntPipe) id: boolean) {
        return this.houseRepository.find({
            where: {
                terrace: id
            }
        });
    }

    @Get('filter-by-wifi')
    findByWifi(@Param('id', ParseIntPipe) id: boolean) {
        return this.houseRepository.find({
            where: {
                wifi: id
            }
        });
    }

    @Get('filter-by-air')
    findByAir(@Param('id', ParseIntPipe) id: boolean) {
        return this.houseRepository.find({
            where: {
                air: id
            }
        });
    }

    @Get('filter-by-description')
    findByDescription(@Param('id', ParseIntPipe) id: string) {
        return this.houseRepository.find({
            where: {
                description: id
            }
        });
    }

    @Get('filter-by-photoUrls')
    findByPhotoUrls(@Param('id', ParseIntPipe) id: string) {
        return this.houseRepository.find({
            where: {
                photoUrls: id
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
        @Body() book: House
        ) {
            
           
            const exists = await this.houseRepository.existsBy({
               id: id
            });

            if(!exists) {
                throw new NotFoundException('House not found');
            }

            return this.houseRepository.save(book);

    }

    @Delete(':id')
async deleteById(
    @Param('id', ParseIntPipe) id: number
) {
    const exists = await this.houseRepository.existsBy({ id: id });

    if (!exists) {
        throw new NotFoundException('House not found');
    }

    try {
        const house = await this.houseRepository.findOne({ where: { id: id } });
        await this.houseRepository.remove(house);
    } catch (error) {
        console.log("Error al borrar la casa", error);
        throw new ConflictException('No se puede borrar.');
    }
}

}
