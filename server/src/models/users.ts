import mongoose, {
  Document,
  PassportLocalDocument,
  PassportLocalModel,
  Schema,
} from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

interface IThumbnailSize {width:number, height:number}

interface IUser extends PassportLocalDocument {
  _doc?: any;
  email: string;
  avatar: {
    url: string;
    filename: string;
  };
  _thumbnailSize: IThumbnailSize; // Optional as it's set virtually
  thumbnail: string; // This is the result of the virtual "thumbnail" property
}


const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
	},
	lastName: {
    type: String,
    required: true,
	},
	firstName: {
    type: String,
    required: true,
	},
	avatar: {
		url: { type: String, required: true },
		filename: { type: String, required: true },
	},
	thumbnailUrl: {
		type: String,
		required:true
	}
});



interface UserModel<T extends Document> extends PassportLocalModel<T> { }

userSchema.plugin(passportLocalMongoose, {
	usernameField: 'email'
});

const User: UserModel<IUser> = mongoose.model<IUser>("User", userSchema);

export { IUser, User };