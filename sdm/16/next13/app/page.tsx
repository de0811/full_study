import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  let name = 'SEO';
  return (
    <>
      <div>
        <h1 className={styles.title}>Welcome to my page!</h1>
        <h2 className="hello">hello</h2>
        <h2 className={styles.hello}>hello</h2>
        <h2 className={styles.hello}>{name}</h2>
      </div>
    </>
  );
}
