import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.model';

@Controller('users')
export class UsersController {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>
    ){}

    @Get()
    findAll() {
        return this.userRepo.find()
    }
}
