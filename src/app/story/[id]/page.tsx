"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import stories from "@/data/stories.json";
import styles from "@/styles/StoryDetail.module.css";

export default function StoryDetail({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params); // ✅ React.use()로 params 비동기 처리

  const story = stories.find((s) => s.id === Number(id)); // ✅ id를 Number로 변환하여 비교

  if (!story) {
    return <p>이야기를 찾을 수 없습니다.</p>;
  }

  return (
    <div className={styles.container}>
      <h2>{story.title}</h2>
      <p>{story.description}</p>
      <button onClick={() => router.back()}>뒤로 가기</button>
    </div>
  );
}
