const { Pool } = require('pg');

// 환경변수(.env)를 사용하기 위해 dotenv를 로드
require('dotenv').config();

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
});

// 연결 테스트 함수
async function testConnection() {
  try {
    const client = await pool.connect();
    const res = await client.query('SELECT NOW() AS now');
    console.log('PostgreSQL 연결 테스트 결과:', res.rows[0]);
    client.release();
  } catch (err) {
    console.error('DB 연결 에러:', err);
  }
}

// 테스트 실행 (필요시)
// testConnection();

module.exports = pool;
