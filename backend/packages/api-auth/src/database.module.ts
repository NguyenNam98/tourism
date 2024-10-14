import { DynamicModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DATABASE_NAMES, ENV_LOCAL } from "app.constant";
import { map, find } from "lodash";

export type TDatabase = {
  DB: string;
  NAME?: string;
};

export class DatabaseModule {
  public static async forRoot(): Promise<DynamicModule> {
    const databases: string[] = map(Object.values(DATABASE_NAMES), "DB");
    const modules = databases.map((key) => {
      const connection = find(Object.values(DATABASE_NAMES), { DB: key });

      return TypeOrmModule.forRoot({

        type: "postgres",
        port: 5432,
        entities: ["dist/entities/**/*{.ts,.js}"],
        name: connection.NAME,
        autoLoadEntities: true,
        ssl: true,
        replication: {
          master: {
            host: "host.docker.internal",
            port: 5432,
            username: "postgres",
           password: "123456",
            database: "tourism",
          },
          slaves: [],
        },
        extra: {
          connectionLimit: 5,
        },
        logging: process.env.ENV == "develop" ? ["query", "error"] : false,
      });
    });
    return {
      module: DatabaseModule,
      imports: modules,
    };
  }

  public static getConnectionName(dbName: TDatabase): string {
    const _conn = find<TDatabase>(Object.values(DATABASE_NAMES), dbName);
    return _conn.NAME;
  }
}
