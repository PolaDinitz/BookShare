import { HttpException, HttpStatus } from "@nestjs/common";
import { randomUUID } from "crypto";

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return callback(new HttpException('Only image files are allowed: jpg, jpeg, png', HttpStatus.BAD_REQUEST), false);
  }
  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  const fileExtName = file.originalname.split('.').pop();
  const uuid = randomUUID(); 
  callback(null, `${uuid}.${fileExtName}`);
};