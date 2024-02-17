import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { dataBaseConfig } from './infra/database/connection/sqlite.database';
import { PresentationModule } from './presentation/presentation.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    
    SequelizeModule.forRoot(dataBaseConfig),
    PresentationModule,
  ],
})
export class AppModule {}
