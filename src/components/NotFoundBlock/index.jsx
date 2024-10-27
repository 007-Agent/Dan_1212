import React from 'react';
import styles from './NotFoundBlock.module.scss';

export const NotFoundBlock = () => {
  return (
    <div>
      <h1 className={styles.root}>
        <span>Упс</span>
        Ничего не найдено: (
      </h1>
      <p className={styles.description}>
        К сожалению данная страница отсутствует в нашем интернет-магазине.
      </p>
    </div>
  );
};

export default NotFoundBlock;
