"use client";

import CrewList from "@/components/CrewList";
import styles from "../../styles/Page.module.css";

export default function CrewPage() {
  return (
    <main>
      <div className={styles.pageContainer}>
        <h2 className={styles.title}>Boulder Monsters</h2>
        <CrewList />
      </div>
    </main>
  );
}
