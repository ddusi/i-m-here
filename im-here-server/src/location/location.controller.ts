import { Controller, Get, HttpStatus, Query, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { findYourLocationDto } from './dto/findYourLocation.dto';
import { LocationService } from './location.service';

@Controller('location')
export class LocationController {
    constructor(private locationService: LocationService) {}

    @Get()
    findYourLocation(@Query() query: findYourLocationDto) {
        return this.locationService.findYourLocation(query.x, query.y)
    }
}
