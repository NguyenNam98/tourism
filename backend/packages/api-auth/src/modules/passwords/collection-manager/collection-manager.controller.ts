import {
	Controller,
} from '@nestjs/common'
import {CollectionManagerService} from './collection-manager.service'
import {BasePasswordController} from "../../../providers/controllers/password/basePassword.controller";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Password CM')

@Controller({
	path: 'cm/password',
	version: '1',
})
export class CollectionManagerController extends BasePasswordController{
	constructor(protected collectionManagerService: CollectionManagerService) {
		super(collectionManagerService);
	}

}
