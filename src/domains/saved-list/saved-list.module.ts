import { Module } from '@nestjs/common';
import { SavedListResolver } from './saved-list.resolver';

@Module({
  providers: [SavedListResolver],
})
export class SavedListModule {}
