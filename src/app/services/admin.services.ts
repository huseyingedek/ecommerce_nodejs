import UserModel, { IUser } from '../models/user.model';

class AdminService {
  public async getAllUsers(): Promise<IUser[]> {
    try {
      const users = await UserModel.find();
      return users;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Error fetching users: ' + error.message);
      } else {
        throw new Error('Error fetching users');
      }
    }
  }

  public async createUser(userData: Partial<IUser>): Promise<IUser> {
    try {
      const existingUser = await UserModel.findOne({ $or: [{ email: userData.email }, { phone: userData.phone }] });
      if (existingUser) {
        throw new Error('User with this email or phone number already exists');
      }

      const user = new UserModel(userData);
      return await user.save();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Error creating user: ' + error.message);
      } else {
        throw new Error('Error creating user');
      }
    }
  }

  public async updateUser(userId: string, updateData: Partial<IUser>): Promise<IUser | null> {
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

  public async deleteUser(userId: string): Promise<IUser | null> {
    try {
      const user = await UserModel.findByIdAndDelete(userId);
      return user;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Error deleting user: ' + error.message);
      } else {
        throw new Error('Error deleting user');
      }
    }
  }
}

export default new AdminService();