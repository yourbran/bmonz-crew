"use client";

import StoryCard from "./StoryCard";
import stories from "@/data/stories.json";

type StoryListProps = {
    styles: Record<string,string>;
    cardStyles: Record<string,string>;
};

export default function StoryList( { styles, cardStyles }: StoryListProps ) {
    const sortedStories = [...stories].sort((a, b) => b.id - a.id); // 스토리 역순 정렬
    return (
        <div className={styles.cardGrid}>
            {sortedStories.map((story) => (
                <StoryCard key={story.id} story={story} styles={cardStyles} />
            ))}
        </div>
    );
}