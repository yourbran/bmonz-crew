"use client";

import { useRouter } from "next/navigation";
import styles from "../styles/StoryCard.module.css";

export default function StoryCard({ story }: {story: {id: number, title: string, image: string, description: string}} ) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/story/${story.id}`);
  };

  return (
    <div className={styles.cardContainer} onClick={handleClick}>
      <div className={styles.cardContent}>
        <h2 className={styles.title}>{story.title}</h2>
        <p className={styles.content}>{story.description}</p>
      </div>
    </div>
  );
}