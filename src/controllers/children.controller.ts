import {
  Controller,
  Get,
  Param,
  Query,
  Body,
  Put,
  Post,
  Request,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ChildrenService } from '../services';
import { Children } from '../schemas/children.schema';
import {} from '../interfaces';
import { Roles } from '../common/role.decorator';
import { Role } from '../common/role.enum';

@ApiTags('Children')
@Controller('Children')
export class ChildrenController {
  constructor(private childrenService: ChildrenService) {}

  @Post()
  @Roles([Role.Admin, Role.Manager])
  @ApiOperation({ description: 'Create a new Children' })
  async create(@Body() createSchoolDto: any, @Request() req) {
    return this.childrenService.create(createSchoolDto, req.user);
  }

  @Get()
  @Roles([Role.All])
  @ApiOperation({ description: 'Find all the children (paginated)' })
  async findAll(@Query() query) {
    return this.childrenService.findAll(query);
  }

  @Get(':id')
  @Roles([Role.Admin])
  @ApiOperation({ description: 'Find a child by ID' })
  async findChildById(@Param('id') id: string): Promise<Children> {
    return this.childrenService.findById(id);
  }

  @Get('parent/:parentId')
  @Roles([Role.All])
  @ApiOperation({ description: 'Find children by Parent ID' })
  async findChildByParentId(@Param('parentId') parentId: string) {
    return this.childrenService.findByParentId(parentId);
  }

  @Put('/:id')
  @Roles([Role.Admin, Role.Manager])
  @ApiOperation({ description: 'Update child information by ID' })
  async updateChild(@Param('id') id: string, @Body() payload: any) {
    return this.childrenService.update(id, payload);
  }
}
