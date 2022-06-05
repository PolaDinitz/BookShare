import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../user/user.service';
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt/jwt.strategy';
import { LocalStrategy } from './local/local.strategy';
import { Role } from '../../enums/role.enum';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);

const fakeUser = {
  id: 1, 
  password: "$2a$12$tbe9XOum3b3bDNZslBcB8e9h2nee8X/4ziPUPY9YczEIMoz0wwJlC",
  email: "book@share.com",
  role: Role.USER
}

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule,
        JwtModule.register({
          signOptions: { expiresIn: '60s' },
        })
      ],
      providers: [AuthService, LocalStrategy, JwtStrategy],
    })
    .useMocker((token) => {
      if (token === UsersService) {
        return { getUserByEmail: jest.fn().mockResolvedValue(fakeUser) };
      }
      if (typeof token === 'function') {
        const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>;
        const Mock = moduleMocker.generateFromMetadata(mockMetadata);
        return new Mock();
      }
    })
    .compile();

    service = moduleRef.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

describe('validateUser', () => {
  let service: AuthService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule,
        JwtModule.register({
          signOptions: { expiresIn: '60s' },
        }),
      ],
      providers: [AuthService, LocalStrategy, JwtStrategy],
    })
    .useMocker((token) => {
      if (token === UsersService) {
        return { getUserByEmail: jest.fn().mockResolvedValue(fakeUser) };
      }
      if (typeof token === 'function') {
        const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>;
        const Mock = moduleMocker.generateFromMetadata(mockMetadata);
        return new Mock();
      }
    })
    .compile();

    service = moduleRef.get<AuthService>(AuthService);
  });

  it('should return a user object when credentials are valid', async () => {
    const res = await service.validateUser('book@share.com', 'Aa123456');
    expect(res.id).toEqual(1);
  });

  it('should return null when credentials are invalid', async () => {
    const res = await service.validateUser('xxx', 'xxx');
    expect(res).toBeNull();
  });
});
