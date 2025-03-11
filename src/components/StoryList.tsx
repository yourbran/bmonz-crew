import StoryCard from "./StoryCard";
import styles from "../styles/StoryList.module.css";
import stories from "../data/stories.json";

export default function StoryList() {
    return (
        <div className={styles.cardGrid}>
            {stories.map((story) => (
                <StoryCard key={story.id} story={story} />
            ))}
        </div>
    );
}