import { Body, ConflictException, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.model';

@Controller('users')
export class UsersController {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}

    @Get()
    findAll() {
        return this.userRepository.find();
    }
    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number) {
       return this.userRepository.findOne({
            where: {
               id: id
                }
            });
        
}
@Get('filter-by-firstName')
findByTitle(@Param('id', ParseIntPipe) id: string) {
    return this.userRepository.findOne({
        where: {
            firstName: id
        }
    });
}

    @Post()
    create(@Body() user: User) {
        return this.userRepository.save(user);
    }

    @Delete(':id')
    async deleteById(
        @Param('id', ParseIntPipe) id: number
    ) {
        const exists = await this.userRepository.existsBy({ id: id });
    
        if (!exists) {
            throw new NotFoundException('Booking not found');
        }
    
        try {
            await this.userRepository.delete(id);
        } catch (error) {
            console.log("Error al borrar el usuario", error);
            throw new ConflictException('No se puede borrar.');
        }
    
}
}
