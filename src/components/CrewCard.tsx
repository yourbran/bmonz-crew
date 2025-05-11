"use client";

import { useRouter } from "next/navigation";

type CrewCardProps = {
  crew: {
    crew_id: number;
    crew_nm: string;
    job_nm: string;
    prof_img: string;
  };
  styles?: Record<string, string>;
}

export default function CrewCard({ crew, styles }: CrewCardProps) {
  const defaultImage = "/default-avatar.png";
  
  const router = useRouter();

  const handleClick = () => {
    router.push(`/crew/${crew.crew_id}`, { scroll: false });
  };

  return (
    <div
      className={styles?.cardContainer}
      onClick={handleClick}
      style={{ backgroundImage: `url(${crew.prof_img || defaultImage})` }} // 카드 전체를 이미지로 채우기
    >
      <div className={styles?.cardContent}>
        <h3>{crew.crew_nm}</h3>
        <p>{crew.job_nm}</p>
      </div>
    </div>
  );
}
