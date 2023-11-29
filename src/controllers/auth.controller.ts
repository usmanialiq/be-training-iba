import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthLoginDto, AuthSocialLoginDto } from '../interfaces';
import { AuthService, UserService } from '../services';
import { CreateUserDto, CreateSocialUserDto } from '../interfaces';
import { Public } from '../auth/auth.decorator';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('login')
  @Public()
  @ApiOperation({ description: 'Login the user into the system' })
  async login(@Body() authLoginDto: AuthLoginDto) {
    return this.authService.login(authLoginDto);
  }

  @Post('login-with-google')
  @Public()
  @ApiOperation({ description: 'Login the user with google account' })
  async loginWithGoogle(@Body() authSocialLoginDto: AuthSocialLoginDto) {
    return this.authService.loginWithGoogle(authSocialLoginDto);
  }

  @Post('register')
  @Public()
  @ApiOperation({ description: 'Register the user into the system' })
  async create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Post('register-with-google')
  @Public()
  @ApiOperation({ description: 'Register the user with google account' })
  async createWithGoogle(@Body() body: CreateSocialUserDto) {
    return this.userService.createWithGoogle(body);
  }
}
