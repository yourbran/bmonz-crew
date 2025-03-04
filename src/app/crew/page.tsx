"use client";

import CrewList from "@/components/CrewList";
import styles from "../../styles/Page.module.css";

export default function CrewPage() {
  return (
    <main>
      <div className={styles.pageContainer}>
        <h3 className={styles.title}>멤버소개</h3>
        <CrewList />
      </div>
    </main>
  );
}
