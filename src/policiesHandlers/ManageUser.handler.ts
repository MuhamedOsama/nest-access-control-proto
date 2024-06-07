import { AppAbility } from '../abilities/ability.factory';
import { IPolicyHandler } from './IProfileHandler.interface';

export class ManageUserHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can('manage', 'user');
  }
}

// You can create other handlers similarly
