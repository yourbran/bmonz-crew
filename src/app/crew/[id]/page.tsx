"use client";

import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import crewData from "@/data/crew.json";
import Image from "next/image";
import styles from "@/styles/CrewDetail.module.css";
import FiveSidedPolygon from "@/components/FiveSidedPolygon";

export default function CrewDetail() {
  const sampleData = {
    name: "최필성",
    occupation: "개발자",
    career: "12년",
    highestGrade: "V9",
    profilePicture: "/default-avatar.png",
    climbingSkills: {
      grip: 8,
      balance: 7,
      routeFinding: 9,
      endurance: 7,
      flexibility: 8,
    },
  };

  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const crew = crewData.find((c) => c.id.toString() === id) || null;
  if (!crew) return <p style={{ textAlign: "center" }}>크루원을 찾을 수 없습니다.</p>;

  return (
    <div className={styles.pageContainer}>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ textAlign: "center", padding: "20px" }}
      >
        {/* 프로필 사진 섹션 */}
        <div className={styles.section}>
          <div className={styles.profilePicture}>
            <Image 
              src={sampleData.profilePicture} 
              alt={sampleData.name} 
              width={200} 
              height={200} 
              className={styles.profileImg}
            />
          </div>
        </div>

        {/* 인물 기본정보 섹션 */}
        <div className={styles.section}>
          <div className={styles.basicInfo}>
            <h1>{sampleData.name}</h1>
            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>직업</span>
                <span className={styles.infoValue}>{sampleData.occupation}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>클라이밍 경력</span>
                <span className={styles.infoValue}>{sampleData.career}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>최고 그레이드</span>
                <span className={styles.infoValue}>{sampleData.highestGrade}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 클라이밍 능력 섹션 */}
        <div className={styles.section}>
          <div className={styles.climbingSkills}>
            <h2>퍼포먼스</h2>
            <FiveSidedPolygon skills={sampleData.climbingSkills} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
