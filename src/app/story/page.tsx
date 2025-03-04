"use client";

import Link from "next/link";
import stories from "@/data/stories.json"; // ✅ JSON 직접 import
import styles from "@/styles/Story.module.css";

export default function Story() {
  return (
    <div className={styles.container}>
      <h2>이야기</h2>
      <div className={styles.storyList}>
        {stories.map((story) => (
          <Link key={story.id} href={`/story/${story.id}`} className={styles.card}>
            <h3>{story.title}</h3>
            <p>{story.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
