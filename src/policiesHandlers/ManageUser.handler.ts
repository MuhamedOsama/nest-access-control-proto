import { AppAbility, IPolicyHandler } from '@catalyst/casl';

export class ManageUserHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can('manage', 'user');
  }
}
