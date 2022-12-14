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

interface TMetamap {
  username: TEnv
  userpass: TEnv
  base_url: TEnv
  secret: TEnv
  verification_endpoint: TEnv
}

interface TConfig {
  server: TServer
  sqlDb: TSqlDB
  metamap: TMetamap
}

export { TConfig, TEnv };
