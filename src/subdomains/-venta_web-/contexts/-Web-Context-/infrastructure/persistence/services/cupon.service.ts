import { Injectable } from '@nestjs/common';
import { CuponMySqlService } from '../databases/mysql/services/cuponMySql.service';

@Injectable()
export class CuponService extends CuponMySqlService {}