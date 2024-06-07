import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CHECK_POLICIES_KEY } from '../decorators/policies.decorator';
import { AbilityFactory } from '../../abilities/ability.factory';
import { IPolicyHandler } from '../../policiesHandlers/IProfileHandler.interface';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private abilityFactory: AbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const handlers =
      this.reflector.get<IPolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const ability = this.abilityFactory.defineAbility(user.permissions);
    return handlers.every((handler) => handler.handle(ability));
  }
}
