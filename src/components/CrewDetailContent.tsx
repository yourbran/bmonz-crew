'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import styles from "@/styles/CrewDetail.module.css";
import GradeBadge from "@/components/GradeBadge";
import FiveSidedPolygon from "@/components/FiveSidedPolygon";

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

interface CrewDetailContentProps {
  crew: Crew;
  skills: Skill[];
  history: History[];
}

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

// 새 DB 스킬 배열을 기존 FiveSidedPolygon이 요구하는 인터페이스 객체로 변환하는 함수
function convertSkills(skillsArray: Skill[]): {
    grip: number;
    balance: number;
    routeFinding: number;
    endurance: number;
    flexibility: number;
  } {
    // 기본값 0으로 초기화
    const converted = {
      grip: 0,
      balance: 0,
      routeFinding: 0,
      endurance: 0,
      flexibility: 0,
    };
    skillsArray.forEach((skill) => {
      // DB의 grip_nm 값이 "grip", "balance", "routeFinding", "endurance", "flexibility"와 일치한다고 가정
      const key = skill.grip_nm as keyof typeof converted;
      if (key in converted) {
        converted[key] = skill.score;
      }
    });
    return converted;
  }

export default function CrewDetailContent({ crew, skills, history }: CrewDetailContentProps) {
    const pathName = usePathname();
  
    // climbingStartDate를 바탕으로 경력을 계산
    const careerText = calculateCareer(crew.clmb_st_dt);

    // DB로부터 받아온 skills 배열을 FiveSidedPolygon이 요구하는 객체 형식으로 변환
    const convertedSkills = convertSkills(skills);

    // 최고 그레이드 계산
    const highestGrade = useMemo(() => {
        if (!history?.length) return "";
        // 숫자로 파싱하고 NaN인 항목은 걸러냅니다.
        const gradeNums = history
            .map(h => parseInt(h.grade, 10))
            .filter(n => !isNaN(n));
        if (gradeNums.length === 0) return "";
        const max = Math.max(...gradeNums);
        return `${max}`;
    }, [history]);

  
    return (
      <div className={styles.pageContainer}>
        <motion.div
          key={`${pathName}`} // '뒤로가기'를 통해 해당 페이지로 되돌아올 경우 정상적으로 렌더링 되도록 설정
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
                src={crew.prof_img} 
                alt={crew.crew_nm} 
                width={200} 
                height={200} 
                className={styles.profileImg}
              />
            </div>
          </div>
  
          {/* 인물 기본정보 섹션 */}
          <div className={styles.section}>
            <h2>멤버소개</h2>
            <div className={styles.basicInfo}>
              <div className={styles.infoList}>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>이름</span>
                  <span className={styles.infoValue}>{crew.crew_nm}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>직업</span>
                  <span className={styles.infoValue}>{crew.job_nm}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>클라이밍 경력</span>
                  <span className={styles.infoValue}>{careerText}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>최고 그레이드</span>
                  <span className={styles.infoValue}>
                    {highestGrade
                        ? <GradeBadge grade={highestGrade} />
                        : <span>정보 없음</span> /* 필요시 대체 문구 */
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
  
          {/* 클라이밍 능력 섹션 */}
          <div className={styles.section}>
          <h2>퍼포먼스</h2>
            <div className={styles.climbingSkills}>
              <FiveSidedPolygon skills={convertedSkills} />
            </div>
          </div>
  
          {/* 등반 이력 섹션 */}
          {history && history.length > 0 && (
            <div className={styles.section}>
              <h2>등반 이력</h2>
              <div className={styles.climbingHistory}>
                <table className={styles.historyTable}>
                  <tbody>
                    {history.slice(0, 4).map((entry, index) => (
                      <tr key={index}>
                        <td>{entry.route}</td>
                        <td>
                          <GradeBadge grade={entry.grade} />
                        </td>
                        <td>{entry.finish_date}</td>
                        <td>
                        {entry.link_url && entry.link_type === "instagram" && (
                            <a
                            href={entry.link_url}
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
                        {entry.link_url && entry.link_type === "youtube" && (
                            <a
                            href={entry.link_url}
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
                        </td>
                      </tr>
                    ))}
                    {history.length > 4 && (
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