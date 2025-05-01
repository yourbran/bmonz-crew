import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <main className={styles.container}> 
      <Image
        src="/home_logo.jpg"
        alt="로고"
        width={0} 
        height={0}
        sizes="30vw"
        style={{ width: "30vw", height: "auto" }} 
        priority
      />

      <div className={styles.hashTags}>
        <Link href="/crew" prefetch={false}><span>#멤버소개</span></Link>
        <Link href="/story" prefetch={false}><span>#이야기</span></Link>
      </div>
    </main>
  );
}