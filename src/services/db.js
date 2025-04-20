import { config } from 'dotenv';
import { Pool } from 'pg';

config(); // .env 로드

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: Number(process.env.PGPORT),
});

// (필요시) 연결 테스트 함수
// async function testConnection() {
//   try {
//     const client = await pool.connect();
//     const res = await client.query('SELECT NOW() AS now');
//     console.log('PostgreSQL 연결 테스트 결과:', res.rows[0]);
//     client.release();
//   } catch (err) {
//     console.error('DB 연결 에러:', err);
//   }
// }

export default pool;
