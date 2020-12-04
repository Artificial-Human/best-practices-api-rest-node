import {IsInt, IsOptional, IsString, Matches, Max, Min, MinLength} from "class-validator";
import {Type} from "class-transformer";

export default class CreateUserDTO {
  @MinLength(3)
  @IsString()
  readonly name: string;
  
  @MinLength(3)
  @IsString()
  readonly email: string


}

