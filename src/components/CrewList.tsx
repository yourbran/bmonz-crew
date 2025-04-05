import CrewCard from "./CrewCard";
import styles from "@/styles/CrewList.module.css";
import pool from "@/services/db";

// DB에서 크루 데이터를 가져오는 함수
async function getCrewData() {
  try {
    const res = await pool.query('SELECT * FROM bmonz_crew ORDER BY crew_id');
    return res.rows;
  } catch (error) {
    console.error('크루 데이터 조회 에러:', error);
    return [];
  }
}

export default async function CrewList() {
  const crewData = await getCrewData();

  return (
    <div className={styles.cardGrid}>
      {crewData.map((crew: any) => (
        <CrewCard key={crew.id} crew={crew} />
      ))}
    </div>
  );
}
