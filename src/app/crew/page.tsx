import CrewList from "@/components/CrewList";
import styles from "../../styles/Crew.module.css";
import pool from '@/services/db';
import { Crew } from "@/types/crew";

export default async function CrewPage() {
  try {
    const res = await pool.query<Partial<Crew>>('SELECT crew_id, crew_nm, job_nm, img_url, clmb_st_dt, prof_img FROM bmonz_crew ORDER BY crew_id');
    
    // 직렬화 처리: DB에서 반환된 데이터(예: Date 객체 등)를 순수 객체로 변환
    const crewData = JSON.parse(JSON.stringify(res.rows)) as Crew[];

    return (
      <main>
        <div className={styles.pageContainer}>
          <h2 className={styles.title}>멤버소개</h2>
          <CrewList crewData={crewData} />
        </div>
      </main>
    ) 
        
  } catch (error) {
    console.error('크루 데이터 조회 에러:', error);
    return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
  }
}
