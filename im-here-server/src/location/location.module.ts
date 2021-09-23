import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';

@Module({
    imports: [HttpModule.register({
        timeout: 50000,
        maxRedirects: 5,
    })],
    controllers: [LocationController],
    providers: [LocationService],
    exports: [LocationService],
})
export class LocationModule {}