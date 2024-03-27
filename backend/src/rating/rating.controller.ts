import { Controller } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rating } from './rating.model';
import { Repository } from 'typeorm';

@Controller('rating')
export class RatingController {

    constructor(
        @InjectRepository(Rating)
        private ratingRepository: Repository<Rating>
    ) {}
}
