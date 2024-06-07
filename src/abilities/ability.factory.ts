import {
  AbilityBuilder,
  PureAbility,
  AbilityClass,
  ExtractSubjectType,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Permission } from '../permission/entities/permission.entity';
import { AvailableSubjects } from '../casl/types/availableSubjects.type';
import { PossibleActions } from '../casl/types/possibleActions.type';
export type AppAbility = PureAbility<[PossibleActions, AvailableSubjects]>;

@Injectable()
export class AbilityFactory {
  defineAbility(permissions: Permission[]): AppAbility {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      PureAbility as AbilityClass<AppAbility>,
    );
    permissions.forEach((permission) => {
      can(
        permission.action as PossibleActions,
        permission.subject as AvailableSubjects,
      );
    });

    return build({
      detectSubjectType: (item) =>
        (item as unknown)
          .constructor as unknown as ExtractSubjectType<AvailableSubjects>,
    });
  }
}
