import React from 'react';
import axios from 'axios';
import qs from 'qs';

import { list } from '../components/Sort';
import { useNavigate } from 'react-router-dom';

// import { selectFilter } from '../redux/slices/filterSlice.js';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice.js';

import Categories from '../components/Categories.jsx';
import PizzaBlock from '../components/pizzaBlock/PizzaBlock.jsx';
import Skeleton from '../components/pizzaBlock/Skeleton.jsx';
import Sort from '../components/Sort';
import Pagination from '../components/Pagination/index.jsx';
import { SearchContext } from '../App.js';

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter); // Он позволяет вам извлекать данные из хранилища Redux
  const sortType = sort.sortProperty;

  // const sortType = useSelector((state) => state.filter.sort.sortProperty);

  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  // const [currentPage, setCurrentPage] = React.useState(1); // Переснесли в redux toolkit пагинацию
  // const [categoryId, setCategortId] = React.useState(0);
  // const [sortType, setSortType] = React.useState({
  //   name: 'популярности',
  //   sort: 'raiting',
  // });

  const onChangeCategory = (id) => {
    console.log(id);
    dispatch(setCategoryId(id));
    // Передаём в хранилище изменения категории(categotyId)
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  // const fetchPizzas = () => {
  //   setIsLoading(true);
  //   const search = searchValue ? `&title=${searchValue}` : '';
  //   axios
  //     .get(
  //       `https://66e7067a17055714e58b44ff.mockapi.io/items?page=${currentPage}&${
  //         categoryId > 0 ? `category=${categoryId}` : ''
  //       }&sortBy=${sortType}${search}&order=desc`,
  //     )
  //     .then((res) => {
  //       setItems(res.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // };

  // Если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      setIsLoading(true);
      const search = searchValue ? `&title=${searchValue}` : '';
      axios
        .get(
          `https://66e7067a17055714e58b44ff.mockapi.io/items?page=${currentPage}&${
            categoryId > 0 ? `category=${categoryId}` : ''
          }&sortBy=${sortType}${search}&order=desc`,
        )
        .then((res) => {
          setItems(res.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  //Если был первый рендер, то проверяем URl-параметры и сохраняем в редуксе
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  const pizzas = items.map(
    (
      obj, // получаем пиццы на сайте
    ) => (
      <PizzaBlock
        key={obj.id}
        id={obj.id}
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
      <h2 className="content__title">Наши пиццы</h2>
      <div className="content__items">
        {isLoading ? [...new Array(6)].map((_, index) => <Skeleton key={index} />) : pizzas}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
