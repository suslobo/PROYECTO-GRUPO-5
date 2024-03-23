import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { House } from './houses.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller('houses')
export class HousesController {

    
    constructor(@InjectRepository(House) private houseRepo: Repository<House>) {}

    @Get()
    findAll() {
        return this.houseRepo.find();
    }


    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number) {
        return this.houseRepo.findOne({
            where: {
                id: id
            }
        });
    }

    @Get('filter-by-title')
    findByTitle(@Param('id', ParseIntPipe) id: string) {
        return this.houseRepo.findOne({
            where: {
                title: id
            }
        });
    }

    @Get('filter-by-address')
    findByAdress(@Param('id', ParseIntPipe) id: string) {
        return this.houseRepo.findOne({
            where: {
                address: id
            }
        });
    }

    @Get('filter-by-phone')
    findByPhone(@Param('id', ParseIntPipe) id: string) {
        return this.houseRepo.findOne({
            where: {
                phone: id
            }
        });
    }

    @Get('filter-by-places')
    findByPlaces(@Param('id', ParseIntPipe) id: string) {
        return this.houseRepo.findOne({
            where: {
                places: id
            }
        });
    }

    @Get('filter-by-bedrooms')
    findByBedrooms(@Param('id', ParseIntPipe) id: number) {
        return this.houseRepo.findOne({
            where: {
                bedrooms: id
            }
        });
    }

    @Get('filter-by-bathrooms')
    findByBathrooms(@Param('id', ParseIntPipe) id: number) {
        return this.houseRepo.findOne({
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
        return this.houseRepo.findOne({
            where: {
                price: id
            }
        });
    }

    @Get('filter-by-meters')
    findBymeters(@Param('id', ParseIntPipe) id: number) {
        return this.houseRepo.findOne({
            where: {
                meters: id
            }
        });
    }

    @Get('filter-by-destination')
    findByDestination(@Param('id', ParseIntPipe) id: string) {
        return this.houseRepo.findOne({
            where: {
                destination: id
            }
        });
    }

    @Get('filter-by-petFriendly')
    findByPetFriendly(@Param('id', ParseIntPipe) id: boolean) {
        return this.houseRepo.find({
            where: {
                petFriendly: id
            }
        });
    }

    @Get('filter-by-pool')
    findByPool(@Param('id', ParseIntPipe) id: boolean) {
        return this.houseRepo.find({
            where: {
                pool: id
            }
        });
    }

    @Get('filter-by-garden')
    findByGarden(@Param('id', ParseIntPipe) id: boolean) {
        return this.houseRepo.find({
            where: {
                garden: id
            }
        });
    }

    @Get('filter-by-terrace')
    findByTerrace(@Param('id', ParseIntPipe) id: boolean) {
        return this.houseRepo.find({
            where: {
                terrace: id
            }
        });
    }

    @Get('filter-by-wifi')
    findByWifi(@Param('id', ParseIntPipe) id: boolean) {
        return this.houseRepo.find({
            where: {
                wifi: id
            }
        });
    }

    @Get('filter-by-air')
    findByAir(@Param('id', ParseIntPipe) id: boolean) {
        return this.houseRepo.find({
            where: {
                air: id
            }
        });
    }

    @Get('filter-by-description')
    findByDescription(@Param('id', ParseIntPipe) id: string) {
        return this.houseRepo.find({
            where: {
                description: id
            }
        });
    }

    @Get('filter-by-photoUrls')
    findByPhotoUrls(@Param('id', ParseIntPipe) id: string) {
        return this.houseRepo.find({
            where: {
                photoUrls: id
            }
        });
    }

    @Post()
    create(@Body() house: House) {
        return this.houseRepo.save(house);
    }
}
