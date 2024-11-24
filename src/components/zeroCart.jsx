import React from 'react';
import zeroImgCart from '../assets/img/empty-cart.png';
import { Link } from 'react-router-dom';
export const ZeroCart = () => {
  return (
    <>
      <div class="cart cart--empty">
        <h2>
          Корзина пустая
          <span>😕</span>
        </h2>
        <p>
          Вероятней всего, вы не заказывали ещё пиццу. Для того, чтобы заказать пиццу, перейди на
          главную страницу.
        </p>
        <img src={zeroImgCart} alt="Empty cart"></img>
        <Link to="/" class="button button--black" href="/">
          <span>Вернуться назад</span>
        </Link>
      </div>
    </>
  );
};
