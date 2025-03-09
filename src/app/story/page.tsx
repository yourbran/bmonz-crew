import StoryList from "@/components/StoryList";
import styles from "../../styles/Story.module.css";

export default function StoryPage() {
    return (
        <main>
            <div className={styles.pageContainer}>
                <h2 className={styles.title}>이야기</h2>
                <StoryList />
            </div>
        </main>
    );
}