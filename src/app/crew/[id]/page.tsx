"use client";

import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import crewData from "@/data/crew.json";
import Image from "next/image";
import styles from "@/styles/CrewDetail.module.css";
import FiveSidedPolygon from "@/components/FiveSidedPolygon";


export default function CrewDetail() {

  const sampleData = {
    name: "홍길동",
    occupation: "프로 클라이머",
    career: "5년",
    highestGrade: "V8",
    profilePicture: "/default-avatar.png", // 실제 경로로 수정
    climbingSkills: {
      grip: 8,
      balance: 7,
      routeFinding: 9,
      endurance: 7,
      flexibility: 8,
    },
  };

  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id; // 배열이면 첫 번째 값 사용

  const crew = crewData.find((c) => c.id.toString() === id) || null;
  if (!crew) return <p style={{ textAlign: "center" }}>크루원을 찾을 수 없습니다.</p>;

  return (
    <div className={styles.pageContainer}>
      <motion.div
        initial={{ opacity: 0, x: 50 }} // 페이지 진입 시 효과
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }} // 페이지 떠날 때 효과
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ textAlign: "center", padding: "20px" }}
      >
        {/* 프로필 사진 */}
        <div className={styles.profilePicture}>
          <Image 
            src={sampleData.profilePicture} 
            alt={sampleData.name} 
            width={200} 
            height={200} 
            className={styles.profileImg}
          />
        </div>

        {/* 인물 기본정보 */}
        <div className={styles.basicInfo}>
          <h1>{sampleData.name}</h1>
          <p>직업: {sampleData.occupation}</p>
          <p>클라이밍 경력: {sampleData.career}</p>
          <p>최고 그레이드: {sampleData.highestGrade}</p>
        </div>

        {/* 클라이밍 능력 오각형 */}
        <div className={styles.climbingSkills}>
          <h2>클라이밍 능력</h2>
          <FiveSidedPolygon skills={sampleData.climbingSkills} />
        </div>
      </motion.div>
    </div>
  );
}
