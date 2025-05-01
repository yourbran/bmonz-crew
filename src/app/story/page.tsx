import StoryList from "@/components/StoryList";
import storyPageStyles from "@/styles/Story.module.css";
import storyListStyles from "@/styles/StoryList.module.css";
import storyCardStyles from "@/styles/StoryCard.module.css";

export default function StoryPage() {
    return (
        <main>
            <div className={storyPageStyles.pageContainer}>
                <h2 className={storyPageStyles.title}>이야기</h2>
                <StoryList styles={storyListStyles} cardStyles={storyCardStyles}/>
            </div>
        </main>
    );
}