import { Container } from 'inversify';
import 'reflect-metadata';
import UserEntity from './domain/user.entity'
import { TYPES } from './types'

const container = new Container();
container.bind<UserEntity>(TYPES.UserEntity).to(UserEntity);

export { container };