"use client";

import CrewCard from "./CrewCard";
import styles from "@/styles/CrewList.module.css";
import { Crew } from "@/types/crew";

interface CrewListProps {
  crewData: Crew[];
}

export default function CrewList({ crewData }: CrewListProps) {
  return (
    <div className={styles.cardGrid}>
      {crewData.map((crew) => (
        <CrewCard key={crew.crew_id} crew={crew} />
      ))}
    </div>
  );
}
