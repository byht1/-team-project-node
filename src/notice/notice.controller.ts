import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Query,
  Patch,
  Req,
  Delete,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { NoticeService } from './notice.service';
import { UserService } from 'src/user/user.service';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { SearchDto } from './dto/search.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from './../auth/guard/jwt-auth.guard';
import { IRequestUser } from 'src/type/req';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Notice } from 'src/db-schema/notice.schema';
import { ValidatePipe } from 'src/global/pipe/validate.pipe';

@ApiTags('Notices')
@Controller('/notices')
export class NoticeController {
  constructor(private noticeService: NoticeService, private userService: UserService) {}

  @ApiOperation({ summary: 'Endpoint to receive ads by category' })
  @ApiResponse({ status: 200, type: [Notice] })
  @ApiResponse({ status: 404, description: 'Not found' })
  @Get()
  getNoticesByCategory(@Query() dto: SearchDto) {
    console.log('getByCategory');
    return this.noticeService.getNoticesByCategory(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user')
  getUserNotices(@Req() request: IRequestUser) {
    console.log('getUserNotices');
    const { user } = request;

    return this.noticeService.getUserNotices(user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/favorite')
  getFavotiteNotices(@Req() request: IRequestUser) {
    console.log('favorite');
    const { user } = request;
    return this.userService.getFavotiteNotices(user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id/favorite')
  addNoticeToFavorite(@Req() request: IRequestUser, @Param('id') id: ObjectId) {
    console.log('addToFavorite');
    const { user } = request;
    return this.userService.addNoticeToFavorite(user._id, id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/favorite')
  removeNoticeFromFavorite(@Req() request: IRequestUser, @Param('id') id: ObjectId) {
    console.log('removeFromFavorite');
    const { user } = request;
    return this.userService.removeNoticeFromFavorite(user._id, id);
  }

  @Get('/:id')
  getNoticeById(@Param('id') id: ObjectId) {
    console.log('getById');
    return this.noticeService.getNoticeById(id);
  }

  //===========================
  // @UseGuards(JwtAuthGuard)
  // @UsePipes(ValidatePipe)
  // @Post()
  // @UseInterceptors(FileFieldsInterceptor([{ name: 'picture', maxCount: 1 }]))
  // addNotice(@Req() request: IRequestUser, @UploadedFiles() files, @Body() dto: CreateNoticeDto) {
  //   console.log('addNotice');
  //   const { user } = request;
  //   const { picture } = files;
  //   console.log(files);

  //   return this.noticeService.addNotice(user._id, dto, picture[0]);
  // }
  //===========================
  @UseGuards(JwtAuthGuard)
  @Post()
  addNotice(@Req() request: IRequestUser, @Body() dto: CreateNoticeDto) {
    console.log('addNotice', new Date());
    console.log('dto', dto);
    const { user } = request;
    return true;
    // return this.noticeService.addNotice(user._id, dto, '');
  }
  //==================
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  removeNotice(@Param('id') id: ObjectId) {
    console.log('removeNotice');

    return this.noticeService.removeNotice(id);
  }
}
