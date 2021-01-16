import { Test, TestingModule } from '@nestjs/testing';
import { NeutrinoService } from './neutrino.service';

describe('NeutrinoService', () => {
  let service: NeutrinoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NeutrinoService],
    }).compile();

    service = module.get<NeutrinoService>(NeutrinoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
