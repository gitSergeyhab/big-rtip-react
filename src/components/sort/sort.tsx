import { useDispatch } from 'react-redux';
import { setDisplayPoints, setSortType } from '../../store/actions';
import { SortType } from '../../const';


function SortOption ({sortType} : {sortType: SortType}): JSX.Element {

  const id = `sort-${sortType}`;

  const dispatch = useDispatch();

  const handleSortChange = () => {
    dispatch(setSortType(sortType));
    dispatch(setDisplayPoints());
  };

  const disabled = sortType === SortType.Event || sortType === SortType.Offers;

  return (
    <div className={`trip-sort__item  trip-sort__item--${sortType}`}>
      <input
        onChange={handleSortChange}
        defaultChecked={sortType === SortType.Day}
        id={id} value={id} disabled={disabled}
        className="trip-sort__input  visually-hidden" type="radio" name="trip-sort"
      />
      <label className="trip-sort__btn" htmlFor={id}>{sortType}</label>
    </div>
  );
}


export default function Sort(): JSX.Element {

  const sortList = [SortType.Day, SortType.Event, SortType.Time, SortType.Price, SortType.Offers]
    .map((sort) => <SortOption sortType={sort} key={sort}/>) ;

  return (
    <form className="trip-events__trip-sort  trip-sort" action="#" method="get">

      {sortList}

    </form>
  );
}
