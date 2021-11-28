import { FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { ActionTypeEP } from '../../const';
import { getOffers } from '../../store/offer-reducer/offer-reducer-selectors';
import { ExpPoint, OfferOption, Picture } from '../../types/types';


function EventOffer({selectedOffers, offer, state, setState} : ExpPoint & {selectedOffers: OfferOption[], offer: OfferOption} ):JSX.Element {

  const checked = !!selectedOffers.find((selectedOffer) => selectedOffer.title === offer.title);
  const id = `event-offer-luggage-${offer.title}`;

  const handleOfferChange = (evt: FormEvent<HTMLInputElement>) => {
    const selectedOfferTitles = selectedOffers.map((item) => item.title);

    const value = evt.currentTarget.value;
    const index = selectedOfferTitles.findIndex((item) => item === value);

    const payload = [...state.offers];
    if (index === -1) {
      payload.push(offer);
    } else {
      payload.splice(index, 1);
    }
    setState({type: ActionTypeEP.SetOffers, payload});
  };

  return (
    <div className="event__offer-selector">
      <input
        onChange={handleOfferChange}
        className="event__offer-checkbox  visually-hidden" id={id} type="checkbox" name="event-offer-luggage" value={offer.title}
        checked={checked}

      />
      <label className="event__offer-label" htmlFor={id}>
        <span className="event__offer-title">{offer.title}</span>
        &nbsp; + &euro; &nbsp;
        <span className="event__offer-price">{offer.price}</span>
      </label>
    </div>
  );
}


function Img({img} : {img: Picture}): JSX.Element {
  return <img className="event__photo" src={img.src} alt={img.description}/>;
}


export default function ExpandedPointDetails({state, setState} : ExpPoint): JSX.Element {
  const {destination, offers, type} = state;

  const serverOffers = useSelector(getOffers);
  const typeOffer = serverOffers.find((offer) => offer.type === type);
  const allOffers = typeOffer ? typeOffer.offers : [];
  const images = destination.pictures.map((item) => <Img img={item} key={item.src}/>);


  const eventOffers = allOffers.map((offer) => <EventOffer setState={setState} state={state} selectedOffers={offers} offer={offer} key={offer.title}/>);
  return (
    <section className="event__details">
      <section className="event__section  event__section--offers">
        <h3 className="event__section-title  event__section-title--offers">Offers</h3>

        <div className="event__available-offers">

          {eventOffers}

        </div>
      </section>

      <section className="event__section  event__section--destination">
        <h3 className="event__section-title  event__section-title--destination">Destination</h3>
        <p className="event__destination-description">

          {destination.description}

        </p>

        <div className="event__photos-container">
          <div className="event__photos-tape">

            {images}

          </div>
        </div>
      </section>
    </section>
  );
}
