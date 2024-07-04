import { AppAbility, IPolicyHandler } from '@catalyst/casl';
export class GetProfileHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can('read', 'user');
  }
}
