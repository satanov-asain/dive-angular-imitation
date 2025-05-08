import { Module } from '../libs/decorators';
import { EngineModule } from './modules/engine/engine.module';

@Module({
  nameSelector: 'car-module',
  descriptionTemplate: 'Главный модуль автомобиля',
  declarations: [EngineModule],
  isRoot: true
})
export class CarModule {}

