export const getConfig = (env) => ({

    port: env.PORT || 80,

    rabbitmq: {
        host: env.RABBITMQ_HOST,
        vhost: '/',
        port: '',
        user: env.RABBITMQ_USER || 'guest',
        pass: env.RABBITMQ_PASS || 'guest'
    },

    mysql: {
        host: env.MYSQL_HOST || 'database',
        user: env.MYSQL_USER,
        pass: env.MYSQL_PASS,
        database: env.MYSQL_DB
    }

})