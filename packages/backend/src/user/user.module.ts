import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { User } from './entities/user.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/utils/upload-files';
import { DEFAULT_IMAGE_FILE_NAME } from 'src/consts/images.consts';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  MulterModule.register({
    storage: diskStorage({
      destination: DEFAULT_IMAGE_FILE_NAME,
      filename: editFileName,
    }),
    fileFilter: imageFileFilter
  })],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}