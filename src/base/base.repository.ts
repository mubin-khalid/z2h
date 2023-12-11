import { DataSource, ObjectType, Repository } from 'typeorm';
// import IRead from './IRead.interface';
// import IWrite from './IWrite.interface';
// import { ForbiddenException } from '@nestjs/common';

export abstract class BaseRepository<T> extends Repository<T> {
  //implements IWrite<T>, IRead<T>
  entity: ObjectType<T>;

  constructor(
    entity: ObjectType<T>,
    dataSource: DataSource,
    // private dataSource: DataSource = null,
  ) {
    super(entity, dataSource.createEntityManager());
    this.entity = entity;
  }

  // async getConnection(): Promise<Connection> {
  //   const connectionManager = getConnectionManager();
  //   if (!connectionManager.has('default')) {
  //     console.debug('generate new db connection');
  //     const connection = connectionManager.create(typeOrmConfig);
  //     await connection.connect();
  //     return connection;
  //   } else {
  //     console.debug('reuse db connection');
  //     return connectionManager.get();
  //   }
  // }

  // async create(item: DeepPartial<T>): Promise<(<T>() => {})>
  //   try {
  //     return this.save(item);
  //   } catch (e) {
  //     throw new ForbiddenException();
  //   }
  // }

  // delete(id: string): Promise<boolean> {
  //   return Promise.resolve(false);
  // }

  // find(item: T): Promise<T[]> {
  //   return Promise.resolve([]);
  // }

  // async findOne(id: string): Promise<T> {
  //   try {
  //     const connection = await this.getConnection();
  //     const repository = connection.getRepository(this.entity);
  //     const result = await repository.findOne(id);
  //     if (result) return result;
  //     return null;
  //   } catch (e) {
  //     return null;
  //   }
  // }

  // update(id: string, item: T): Promise<boolean> {
  //   return Promise.resolve(false);
  // }
}
