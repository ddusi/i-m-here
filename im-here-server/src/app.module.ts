import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocationController } from './location/location.controller';
import { LocationModule } from './location/location.module';
import { LocationService } from './location/location.service';

@Module({
  imports: [LocationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
