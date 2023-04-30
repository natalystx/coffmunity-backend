import { Module } from '@nestjs/common';
import { RecipeResolver } from './recipe.resolver';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  providers: [RecipeResolver],
})
export class RecipeModule {}
