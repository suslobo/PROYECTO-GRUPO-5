import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HouseController } from './house/house.controller';
import { BookingController } from './booking/booking.controller';
import { UserController } from './user/user.controller';

@Module({
  imports: [],
  controllers: [AppController, HouseController, BookingController, UserController],
  providers: [AppService],
})
export class AppModule {}
