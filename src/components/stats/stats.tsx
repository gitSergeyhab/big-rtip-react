import ChartBar from '../chart-bar/chart-bar';
import { getCountType, getSumPrice, getSumTime } from '../../utils/stat-utils';
import { ChartName } from '../../const';


export default function Stats(): JSX.Element {
  return (
    <main className="page-body__page-main  page-main">
      <div className="page-body__container">

        <section className="trip-events  trip-events--hidden">
          <h2 className="visually-hidden">Trip events</h2>
        </section>

        <section className="statistics">
          <h2 className="visually-hidden">Trip statistics</h2>

          <ChartBar countFunction={getSumPrice} name={ChartName.Money} color='darkorange' text='dollars'/>
          <ChartBar countFunction={getCountType} name={ChartName.Type} color='darkblue' text='counts'/>
          <ChartBar countFunction={getSumTime} name={ChartName.Time} color='darkred' text='minutes'/>

        </section>
      </div>
    </main>
  );
}
