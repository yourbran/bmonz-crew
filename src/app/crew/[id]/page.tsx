"use client";

import { motion } from "framer-motion";
import { useParams, usePathname } from "next/navigation";
import crewDataRaw from "@/data/crew.json";
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "@/styles/CrewDetail.module.css";
import FiveSidedPolygon from "@/components/FiveSidedPolygon";
import GradeBadge from "@/components/GradeBadge";

// 타입 정의
interface Skills {
  grip: number;
  balance: number;
  routeFinding: number;
  endurance: number;
  flexibility: number;
}

interface HistoryEntry {
  route: string;
  grade: string;
  finishDate: string;
  link?: string;
}

interface CrewMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  occupation: string;
  climbingStartDate: string;
  highestGrade: string;
  profilePicture: string;
  climbingSkills: Skills;
  climbingHistory?: HistoryEntry[]; // 새로 추가된 등반 이력
}

const crewData = crewDataRaw as CrewMember[];

function calculateCareer(start: string): string {
  const startYear = parseInt(start.substring(0, 4));
  const startMonth = parseInt(start.substring(4, 6));
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1; // 0부터 시작하므로 +1
  let monthsDiff = (currentYear - startYear) * 12 + (currentMonth - startMonth);
  if (monthsDiff < 0) monthsDiff = 0;
  const years = Math.floor(monthsDiff / 12);
  const months = monthsDiff % 12;
  return months > 0 ? `${years}년 ${months}개월` : `${years}년`;
}

export default function CrewDetail() {

  const pathName = usePathname();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  // 더미 상태를 추가해서 강제로 리렌더링 유도
  const [dummy, setDummy] = useState(0);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 짧은 딜레이 후 dummy state 업데이트
    const timeout = setTimeout(() => {
      setDummy((prev) => prev + 1);
    }, 100); // 100ms 정도
    return () => clearTimeout(timeout);
  }, []);

  const crew = crewData.find((c) => c.id.toString() === id) || null;
  if (!crew) return <p style={{ textAlign: "center" }}>크루원을 찾을 수 없습니다.</p>;

   // climbingStartDate를 바탕으로 경력을 계산
   const careerText = calculateCareer(crew.climbingStartDate);

  return (
    <div className={styles.pageContainer}>
      <motion.div
        key={`${pathName}-${dummy}`} // '뒤로가기'를 통해 해당 페이지로 되돌아올 경우 정상적으로 렌더링 되도록 설정
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
              src={crew.profilePicture} 
              alt={crew.name} 
              width={200} 
              height={200} 
              className={styles.profileImg}
            />
          </div>
        </div>

        {/* 인물 기본정보 섹션 */}
        <div className={styles.section}>
          <div className={styles.basicInfo}>
            <h2>멤버소개</h2>
            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>이름</span>
                <span className={styles.infoValue}>{crew.name}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>직업</span>
                <span className={styles.infoValue}>{crew.occupation}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>클라이밍 경력</span>
                <span className={styles.infoValue}>{careerText}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>최고 그레이드</span>
                <span className={styles.infoValue}>
                  <GradeBadge grade={crew.highestGrade} />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 클라이밍 능력 섹션 */}
        <div className={styles.section}>
          <div className={styles.climbingSkills}>
            <h2>퍼포먼스</h2>
            <FiveSidedPolygon skills={crew.climbingSkills} />
          </div>
        </div>

        {/* 등반 이력 섹션 */}
        {crew.climbingHistory && crew.climbingHistory.length > 0 && (
          <div className={styles.section}>
            <h2>등반 이력</h2>
            <div className={styles.climbingHistory}>
              <table className={styles.historyTable}>
                <tbody>
                  {crew.climbingHistory.slice(0, 4).map((entry, index) => (
                    <tr key={index}>
                      <td>{entry.route}</td>
                      <td>
                        <GradeBadge grade={entry.grade} />
                      </td>
                      <td>{entry.finishDate}</td>
                      <td>
                        {entry.link && (
                          <>
                            {entry.link.includes("instagram") && (
                              <a
                                href={entry.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.iconLink}
                              >
                                <Image 
                                  src="/instagram_icon.png"
                                  alt="Instagram"
                                  width={16}
                                  height={16}
                                />
                              </a>
                            )}
                            {entry.link.includes("youtube") && (
                              <a
                                href={entry.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.iconLink}
                              >
                                 <Image 
                                  src="/youtube_icon.png"
                                  alt="Youtube"
                                  width={16}
                                  height={16}
                                />
                              </a>
                            )}
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                  {crew.climbingHistory.length > 4 && (
                    <tr>
                      <td colSpan={4} className={styles.truncatedRow}>
                        ...
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
