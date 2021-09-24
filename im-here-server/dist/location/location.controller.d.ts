import { findYourLocationDto } from './dto/findYourLocation.dto';
import { LocationService } from './location.service';
export declare class LocationController {
    private locationService;
    constructor(locationService: LocationService);
    findYourLocation(query: findYourLocationDto): Promise<{
        data: {
            location: {
                latitude: string;
                longitude: string;
            };
            w3w: any;
            roadAddress: any;
            kakaoMap: string;
        };
    }>;
}
