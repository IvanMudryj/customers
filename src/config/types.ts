type TEnv = string;

interface TServer {
  port?: string
  killTimeout?: TEnv
}

type dialectDB = "postgres" | "mysql" | "mariadb";

interface TSqlDB {
  user: string
  host?: TEnv
  port?: TEnv
  pass?: TEnv
  name: TEnv
  type?: TEnv
  dialect: dialectDB
}

interface TConfig {
  server: TServer
  sqlDb: TSqlDB
}

export { TConfig, TEnv };
