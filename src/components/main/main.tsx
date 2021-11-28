import Sort from '../sort/sort';
import Trip from '../trip/trip';
import { Point } from '../../types/types';


export default function Main({points} : {points: Point[]}): JSX.Element {

  return (
    <main className="page-body__page-main  page-main">
      <div className="page-body__container">
        <section className="trip-events">
          <h2 className="visually-hidden">Trip events</h2>

          <Sort/>

          <Trip points={points}/>

        </section>
      </div>
    </main>
  );
}
