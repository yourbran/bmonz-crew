// /src/app/crew/[id]/page.tsx
import { notFound } from "next/navigation";
import pool from "@/services/db";
import CrewDetailContent from "@/components/CrewDetailContent";

// 타입 정의 (필요에 따라 수정)
interface Crew {
  crew_id: number;
  crew_nm: string;
  job_nm: string;
  img_url: string;
  clmb_st_dt: string;
  prof_img: string;
}

interface Skill {
  crew_id: number;
  skill_id: number;
  grip_nm: string;
  score: number;
}

interface History {
  crew_id: number;
  history_id: number;
  route: string;
  grade: string;
  finish_date: string;
  link_type: string;
  link_url: string;
}

async function getCrewDetail(id: string) {
  try {
    const crewRes = await pool.query('SELECT crew_id, crew_nm, job_nm, img_url, to_char(clmb_st_dt, \'YYYY-MM-DD\') AS clmb_st_dt, prof_img FROM bmonz_crew WHERE crew_id = $1', [id]);
    if (crewRes.rowCount === 0) return null;
    const crew: Crew = crewRes.rows[0];

    const skillsRes = await pool.query('SELECT crew_id, skill_id, grip_nm, score FROM bmonz_clmb_skls WHERE crew_id = $1 ORDER BY skill_id', [id]);
    const skills: Skill[] = skillsRes.rows;

    const historyRes = await pool.query('SELECT crew_id, history_id, route, grade, to_char(finish_date, \'YYYY-MM-DD\') AS finish_date, link_type, link_url FROM bmonz_clmb_hist WHERE crew_id = $1 ORDER BY history_id', [id]);
    const history: History[] = historyRes.rows;

    // 직렬화를 통해 Date나 다른 non-serializable 값을 순수 객체로 변환
    return {
      crew: JSON.parse(JSON.stringify(crew)),
      skills: JSON.parse(JSON.stringify(skills)),
      history: JSON.parse(JSON.stringify(history))

    };
  } catch (error) {
    console.error("크루 상세 데이터 조회 에러:", error);
    return null;
  }
}

export default async function CrewDetailPage({ params }: { params: { id: string } }) {
  
  const resolvedParams = await params;
  const data = await getCrewDetail(resolvedParams.id);
  if (!data) {
    notFound();
  }
  
  const { crew, skills, history } = data;

  console.log('Fetched crew data:', crew),
  console.log('Fetched crew data:', skills),
  console.log('Fetched crew data:', history)

  return (
    // CrewDetailContent는 클라이언트 컴포넌트로, 인터랙션 등이 필요하면 여기에 구현
    <CrewDetailContent crew={crew} skills={skills} history={history} />
  );
}
