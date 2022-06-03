import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { User } from './entities/user.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../../utils/upload-files';
import { IMAGES_PUBLIC_ASSETS_PATH, IMAGES_USER_ASSETS_PATH } from '../../consts/images.consts';
import { UserBook } from '../../modules/user-book/entities/user-book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserBook]),
  MulterModule.register({
    storage: diskStorage({
      destination: `${IMAGES_PUBLIC_ASSETS_PATH}/${IMAGES_USER_ASSETS_PATH}`,
      filename: editFileName,
    }),
    fileFilter: imageFileFilter
  })],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}