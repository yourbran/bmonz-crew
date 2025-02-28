import CrewCard from "./CrewCard";
import crewData from "@/data/crew.json";
import styles from "@/styles/CrewList.module.css";

export default function CrewList() {
  return (
    <div className={styles.cardGrid}>
      {crewData.map((crew) => (
        <CrewCard key={crew.id} crew={crew} />
      ))}
    </div>
  );
}
