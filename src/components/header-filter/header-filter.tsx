import { useDispatch, useSelector } from 'react-redux';
import { FilterType, Page } from '../../const';
import { setDisplayPoints, setFilterType } from '../../store/actions';
import { getPage } from '../../store/top-reducer/top-reducer-selectors';

function Filter({filter}: {filter: FilterType}): JSX.Element {

  const id = `filter-${filter}`;

  const dispatch = useDispatch();
  const page = useSelector(getPage);

  const handleFilterChange = () => {
    dispatch(setFilterType(filter));
    dispatch(setDisplayPoints());
  };

  return (
    <div className="trip-filters__filter">
      <input
        disabled={page !== Page.Table}
        onChange={handleFilterChange}
        defaultChecked={filter === FilterType.Everything}
        id={id} className="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value={filter}
      />
      <label className="trip-filters__filter-label" htmlFor={id}>{filter}</label>
    </div>
  );
}

export default function HeaderFilter(): JSX.Element {

  const filters = [FilterType.Everything, FilterType.Future, FilterType.Past].map((item) => <Filter filter={item} key={item} />);
  return (
    <div className="trip-controls__filters">
      <h2 className="visually-hidden">Filter events</h2>
      <form className="trip-filters" action="#" method="get">

        {filters}

        <button className="visually-hidden" type="submit">Accept filter</button>
      </form>
    </div>
  );
}
