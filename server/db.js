import pg from "pg";
const Pool = pg.Pool;

const poolConfig = {
    host: "localhost",
    database: "tasks",
    user: "postgres",
    port: 5432,
    password: "130548"
}

const pool = new Pool(poolConfig)

export default pool;