"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
let LocationService = class LocationService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async findYourLocation(x, y) {
        var _a, _b;
        let lat = x;
        let lon = y;
        const url = `https://mapapi.what3words.com/api/convert-to-3wa?coordinates=${lon},${lat}&language=ko&format=json`;
        const w3wResponse = await this.httpService.get(url).toPromise();
        const w3w = w3wResponse.data.words;
        const roadAddressResponse = await this.httpService.get('https://dapi.kakao.com//v2/local/geo/coord2address.json', {
            params: {
                x: lat,
                y: lon
            },
            headers: { Authorization: "KakaoAK a3d745f48deb8d3f6ccbbcbce5f3fae4" },
        }).toPromise();
        const roadAddress = (_b = (_a = roadAddressResponse.data.documents[0]) === null || _a === void 0 ? void 0 : _a.address) === null || _b === void 0 ? void 0 : _b.address_name;
        const kakaoMapQuery = roadAddress === null || roadAddress === void 0 ? void 0 : roadAddress.replace(/ /gi, "+");
        const data = {
            data: {
                location: {
                    latitude: lat,
                    longitude: lon,
                },
                w3w: w3w,
                roadAddress: roadAddress ? roadAddress : null,
                kakaoMap: kakaoMapQuery ? `https://map.kakao.com/?map_type=TYPE_MAP&q=${kakaoMapQuery}&urlLevel=3` : null
            }
        };
        return data;
    }
};
LocationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], LocationService);
exports.LocationService = LocationService;
//# sourceMappingURL=location.service.js.map