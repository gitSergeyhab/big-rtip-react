import { Link } from 'react-router-dom';
import Sort from '../sort/sort';
import { AppRoute } from '../../const';


export default function NotFoundPage(): JSX.Element {
  return (


    <main className="page-body__page-main  page-main">
      <div className="page-body__container">
        <section className="trip-events">
          <h2 className="visually-hidden">Trip events</h2>
          <Sort/>
          <div style={{textAlign: 'center', color: 'darkblue', paddingTop: '10%'}}>
            <div style={{ paddingBottom: '33px'}}>Not Found Page</div>

            <Link to={AppRoute.Main} style={{color: 'orange', paddingTop: '33px', fontWeight: 'bold', fontSize: '1.2em'}}>
                To The Main Page
            </Link>
          </div>

        </section>
      </div>
    </main>
  );
}
