import CreateUserDTO from "@api/user/createDTO";
import { injectable } from "inversify";

interface IUser {
  first_name: string, 
  email: string 
}

@injectable()
export default class UserEntity{
  private user : IUser = {
    first_name: null,
    email: null
  }

  createUser(user: CreateUserDTO) {
    this.user = {
      first_name: user.name,
      email: user.email
    }
    return this
  }
  
  getName() {
    return this.user.first_name;
  }

  getNameAndMail() {
    return this.user;
  }

}