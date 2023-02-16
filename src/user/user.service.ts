import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Notice, NoticeDocument } from 'src/db-schema/notice.schema';
import { Users, UsersDocument } from 'src/db-schema/user.schema';
import { TId } from 'src/type';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
  ) {}

  async addFavirite(userId: TId, advertisementId: ObjectId) {
    const user = await this.usersModel.findById(userId);

    user.favorite.push(advertisementId);
    await user.save();

    return true;
  }

  async getFavirite(userId: TId) {
    const user = await (
      await this.usersModel.findById(userId)
    ).populate('favorite');

    return user.favorite;
  }

  async removeFavirite(userId: TId, advertisementId: ObjectId | any) {
    const user = await this.usersModel.findById(userId);

    console.log('🚀  UserService  user.favorite', user.favorite);
    user.favorite = user.favorite.filter(x => {
      return x.toString() !== advertisementId;
    });
    console.log('🚀  UserService  user.favorite', user.favorite);
    await user.save();

    return true;
  }

  async addAdvertisement(userId: TId, advertisementId: ObjectId) {
    const user = await this.usersModel.findById(userId);

    user.advertisement.push(advertisementId);
    await user.save();

    return true;
  }

  async getAdvertisement(userId: TId) {
    const user = await (
      await this.usersModel.findById(userId)
    ).populate('advertisement');

    return user.advertisement;
  }

  async removeAdvertisement(userId: TId, advertisementId: ObjectId | any) {
    const user = await this.usersModel.findById(userId);

    (user.advertisement = user.advertisement.filter(
      x => x.toString() !== advertisementId,
    )),
      await user.save();

    return true;
  }

  async userById(id: TId): Promise<UsersDocument> {
    return await this.usersModel.findById(id);
  }

  async userByEmail(email: string): Promise<UsersDocument> {
    return await this.usersModel.findOne({ email: email });
  }

  async userByUsername(username: string): Promise<UsersDocument> {
    return await this.usersModel.findOne({ name: username });
  }
}
