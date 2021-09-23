import { HttpService } from '@nestjs/axios';
export declare class LocationService {
    private httpService;
    constructor(httpService: HttpService);
    findYourLocation(x: string, y: string): Promise<{
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
