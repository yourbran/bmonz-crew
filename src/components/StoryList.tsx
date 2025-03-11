import StoryCard from "./StoryCard";
import styles from "@/styles/StoryList.module.css";
import stories from "@/data/stories.json";

export default function StoryList() {
    const sortedStories = [...stories].sort((a, b) => b.id - a.id); // 스토리 역순 정렬
    return (
        <div className={styles.cardGrid}>
            {sortedStories.map((story) => (
                <StoryCard key={story.id} story={story} />
            ))}
        </div>
    );
}