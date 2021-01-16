import { Injectable, HttpService } from '@nestjs/common';
import { Config } from '../../config';
const request = require('request');

@Injectable()
export class NeutrinoService {

    constructor(
        private http: HttpService
    ) { }

    async verifyNumber(number: string) {
        return await this.http.post(Config.neutrino.url + 'phone-validate', { number: number },
            { headers: { "user-id": Config.neutrino.user_id, "api-key": Config.neutrino.api_key, "Content-Type": "application/json" } }).subscribe(res => {
                console.log(res.data);
                return res.data.valid;
            }, error => {
                console.log(error);
                return false;
            });
    }

}
