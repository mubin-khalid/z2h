import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'root',
  database: 'z2h',
  entities: [__dirname + '/../**/*.entity.ts'],
  synchronize: true,
  autoLoadEntities: true,
};
