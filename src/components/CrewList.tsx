"use client";

import CrewCard from "./CrewCard";
import { Crew } from "@/types/crew";

type CrewListProps = {
  crewData: Crew[];
  crewListStyles: Record<string, string>;
  crewCardStyles?: Record<string, string>;
};

export default function CrewList({ crewData, crewListStyles, crewCardStyles }: CrewListProps) {
  return (
    <div className={crewListStyles.cardGrid}>
      {crewData.map((crew) => (
        <CrewCard key={crew.crew_id} crew={crew} styles={crewCardStyles}/>
      ))}
    </div>
  )
}
