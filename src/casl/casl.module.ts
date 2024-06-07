import { Module } from '@nestjs/common';
import { AbilityFactory } from '../abilities/ability.factory';
import { PoliciesGuard } from '../auth/guards/policies.guard';

@Module({
  providers: [AbilityFactory, PoliciesGuard],
  exports: [AbilityFactory, PoliciesGuard],
})
export class CaslModule {}
