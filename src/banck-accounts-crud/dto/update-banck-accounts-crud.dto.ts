import { PartialType } from '@nestjs/mapped-types';
import { CreateBanckAccountsCrudDto } from './create-banck-accounts-crud.dto';

export class UpdateBanckAccountsCrudDto extends PartialType(
  CreateBanckAccountsCrudDto,
) {}
