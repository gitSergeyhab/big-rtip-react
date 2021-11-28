import { FormEvent, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActionTypeEP, NEW_POINT_ID } from '../../const';
import { openPoint } from '../../store/actions';
import { getCities, getDestinations } from '../../store/destinations-reducer/destinations-reducer-selectors';
import { ExpPoint } from '../../types/types';
import { createFlatPicker, getFullDateTime } from '../../utils/data-time-utils';
import { Instance } from 'flatpickr/dist/types/instance';
import { deletePointAction } from '../../store/api-actions';


// console.log('teat: ', /^\d+$/.test('2r2'));

const DIGIT = /^\d+$/;
export const capitalize = (str: string): string => `${str[0].toUpperCase()}${str.slice(1)}`;

export const PointType = {
  Taxi: 'taxi',
  Bus: 'bus',
  Train: 'train',
  Ship: 'ship',
  Drive: 'drive',
  Flight: 'flight',
  CheckIn: 'check-in',
  Sightseeing: 'sightseeing',
  Restaurant: 'restaurant',
};


function CloseEventBtn(): JSX.Element {

  const dispatch = useDispatch();
  const handleClosePointClick = () => dispatch(openPoint(null));

  return (
    <button
      onClick={handleClosePointClick}
      className="event__rollup-btn" type="button"
    >
      <span className="visually-hidden">Open event</span>
    </button>
  );
}

function CancelBtn(): JSX.Element {

  const dispatch = useDispatch();
  const handleClosePointClick = () => dispatch(openPoint(null));

  return (
    <button onClick={handleClosePointClick} className="event__reset-btn" type="reset">Cancel</button>
  );
}

function DeleteBtn({id, setErrorForm} : {id: string, setErrorForm: (status: boolean) => void }): JSX.Element {

  const [isDisable, setDisable] = useState(false);

  const unBlock = () => setDisable(false);

  const dispatch = useDispatch();

  const handleClosePointClick = () => {
    setDisable(true);
    dispatch(deletePointAction({id, unBlock, setErrorForm}));
  };

  return (
    <button
      onClick={handleClosePointClick}
      disabled={isDisable}
      className="event__reset-btn" type="reset"
    >
      {isDisable ? 'Deleting ...' : 'Delete'}
    </button>
  );
}


function EventType({pointType, labelTypeRef, state, setState} : {pointType: string, labelTypeRef: React.MutableRefObject<HTMLLabelElement | null>} & ExpPoint): JSX.Element {

  const id = `event-type-${pointType}-1`;
  const labelClasses = `event__type-label  event__type-label--${pointType}`;

  const handleTypeChange = () => {
    setState({type: ActionTypeEP.SetType, payload: pointType});
    setState({type: ActionTypeEP.SetOffers, payload: []});
    if (labelTypeRef.current) {
      labelTypeRef.current.click();
    }
  };


  return (
    <div className="event__type-item">
      <input
        id={id} className="event__type-input  visually-hidden" type="radio" name="event-type"
        value={pointType}
        onChange={handleTypeChange}
        checked={state.type === pointType}
      />
      <label className={labelClasses} htmlFor={id}>{capitalize(pointType)}</label>
    </div>
  );
}

function OptionCity({city}: {city: string}) {
  return <option value={city}></option>;
}


type ExdPointHeader = ExpPoint & {setErrorForm:(s: boolean) => void, saving: boolean}

