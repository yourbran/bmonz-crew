"use client"; // 클라이언트 컴포넌트 선언

import { useRouter } from "next/navigation";
import styles from "@/styles/CrewCard.module.css";

export default function CrewCard({ crew }: { crew: { id: number; name: string; occupation: string; image?: string } }) {
  const defaultImage = "/default-avatar.png";
  const router = useRouter();

  const handleClick = () => {
    router.push(`/crew/${crew.id}`);
  };

  return (
    <div
      className={styles.cardContainer}
      onClick={handleClick}
      style={{ backgroundImage: `url(${crew.image || defaultImage})` }} // 카드 전체를 이미지로 채우기
    >
      <div className={styles.cardContent}>
        <h3>{crew.name}</h3>
        <p>{crew.occupation}</p>
      </div>
    </div>
  );
}
