"use client";

import CrewList from "@/components/CrewList";
import styles from "../../styles/Crew.module.css";

export default function CrewPage() {
  return (
    <main>
      <div className={styles.pageContainer}>
        <h2 className={styles.title}>멤버소개</h2>
        <CrewList />
      </div>
    </main>
  );
}
