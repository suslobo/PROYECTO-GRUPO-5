import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.model';
import { Repository } from 'typeorm';

@Controller('user')
export class UserController {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>
    ){}

    @Get()
    findAll() {
        return this.userRepo.find()
    }
}
