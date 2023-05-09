'use client'
import Link from 'next/link'
import Image from 'next/image'
import styles from './page.module.css'
// import { metadata } from './layout'
import levels from './levels'

const title = 'Faster Reflex! ⚡️'
const description = 'Can you beat your friends with a faster reflex? ⚡️'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          {description}
        </p>
        <div>
          <a
            href="https://www.youtube.com/watch?v=i4Hey5mShEA"
            target="_blank"
            rel="noopener noreferrer"
          >
            Reference
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <h1 className={styles.large}>⚡️</h1>
      </div>

      <div className={styles.column}>
        <p className={styles.line}>Training</p>

        <div className={styles.grid}>
          {levels.map((({ title, description, ms, emoji }, i) => {
            return (
              <Link key={i} href={`/play/${i}`} className={styles.card}>
                <h2>
                  {title} {ms}ms<span>-&gt;</span>
                </h2>
                <p>{description} {emoji}</p>
              </Link>    
            )
          }))}
        </div>
      </div>
    </main>
  )
}
