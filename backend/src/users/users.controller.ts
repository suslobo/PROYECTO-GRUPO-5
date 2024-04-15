import { Body, ConflictException, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.model';
import { Register } from './register.dto';
import { Role } from './role.model';
import { Login } from './login.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService
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


@Get('account/:id')
@UseGuards(AuthGuard('jwt'))
public getCurrentAccountUser(@Request() request) {
    
    return request.user;
}

@Put(':id')
async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: User
    ) {
        
        
        const exists = await this.userRepository.existsBy({
           id: id
        });

        if(!exists) {
            throw new NotFoundException('User not found');
        }

        return this.userRepository.save(user);

}



@Post('register')
async register(@Body() register: Register) {
    
    const exists = await this.userRepository.existsBy({
        email: register.email
    });

    if(exists)
        throw new ConflictException("Email ocupado");
   
   
    const user: User = {
        id: 0,
        nickName: register.nickName,
        email: register.email,
        password: register.password,
        phone: null,
        
        
        role: Role.USER
    };
    return await this.userRepository.save(user);
}

@Post('login')
    async login(@Body() login: Login) {

       
        const exists = await this.userRepository.existsBy({
            email: login.email
        });
        if(!exists)
            throw new NotFoundException("Usuario no encontrado.");

        
        const user = await this.userRepository.findOne({
            where: {
                email: login.email
            }
        });

        if (user.password !== login.password){
            throw new UnauthorizedException("Datos incorrectos");
        }

        let userData = {
            sub: user.id,
            email: user.email,
            role: user.role,
            
        };

        let token = {
            token: await this.jwtService.signAsync(userData)
        }
        return token;

        

    }
 


    @Delete(':id')
    async deleteById(
        @Param('id', ParseIntPipe) id: number
    ) {
        const exists = await this.userRepository.existsBy({ id: id });
    
        if (!exists) {
            throw new NotFoundException('User not found');
        }
    
        try {
            await this.userRepository.delete(id);
        } catch (error) {
            console.log("Error al borrar el usuario", error);
            throw new ConflictException('No se puede borrar.');
        }
    
}
}
