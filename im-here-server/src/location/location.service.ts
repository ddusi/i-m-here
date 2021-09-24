import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LocationService {
    constructor(private httpService: HttpService) {}
    // private readonly geo: GeoLocation = [];

    async findYourLocation(x: string, y: string) {
        let lat = x
        let lon = y
        const url = `https://mapapi.what3words.com/api/convert-to-3wa?coordinates=${lon},${lat}&language=ko&format=json`;
        const w3wResponse = await this.httpService.get(url).toPromise()
        const w3w = w3wResponse.data.words
        const roadAddressResponse = await this.httpService.get(
            'https://dapi.kakao.com//v2/local/geo/coord2address.json',
            {
                params: {
                x: lat,
                y: lon
            },
            headers: {Authorization: "KakaoAK a3d745f48deb8d3f6ccbbcbce5f3fae4"},
            }).toPromise()
        const roadAddress = roadAddressResponse.data.documents[0]?.address?.address_name
        const kakaoMapQuery = roadAddress?.replace(/ /gi, "+")
        const data = {
            data : {
                location: {
                    latitude: lat,
                    longitude: lon,
                },
                w3w: w3w,
                roadAddress: roadAddress ? roadAddress : null,
                kakaoMap: kakaoMapQuery ? `https://map.kakao.com/?map_type=TYPE_MAP&q=${kakaoMapQuery}&urlLevel=3` : null
            }
        }
        return data
    }

}
