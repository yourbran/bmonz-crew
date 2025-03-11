"use client";

import { motion } from "framer-motion";
import { use } from "react";
import { useRouter } from "next/navigation";
import stories from "@/data/stories.json";
import styles from "@/styles/StoryDetail.module.css";

export default function StoryDetail({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);

  const story = stories.find((s) => s.id === Number(id));

  if (!story) {
    return <p>이야기를 찾을 수 없습니다.</p>;
  }

  return (
    <div className={styles.pageContainer}>
      <motion.div
        initial={{ opacity: 0, x: 50 }} // 페이지 진입 시 효과
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }} // 페이지 떠날 때 효과
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ textAlign: "center", padding: "20px" }}
      >
        <h2>{story.title}</h2>
        <p>{story.description}</p>
        <button onClick={() => router.back()}>뒤로 가기</button>
      </motion.div>
    </div>
  );
}
