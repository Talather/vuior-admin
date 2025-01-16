import styles from './topBar.module.css';

export default function TopBarComponent({ title }) {
  return (
    <div className={styles.topBar}>
      <h1 className={styles.title}>{title}</h1>
    </div>
  );
}
