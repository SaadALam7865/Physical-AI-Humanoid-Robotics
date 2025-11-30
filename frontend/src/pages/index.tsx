import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Physical AI & Humanoid Robotics Textbook">
      
      <main className={styles.heroSection}>
        <div className={styles.container}>
          {/* Text Content */}
          <div className={styles.content}>
            <Heading as="h1" className={styles.bookTitle}>
              Physical AI &<br />Humanoid Robotics
            </Heading>
            <Link
              className={styles.startReadingBtn}
              to="/docs/part-1-foundations-lab/chapter-1-embodied-ai">
              Start Reading
            </Link>
          </div>

          {/* Image Content */}
          <div className={styles.imageContainer}>
            <img 
              src="img/home.jpg" 
              alt="Physical AI Textbook Cover" 
              className={styles.homeImage}
            />
          </div>
        </div>
      </main>
    </Layout>
  );
}