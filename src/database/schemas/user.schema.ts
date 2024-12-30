import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: {
    type: String,
    required: true,
  },
  passwordConfirmation: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return v === this.password;
      },
      message: 'Passwords must be the same.',
    },
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  picture: {
    type: String,
  },
});

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const hashdPassword = await bcrypt.hash(this.password, 10);
    this.password = hashdPassword;
    this.passwordConfirmation = undefined;
  }
  next();
});
