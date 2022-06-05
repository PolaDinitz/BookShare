import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../../enums/role.enum';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import {
    DEFAULT_USER_IMAGE_FILE_NAME,
    IMAGES_PUBLIC_ASSETS_PATH,
    IMAGES_USER_ASSETS_PATH
} from "../../consts/images.consts";
import { unlinkSync } from 'fs';
import { Coordinates, getCoordinatesFromAddress } from "../../utils/coordinates-calculation";


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {
    }

    public async getUsers(): Promise<User[]> {
        return await this.usersRepository.find({
            relations: ['borrowTransactions']
        });
    }

    public async getUserById(id: string): Promise<User> {
        return await this.usersRepository.findOne(id, {
            relations: ['borrowTransactions']
        });
    }

    public async getUserByEmail(email: string): Promise<User> {
        return await this.usersRepository.findOne({
            relations: ['borrowTransactions'],
            where: {
                email: email
            }
        });
    }

    public async updateRefreshToken(id: string, refresh_token: string) {
        if (refresh_token !== null) {
            return await this.usersRepository.update(id, {
                refreshToken: await bcrypt.hash(refresh_token, 10)
            });
        }
        return await this.usersRepository.update(id, {
            refreshToken: null
        });
    }

    public async updateUser(id: string, updateUserDto: UpdateUserDto, imageName: String) {
        const oldUser = await this.getUserById(id);
        let password: string = oldUser.password;
        let address: string = oldUser.address;
        let coordinates: Coordinates = {lon: oldUser.longitude, lat: oldUser.latitude};

        if (updateUserDto.password) {
            password = await this.hashPassword(updateUserDto.password);
        }

        if (imageName !== null && imageName !== oldUser.imageUrl && oldUser.imageUrl !== DEFAULT_USER_IMAGE_FILE_NAME) {
            unlinkSync(`${IMAGES_PUBLIC_ASSETS_PATH}/${IMAGES_USER_ASSETS_PATH}/${oldUser.imageUrl}`);
        }

        if (updateUserDto.address !== null && updateUserDto.address !== oldUser.address) {
            address = updateUserDto.address;
            coordinates = await getCoordinatesFromAddress(address);
        }

        return await this.usersRepository.save({
            id: id,
            email: updateUserDto.email || oldUser.email,
            firstName: updateUserDto.firstName || oldUser.firstName,
            lastName: updateUserDto.lastName || oldUser.lastName,
            gender: updateUserDto.gender || oldUser.gender,
            password,
            address,
            longitude: coordinates.lon,
            latitude: coordinates.lat,
            dateOfBirth: updateUserDto.dateOfBirth || oldUser.dateOfBirth,
            phoneNumber: updateUserDto.phoneNumber || oldUser.phoneNumber,
            role: oldUser.role,
            imageUrl: imageName === null ? oldUser.imageUrl : `${IMAGES_USER_ASSETS_PATH}/${imageName.toString()}`,
            rating: oldUser.rating,
            count: oldUser.count
        });
    }

    public async register(createUserDto: CreateUserDto, imageName: String): Promise<User> {
        const password = await this.hashPassword(createUserDto.password);
        const coordinates: Coordinates = await getCoordinatesFromAddress(createUserDto.address);
        const newUser = this.usersRepository.create({
            email: createUserDto.email,
            firstName: createUserDto.firstName,
            lastName: createUserDto.lastName,
            password: password,
            address: createUserDto.address,
            longitude: coordinates.lon,
            latitude: coordinates.lat,
            dateOfBirth: createUserDto.dateOfBirth,
            phoneNumber: createUserDto.phoneNumber,
            gender: createUserDto.gender,
            role: Role.USER,
        });

        if (imageName !== null) {
            newUser.imageUrl = `${IMAGES_USER_ASSETS_PATH}/${imageName.toString()}`;
        }
        return await this.usersRepository.save(newUser);
    }

    private async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt();
        return await bcrypt.hash(password, salt);
    }

    public async deleteUser(id: string) {
        await this.usersRepository.delete(id);
    }

    public async rateUser(id: string, rating: number) {
        const user = await this.getUserById(id);

        return await this.usersRepository.update(id, {
            rating: user.rating + rating,
            count: user.count + 1
        });
    }

    public async getUserRating(id: string) {
        const user = await this.getUserById(id);
        if (user.count === 0) {
            return {rating: -1};
        }
        return {rating: (user.rating / user.count)};
    }
}