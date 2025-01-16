import MessageComponent from '@/components/layout/message';
import TopBarComponent from '@/components/topBar/topBar';
import styles from './scroll.module.css';

export default function ScrollLayout({ children, title }) {
  return (
    <>
      <TopBarComponent title={title} />
      <div className={styles.scroll}>
        <MessageComponent />
        {children}
      </div>
    </>
  );
}
