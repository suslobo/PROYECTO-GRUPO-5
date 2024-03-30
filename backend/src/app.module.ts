import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookingController } from './booking/booking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.model';
import { Booking } from './booking/booking.model';
import { House } from './houses/houses.model';
import { HousesController } from './houses/houses.controller';
import { UsersController } from './users/users.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';


@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        
        filename: (req, file, callback) => {
          let fileName = uuidv4() + extname(file.originalname);
          callback(null, fileName);
        }
      })
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'backend',
      entities: [User, Booking, House],
      synchronize: true, 
      logging: true
    }),
    TypeOrmModule.forFeature([User, Booking, House])
  ],
  controllers: [AppController, HousesController, BookingController, UsersController],
  providers: [AppService],
})
export class AppModule {}
