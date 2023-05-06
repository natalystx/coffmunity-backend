import { Test, TestingModule } from '@nestjs/testing';
import { SavedListResolver } from './saved-list.resolver';

describe('SavedListResolver', () => {
  let resolver: SavedListResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SavedListResolver],
    }).compile();

    resolver = module.get<SavedListResolver>(SavedListResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
