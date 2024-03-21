import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookingController } from './booking/booking.controller';
import { UserController } from './user/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.model';
import { Booking } from './booking/booking.model';
import { House } from './house/house.model';
import { HouseController } from './house/house.controller';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', 
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'backend', // crear esta base de datos en MySQL primero
      entities: [Booking, User, House],
      synchronize: true, 
      logging: true
    }),
    TypeOrmModule.forFeature([Booking, User, House])
  ],
  controllers: [BookingController, UserController, HouseController, AppController],
  providers: [AppService],
})
export class AppModule {}
