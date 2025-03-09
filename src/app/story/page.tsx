"use client";

import styles from "@/styles/Story.module.css";
import Image from "next/image";
import stories from "@/data/stories.json";

export default function Story() {
  return (
    <main className={styles.pageContainer}>
      <h2 className={styles.title}>이야기</h2>
      <div className={styles.storyList}>
        {stories.map((story) => (
          <div key={story.id} className={styles.storyCard}>
            <div className={styles.storyImageWrapper}>
              <Image 
                src={story.image} 
                alt={story.title} 
                width={320}  // 가로 40%에 맞는 적절한 크기
                height={180} // 비율 유지
                className={styles.storyImage}
                priority
              />
            </div>
            <div className={styles.storyContent}>
              <h2>{story.title}</h2>
              <p>{story.description}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
