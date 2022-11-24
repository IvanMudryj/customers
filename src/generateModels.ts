import { IConfig, ModelBuilder, DialectPostgres } from 'sequelize-typescript-generator';

(async () => {
    const config: IConfig = {
        connection: {
            host:'development.chyumyeeoqzg.us-east-2.rds.amazonaws.com',
            dialect: 'postgres',
            database: 'KYCVerifications',
            username: 'postgres',
            password: 'PJR19mvHo5G0ZbebnzGR'
        },
        metadata: {
            indices: true,
            //case: 'CAMEL',
            associationsFile:'./src/server/_modelsAuto/associations.csv'
        },
        output: {
            clean: true,
            outDir: './src/server/_modelsAuto'
        },
        strict: true,
        
    };

    const dialect = new DialectPostgres();

    const builder = new ModelBuilder(config, dialect);

    try {
        await builder.build();
    }
    catch(err) {
        console.error(err);
        process.exit(1);
    }    
})();