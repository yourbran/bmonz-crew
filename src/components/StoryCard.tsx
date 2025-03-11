"use client";

import { useRouter } from "next/navigation";
import styles from "@/styles/StoryCard.module.css";

export default function StoryCard({ story }: {story: {id: number, image: string}} ) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/story/${story.id}`);
  };

  const backgroundStyle = story.image
        ? { backgroundImage: `url(${story.image})`, backgroundSize: 'cover', backgroundPosition: 'center' } 
        : { backgroundColor: '#ccc' }; // 이미지가 없을 경우 회색 배경 적용

  return (
    <div 
        className={styles.cardContainer} 
        onClick={handleClick}
        style={backgroundStyle} // 카드 전체를 이미지로 채우기
    >
    </div>
  );
}