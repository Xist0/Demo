import postgres from 'postgres'

export const sql = postgres({
    host: 'localhost',
    port: 5433,
    db: 'demo',
    username: 'postgres',
    password: '1234'
})