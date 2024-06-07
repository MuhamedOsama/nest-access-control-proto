import { AppAbility } from '../abilities/ability.factory';
import { IPolicyHandler } from './IProfileHandler.interface';

export class GetProfileHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can('read', 'user');
  }
}