export default function ExpandedPointHeader({state, setState, setErrorForm, saving} : ExdPointHeader): JSX.Element {

  const {id, basePrice, dateFrom, dateTo, destination, type} = state;

  const fullDateFrom = getFullDateTime(dateFrom);
  const fullDateTo = getFullDateTime(dateTo);

  const destinations = useSelector(getDestinations);
  const cities = useSelector(getCities);

  const options = cities.map((city) => <OptionCity city={city} key={city} />);

  const [errorPrice, setErrorPrice] = useState(false);
  const [errorDest, setErrorDest] = useState(state.id === NEW_POINT_ID);


  const labelTypeRef = useRef<HTMLLabelElement | null>(null);
  const destinationRef = useRef<HTMLInputElement | null>(null);
  const dateFromRef = useRef<HTMLInputElement | null>(null);
  const dateToRef = useRef<HTMLInputElement | null>(null);

  const setDateFrom = ([userDate] : [Date]) => setState({type: ActionTypeEP.SetDateFrom, payload: userDate});
  const setDateTo = ([userDate] : [Date]) => setState({type: ActionTypeEP.SetDateTo, payload: userDate});
  const dateLimitFrom = {maxDate: dateTo};
  const dateLimitTo = {minDate: dateFrom};


  useEffect(() => {
    const dateElement = dateFromRef.current;
    let picker: null | Instance = null;
    if (dateElement) {
      picker = createFlatPicker(dateElement,  dateFrom, setDateFrom, dateLimitFrom);
    }
    return function cleanup() {
      picker?.destroy();
    };
  });

  useEffect(() => {
    const dateElement = dateToRef.current;
    let picker: null | Instance = null;
    if (dateElement) {
      picker = createFlatPicker(dateElement,  dateTo, setDateTo, dateLimitTo);
    }
    return function cleanup() {
      picker?.destroy();
    };
  });


  const eventTypes = Object.values(PointType).map((pointType) =>
    <EventType pointType={pointType} key={pointType} labelTypeRef={labelTypeRef} state={state} setState={setState} /> );

  const eventTypeSrc = `img/icons/${type}.png`;

  const handleDestinationChange = () => {
    if (destinationRef.current && cities.some((city) => city === destinationRef.current?.value)) {
      const dest = destinations.find((item) => item.name === destinationRef.current?.value);
      setState({type: ActionTypeEP.SetDestination, payload: dest || state.destination});
      setErrorDest(false);

    } else {
      setErrorDest(true);
    }
  };

  const handlePriceChange = (evt: FormEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value;
    if (value && DIGIT.test(value)) {
      setState({type: ActionTypeEP.SetPrise, payload: +value});
      setErrorPrice(false);
    } else {
      setErrorPrice(true);
    }
  };


  return (
    <header className="event__header">
      <div className="event__type-wrapper">
        <label className="event__type  event__type-btn" htmlFor="event-type-toggle-1" ref={labelTypeRef}>
          <span className="visually-hidden">Choose event type</span>
          <img className="event__type-icon" width="17" height="17" src={eventTypeSrc} alt="Event type icon"/>
        </label>
        <input className="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox"/>

        <div className="event__type-list">
          <fieldset className="event__type-group">
            <legend className="visually-hidden">Event type</legend>

            {eventTypes}

          </fieldset>
        </div>
      </div>

      <div className="event__field-group  event__field-group--destination">
        <label className="event__label  event__type-output" htmlFor="event-destination-1">
          {type}
        </label>

        <input
          className="event__input  event__input--destination"
          id="event-destination-1" type="text" name="event-destination" list="destination-list-1"
          defaultValue={destination.name}
          ref={destinationRef}
          onChange={handleDestinationChange}
        />
        <datalist id="destination-list-1">

          {options}

        </datalist>
      </div>

      <div className="event__field-group  event__field-group--time">
        <label className="visually-hidden" htmlFor="event-start-time-1">From</label>

        <input
          className="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time"
          defaultValue={fullDateFrom}
          ref={dateFromRef}
        />
    &mdash;
        <label className="visually-hidden" htmlFor="event-end-time-1">To</label>
        <input
          className="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time"
          defaultValue={fullDateTo}
          ref={dateToRef}
        />
      </div>

      <div className="event__field-group  event__field-group--price">
        <label className="event__label" htmlFor="event-price-1">
          <span className="visually-hidden">Price</span>
      &euro;
        </label>
        <input
          onChange={handlePriceChange}
          className="event__input  event__input--price" id="event-price-1" type="text" name="event-price"
          defaultValue={basePrice}
        />
      </div>

      <button
        className="event__save-btn  btn  btn--blue" type="submit"
        disabled={saving || errorDest || errorPrice}
      >
        {saving ? 'Saving...' : 'Save'}
      </button>

      { id === NEW_POINT_ID ? <CancelBtn/> : <DeleteBtn id={id} setErrorForm={setErrorForm}/> }
      { id === NEW_POINT_ID ? null : <CloseEventBtn/> }

    </header>
  );
}
