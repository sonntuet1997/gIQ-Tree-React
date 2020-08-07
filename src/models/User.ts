import {Model} from 'react3l/core';
import {Role} from 'models/Role';

export class User extends Model {
  public id?: number;

  public email?: string;

  public picture?: string;

  public roles?: Role[];

  public locale?: string;
}
