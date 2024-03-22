import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { House } from './house.model';
import { Repository} from "typeorm";

@Controller('house')
export class HouseController {
    constructor(
        @InjectRepository(House) 
        private houseRepo: Repository <House>
    ) {}

    @Get()
    findAll() {
        return this.houseRepo.find();
    }
}
