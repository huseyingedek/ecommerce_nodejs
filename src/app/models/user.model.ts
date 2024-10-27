import mongoose, { Schema, Document } from "mongoose";
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  name: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  address?: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: { 
    type: String,
    required: false,
  },
  role: {
    type: String,
    default: 'user',
  },
}, { timestamps: true });

UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  this.password = await bcrypt.hash(this.password, 10);
  next();
})

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
}

const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;
