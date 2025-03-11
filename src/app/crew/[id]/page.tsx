"use client";

import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import crewData from "@/data/crew.json";
import Image from "next/image";
import styles from "@/styles/CrewDetail.module.css";

export default function CrewDetail() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id; // 배열이면 첫 번째 값 사용
  console.log("🔍 params.id:", id);

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
        <Image 
          src={crew.image || "/default-avatar.png"}
          alt={crew.name}
          width={150}
          height={150}
          style={{
            borderRadius: "50%",
            objectFit: "cover",
            backgroundColor: "#f0f0f0"
          }}
          priority={true}
        />
        <h1>{crew.name}</h1>
        <h2>{crew.role}</h2>
        <p>{crew.bio}</p>
      </motion.div>
    </div>
  );
}
