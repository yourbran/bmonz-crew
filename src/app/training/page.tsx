import Link from 'next/link';
import styles from '@/styles/Training.module.css';

export default function Page() {
  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.title}>No Train, No Gain</h2>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Link href="/training/register" className={styles.link}>훈련 등록</Link>
        </li>
        <li className={styles.item}>
          <Link href="/training/history" className={styles.link}>훈련 이력</Link>
        </li>
      </ul>
    </div>
  );
}
