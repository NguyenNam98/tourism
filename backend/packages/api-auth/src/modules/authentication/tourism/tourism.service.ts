import { Injectable } from '@nestjs/common'
import {BaseAuthenticateService} from "../../../providers/services/authenticate/baseAuthenticate.service";
import {tenantType} from "../../../entities/privacy/Auth";
import {CryptoService} from "../../../services/crypto.service";
import {JWTTokenService} from "../../../services/JWTToken.service";

@Injectable()
export class TourismService extends BaseAuthenticateService{
	constructor(
			protected readonly cryptoService: CryptoService,
			protected readonly jwtTokenService: JWTTokenService,
	) {
		super(cryptoService, jwtTokenService);
		this._tenant = tenantType.CollectionManager
	}

}
