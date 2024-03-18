import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HouseController } from './house/house.controller';
import { BookingController } from './booking/booking.controller';
import { UserController } from './user/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.model';
import { Booking } from './booking/booking.model';
import { House } from './house/house.model';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'rootroot',
      database: 'backend',
      entities: [House],
      synchronize: true, 
      logging: true
    }),
    TypeOrmModule.forFeature([User, Booking, House])
  ],
  controllers: [AppController, HouseController, BookingController, UserController],
  providers: [AppService],
})
export class AppModule {}
