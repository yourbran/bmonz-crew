"use client";

import CrewCard from "./CrewCard";
import styles from "@/styles/CrewList.module.css";


export default function CrewList({ crewData }: { crewData: any[]}) {
  return (
    <div className={styles.cardGrid}>
      {crewData.map((crew: any) => (
        <CrewCard key={crew.crew_id} crew={crew} />
      ))}
    </div>
  );
}
