import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classes from '../../index.module.scss';
import AviasalesService from '../../services/aviasales-service';
import Card from '../card';
const CardList = () => {
  const [totalTickets, setTotalTickets] = useState(5);
  const aviasalesApi = new AviasalesService();

  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.tickets.tickets);
  const activeTab = useSelector((state) => state.tabs.activeTabButton);
  const filterState = useSelector((state) => state.filter);

  useEffect(() => {
    const getData = async () => {
      await aviasalesApi.getTickets(await aviasalesApi.getSearchId());
      dispatch({ type: 'GET_CHEAPEST' });
    };
    getData();
  }, []);

  const filter = () => {
    const tabFilter = (arr = tickets) => {
      switch (activeTab) {
        case 'cheapest':
          return [...arr].sort((a, b) => {
            return a.price - b.price;
          });
        case 'fastest':
          return [...arr].sort((a, b) => {
            return a.segments[0].duration - b.segments[0].duration;
          });
        default:
          return [...arr];
      }
    };
    const checkboxFilter = () => {
      const all = filterState.All ? tabFilter() : [];
      const woTransfers =
        filterState.Wo && !filterState.All
          ? tabFilter().filter((i) => {
              return i.segments[0].stops.length === 0 && i.segments[1].stops.length === 0;
            })
          : [];
      const oneTransfer =
        filterState.One && !filterState.All
          ? tabFilter().filter((i) => {
              return i.segments[0].stops.length === 1 && i.segments[1].stops.length === 1;
            })
          : [];
      const twoTransfers =
        filterState.Two && !filterState.All
          ? tabFilter().filter((i) => {
              return i.segments[0].stops.length === 2 && i.segments[1].stops.length === 2;
            })
          : [];
      const threeTransfers =
        filterState.Three && !filterState.All
          ? tabFilter().filter((i) => {
              return i.segments[0].stops.length === 3 && i.segments[1].stops.length === 3;
            })
          : [];
      const filteredTickets = [...all, ...woTransfers, ...oneTransfer, ...twoTransfers, ...threeTransfers];
      return tabFilter(filteredTickets.length > 0 ? filteredTickets : tickets);
    };
    return checkboxFilter();
  };

  return (
    <div className={classes['card-list']}>
      {filter()
        .slice(0, totalTickets)
        .map((i, index) => {
          return <Card data={i} key={index} />;
        })}
      <button onClick={() => setTotalTickets(totalTickets + 5)}>показать еще 5 билетов!</button>
    </div>
  );
};

export default CardList;
