import { Module } from '@nestjs/common';
import { CommentResolver } from './comment.resolver';

@Module({
  providers: [CommentResolver],
  imports: [],
})
export class CommentModule {}
