import styles from "../styles/StoryCard.module.css";

interface StoryCardProps {
    title: string;
    content: string;
}

export default function StoryCard({ title, content }: StoryCardProps) {
    return (
        <div className={styles.storyCard}>
            <div className={styles.cardContent}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.content}>{content}</p>
            </div>
        </div>
    );
}