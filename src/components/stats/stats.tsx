export default function Stats(): JSX.Element {
  return (
    <main className="page-body__page-main  page-main">
      <div className="page-body__container">
        <section className="trip-events  trip-events--hidden">
          <h2 className="visually-hidden">Trip events</h2>
        </section>

        <section className="statistics">
          <h2 className="visually-hidden">Trip statistics</h2>

          <div className="statistics__item">
            <canvas className="statistics__chart" id="money" width="900"></canvas>
          </div>

          <div className="statistics__item">
            <canvas className="statistics__chart" id="type" width="900"></canvas>
          </div>

          <div className="statistics__item">
            <canvas className="statistics__chart" id="time-spend" width="900"></canvas>
          </div>
        </section>
      </div>
    </main>
  );
}
