import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RecipeEntity } from './entities/recipe.entity';
import { SuppliesModule } from '../supplies/supplies.module';
import { RecipeService } from './recipe.service';
import { RecipeSuppliesEntity } from './entities/recipe-supplies.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RecipeEntity, RecipeSuppliesEntity]), forwardRef(() => SuppliesModule)],
  controllers: [],
  exports: [RecipeService],
  providers: [RecipeService],
})
export class RecipeModule {}
