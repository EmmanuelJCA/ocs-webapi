import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeEntity } from './entities/recipe.entity';
import { Repository } from 'typeorm';
import { RecipeSuppliesEntity } from './entities/recipe-supplies.entity';
import { CreateRecipeDto } from './dtos/create-recipe.dto';
import { SuppliesService } from '../supplies/supplies.service';
import { UpdateRecipeDto } from './dtos/update-recipe.dto';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(RecipeEntity)
    private recipeRepository: Repository<RecipeEntity>,
    @InjectRepository(RecipeSuppliesEntity)
    private recipeSuppliesRepository: Repository<RecipeSuppliesEntity>,
    @Inject(forwardRef(() => SuppliesService))
    private suppliesService: SuppliesService
  ) {}

  @Transactional()
  async create({supplies, instructions}: CreateRecipeDto): Promise<RecipeEntity> {
    const suppliesEntity = await this.suppliesService.findAllByIds(supplies.map(s => s.id));

    if(suppliesEntity.length !== supplies.length) {
      throw new BadRequestException('Algunos insumos no son válidos')
    }

    const recipeSuppliesEntities = suppliesEntity.map(se => {
      const dose = supplies.find(s => s.id == se.id)?.dose;
      return this.recipeSuppliesRepository.create({ supplies: se, dose });
    });

    await this.recipeSuppliesRepository.save(recipeSuppliesEntities);

    const recipeEntity = this.recipeRepository.create({
      instructions,
      recipeSupplies: recipeSuppliesEntities
    });

    await this.recipeRepository.save(recipeEntity);

    return recipeEntity;
  }

  @Transactional()
  async update({id, instructions, supplies}: UpdateRecipeDto): Promise<RecipeEntity> {
    const recipeEntity = await this.recipeRepository.findOne({ where: {id}});

    if(recipeEntity == null) {
      throw new NotFoundException("Recipe no encontrado");
    }

    const recipe = this.recipeRepository.merge(recipeEntity, { instructions });

    if(supplies) {
      const suppliesEntity = await this.suppliesService.findAllByIds(supplies.map(s => s.id!));

      if(suppliesEntity.length !== supplies.length) {
        throw new BadRequestException('Algunos insumos no son válidos')
      }

      this.recipeSuppliesRepository.remove(recipe.recipeSupplies);

      const recipeSuppliesEntities = suppliesEntity.map(se => {
        const dose = supplies.find(s => s.id == se.id)?.dose;
        return this.recipeSuppliesRepository.create({ supplies: se, dose });
      });

      await this.recipeSuppliesRepository.save(recipeSuppliesEntities);

      recipe.recipeSupplies = recipeSuppliesEntities;
    }

    await this.recipeRepository.save(recipe);

    return recipe;
  }
}
