import BarLoader from 'react-spinners/BarLoader';
import { css } from '@emotion/react';

import HeaderInfo from '../header-info/header-info';
import HeaderNav from '../header-nav/header-nav';
import HeaderFilter from '../header-filter/header-filter';
import Sort from '../sort/sort';


const override = css`
  display: block;
  margin: 0 auto;
`;


export default function Spinner(): JSX.Element {
  return (
    <>
      <header className="page-header">
        <div className="page-body__container  page-header__container">
          <img className="page-header__logo" src="img/logo.png" width="42" height="42" alt="Trip logo"/>

          <div className="trip-main">

            <HeaderInfo/>

            <div className="trip-main__trip-controls  trip-controls">

              <HeaderNav/>

              <HeaderFilter/>

            </div>

            <button disabled>
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
            <div style={{textAlign: 'center', color: 'darkblue', paddingTop: '10%'}}>
              <div>Loading ...</div>

              <div style={{color: 'orange', paddingTop: '33px', fontWeight: 'bold', fontSize: '1.2em'}}>
                <BarLoader color='blue' loading css={override} height={6} width={233} />

              </div>
            </div>

          </section>
        </div>
      </main>
    </>
  );
}
