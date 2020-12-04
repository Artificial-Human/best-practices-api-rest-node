import { Request, Response } from 'express'
import { Controller, Post, lazyInject, ValidateBody } from '@decorators';
import { TYPES } from '../../types';
import UserEntity from '@domain/user.entity';
import CreateUserDTO from './createDTO';
import { plainToClass } from 'class-transformer';
import { Http } from '@status/codes';


@Controller('/api/user')
export default class UserController {
  @lazyInject(TYPES.UserEntity) private _userEntity: UserEntity;

  @Post()  
  @ValidateBody(CreateUserDTO)
  public createdUser(req: Request, res: Response) {     
    const dto = plainToClass(CreateUserDTO, req.body)    
    const user = this._userEntity
      .createUser(dto)
      .getNameAndMail()
    return res.status(Http.Created).send(user)
  }


}