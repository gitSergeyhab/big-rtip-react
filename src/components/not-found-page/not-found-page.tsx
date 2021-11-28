import HeaderFilter from '../header-filter/header-filter';
import HeaderNav from '../header-nav/header-nav';
import Sort from '../sort/sort';

export default function NotFoundPage(): JSX.Element {
  return (

    <>
      <header className="page-header">
        <div className="page-body__container  page-header__container">
          <img className="page-header__logo" src="img/logo.png" width="42" height="42" alt="Trip logo"/>

          <div className="trip-main">

            <section className="trip-main__trip-info  trip-info">
              <div className="trip-info__main">
                <h1 className="trip-info__title">.... &mdash; ... &mdash; ....</h1>

                <p className="trip-info__dates">...&nbsp;&mdash;&nbsp;...</p>
              </div>

              <p className="trip-info__cost">
              Total: &euro;&nbsp;<span className="trip-info__cost-value">...</span>
              </p>
            </section>

            <div className="trip-main__trip-controls  trip-controls">

              <HeaderNav/>

              <HeaderFilter/>

            </div>

            <button
              className="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button"
              disabled
            >
            New event
            </button>
          </div>
        </div>
      </header>

      <main className="page-body__page-main  page-main">
        <div className="page-body__container">
          <section className="trip-events">
            <h2 className="visually-hidden">Trip events</h2>
            <Sort/>


          </section>
        </div>
      </main>
    </>
  );
}
