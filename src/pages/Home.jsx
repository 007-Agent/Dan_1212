import React from 'react';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice.js';

import Categories from '../components/Categories.jsx';
import PizzaBlock from '../components/pizzaBlock/PizzaBlock.jsx';
import Skeleton from '../components/pizzaBlock/Skeleton.jsx';
import Sort from '../components/Sort';
import Pagination from '../components/Pagination/index.jsx';
import { SearchContext } from '../App.js';

export const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, sort } = useSelector((state) => state.filter); // Он позволяет вам извлекать данные из хранилища Redux
  const sortType = sort.sortProperty;
  // const sortType = useSelector((state) => state.filter.sort.sortProperty);

  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);
  // const [categoryId, setCategortId] = React.useState(0);
  // const [sortType, setSortType] = React.useState({
  //   name: 'популярности',
  //   sort: 'raiting',
  // });

  const onChangeCategory = (id) => {
    console.log(id);
    dispatch(setCategoryId(id)); // Передаём в хранилище изменения категории
  };

  React.useEffect(() => {
    setIsLoading(true);
    const search = searchValue ? `&title=${searchValue}` : '';

    // fetch(
    //   `https://66e7067a17055714e58b44ff.mockapi.io/items?page=${currentPage}&limit=4&${
    //     categoryId > 0 ? `category=${categoryId}` : ''
    //   }&sortBy=${sortType}${search}&order=desc`,
    // )
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((arr) => {
    //     if (Array.isArray(arr)) {
    //       setItems(arr);
    //     } else {
    //       setItems([]);
    //     }

    //     setIsLoading(false);
    //   });

    axios
      .get(
        `https://66e7067a17055714e58b44ff.mockapi.io/items?page=${currentPage}&${
          categoryId > 0 ? `category=${categoryId}` : ''
        }&sortBy=${sortType}${search}&order=desc`,
      )
      .then((res) => {
        setItems(res.data);

        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = items.map(
    (
      obj, // получаем пиццы на сайте
    ) => (
      <PizzaBlock
        key={obj.id}
        title={obj.title}
        price={obj.price}
        image={obj.imageUrl}
        sizes={obj.sizes}
        types={obj.types}
      />
    ),
  );
  // .filter((obj) => {
  //   if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
  //     return true;
  //   }
  //   return false;
  // })
  // .map((obj) => (
  //   <PizzaBlock
  //     key={obj.id}
  //     title={obj.title}
  //     price={obj.price}
  //     image={obj.imageUrl}
  //     sizes={obj.sizes}
  //     types={obj.types}
  //   />
  // ));

  // const sceletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />)

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? [...new Array(6)].map((_, index) => <Skeleton key={index} />) : pizzas}
      </div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
