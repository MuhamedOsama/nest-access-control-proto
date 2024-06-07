import { AppAbility } from '../abilities/ability.factory';

export interface IPolicyHandler {
  handle(ability: AppAbility): boolean;
}
