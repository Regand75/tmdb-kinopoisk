import styles from './LinearProgress.module.css'

type Props = {
  height?: number
}

export const LinearProgress = ({ height = 4 }: Props) => {
  return (
    <div className={styles.root} style={{ height }}>
      <div className={`${styles.bar} ${styles.indeterminate1}`} />
      <div className={`${styles.bar} ${styles.indeterminate2}`} />
    </div>
  )
}