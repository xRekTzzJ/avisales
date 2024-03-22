import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classes from '../../index.module.scss';
import Card from '../card';
const CardList = () => {
  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.tickets.tickets);
  const getSearchId = async () => {
    const res = await fetch('https://aviasales-test-api.kata.academy/search');
    const data = await res.json();
    dispatch({ type: 'GET_SEARCH_ID', payload: data });
    return data.searchId;
  };
  const getTickets = async (id) => {
    const res = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${id}`);
    const data = await res.json();
    dispatch({ type: 'GET_TICKETS', payload: data });
    return data;
  };

  useEffect(() => {
    const getTicketsAcync = async () => {
      await getTickets(await getSearchId());
    };
    getTicketsAcync();
  }, []);
  return (
    <div className={classes['card-list']}>
      {tickets.slice(0, 5).map((i) => {
        return <Card price={i.price} key={i.price} carrier={i.carrier} segments={i.segments} />;
      })}
      <button>показать еще 5 билетов!</button>
    </div>
  );
};

export default CardList;
