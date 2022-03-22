import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { User } from './entities/user.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/utils/upload-files';
import { IMAGES_ASSETS_PATH } from 'src/consts/images.consts';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  MulterModule.register({
    storage: diskStorage({
      destination: IMAGES_ASSETS_PATH,
      filename: editFileName,
    }),
    fileFilter: imageFileFilter
  })],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}