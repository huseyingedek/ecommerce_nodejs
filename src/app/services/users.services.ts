import UserModel, { IUser } from '../models/user.model';

class UserService {

  public async getUserByIdService(userId: string): Promise<IUser | null> {
    try {
      const user = await UserModel.findById(userId);
      return user;
    } catch (error) {
      throw new Error('Error fetching user');
    }
  }

  public async updateUserService(userId: string, updateData: Partial<IUser>): Promise<IUser | null> {
    try {
      if (updateData.email || updateData.phone) {
        const existingUser = await UserModel.findOne({
          $or: [
            { email: updateData.email },
            { phone: updateData.phone }
          ],
          _id: { $ne: userId }
        });

        if (existingUser) {
          throw new Error('Email or phone already in use by another user');
        }
      }

      const user = await UserModel.findByIdAndUpdate(userId, updateData, { new: true });
      return user;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Error updating user: ' + error.message);
      } else {
        throw new Error('Error updating user');
      }
    }
  }

}

export default new UserService();