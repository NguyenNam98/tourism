import {
	Controller,

} from '@nestjs/common'
import {TourismService} from './tourism.service'
import {BaseAuthenticateController} from "../../../providers/controllers/authenticate/baseAuthenticate.controller";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('tourism CM')
@Controller({
	path: 'tourism',
	version: '1',
})
export class TourismController extends BaseAuthenticateController{
	constructor(protected collectionManagerService: TourismService) {
		super(collectionManagerService);
	}

}
