import { AuthGuard } from '@nestjs/passport'
import { ExecutionContext, Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'

@Injectable()
export class RefreshTokenGuard extends AuthGuard('jwt-refresh') {
	constructor() {
		super()
	}

	canActivate(
		context: ExecutionContext
	): Promise<boolean> | Observable<boolean> | boolean {
		return super.canActivate(context)
	}
}