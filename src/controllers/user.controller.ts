import { Controller, Get, Param, Query, Body, Put } from '@nestjs/common';
import { UploadedFile, UseInterceptors } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { User } from '../schemas/user.schema';
import { IUpdateUserDto, ChangeUserPasswordDto } from '../interfaces';
import { storage } from '../utils/multer.util';
import { Roles } from '../common/role.decorator';
import { Role } from '../common/role.enum';
import { Public } from '../auth/auth.decorator';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @Roles([Role.Admin])
  @ApiOperation({ description: 'Find all the users (paginated)' })
  async findAll(@Query() query) {
    return this.userService.findAll(query);
  }

  @Get(':id')
  @Roles([Role.All])
  @ApiOperation({ description: 'Find a user by ID' })
  async findUserById(@Param('id') id: string): Promise<User> {
    return this.userService.findById(id);
  }

  @Get('email/:email')
  @Roles([Role.Admin])
  @ApiOperation({ description: 'Find a user by Email' })
  async findUserByEmail(@Param('email') email): Promise<User> {
    return this.userService.findByEmail(email);
  }

  @Get('verify/:uuid')
  @Public()
  @ApiOperation({ description: 'Verify the user by UUID' })
  async findUserByUUID(@Param('uuid') uuid: string) {
    return this.userService.verifyUser(uuid);
  }

  @Put('/:id')
  @Roles([Role.All])
  @ApiOperation({ description: 'Update information of a user' })
  async updateUser(@Param('id') id: string, @Body() payload: IUpdateUserDto) {
    return this.userService.update(id, payload);
  }

  @Put('/change-password/:id')
  @Roles([Role.All])
  @ApiOperation({ description: 'Update password information' })
  async changeUserPassword(
    @Param('id') id: string,
    @Body() payload: ChangeUserPasswordDto,
  ) {
    return this.userService.updatePassword(id, payload);
  }

  @Put('/toggle-activity/:id')
  @Roles([Role.Admin])
  @ApiOperation({ description: 'Toggle active status of the user' })
  async toggleActivity(@Param('id') id: string) {
    return this.userService.toggleUserActivity(id);
  }

  @Put('/image/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage,
    }),
  )
  @Roles([Role.All])
  @ApiOperation({ description: 'Upload image of the user' })
  async uploadImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userService.uploadImage(id, file);
  }
}
