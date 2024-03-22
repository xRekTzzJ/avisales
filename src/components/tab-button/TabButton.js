import { useDispatch, useSelector } from 'react-redux';

import classes from '../../index.module.scss';

const TabButton = ({ title, name }) => {
  const dispatch = useDispatch();
  const activeTabButton = useSelector((state) => state.tabs.activeTabButton);
  const onButtonClick = () => {
    dispatch({ type: name });
    dispatch({ type: `GET_${name.toUpperCase()}` });
  };
  let styles =
    activeTabButton === name
      ? `${classes['tabs__button']} ${classes['tabs__button_active']}`
      : `${classes['tabs__button']}`;

  return (
    <button className={styles} onClick={onButtonClick}>
      {title}
    </button>
  );
};
export default TabButton;
