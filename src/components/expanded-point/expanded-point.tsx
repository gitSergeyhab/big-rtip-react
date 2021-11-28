import { FormEvent, useReducer, useState } from 'react';
import { useDispatch } from 'react-redux';

import ExpandedPointDetails from '../expanded-point-details/expanded-point-details';
import ExpandedPointHeader from '../expanded-point-header/expanded-point-header';
import { openPoint } from '../../store/actions';
import { postNewPointAction, putEditPointAction } from '../../store/api-actions';
import { Point } from '../../types/types';
import { ActionTypeEP, NEW_POINT_ID } from '../../const';

import './expanded-point.css';


const CLASS_SHAKE = 'shake';
const CLASSES_FORM_DEFAULT = 'event event--edit';


const init = (state: Point) => ({...state});

const reducer = (state: Point, action: {type: ActionTypeEP, payload: any}) => {
  switch (action.type) {
    case ActionTypeEP.SetPrise: return {...state, basePrice: action.payload};
    case ActionTypeEP.SetDateFrom: return {...state, dateFrom: action.payload};
    case ActionTypeEP.SetDateTo: return {...state, dateTo: action.payload};
    case ActionTypeEP.SetDestination: return {...state, destination: action.payload};
    case ActionTypeEP.SetFavorite: return {...state, isFavorite: action.payload};
    case ActionTypeEP.SetOffers: return {...state, offers: action.payload};
    case ActionTypeEP.SetType: return {...state, type: action.payload};
    default: return {...state};
  }
};

export default function ExpandedPoint({point} : {point: Point}): JSX.Element {

  const [state, setState] = useReducer(reducer, {...point}, init);
  const [errorForm, setErrorForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const dispatch = useDispatch();

  const closeSave = () => dispatch(openPoint(null));
  const unBlock = () => setSaving(false);

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    setSaving(true);
    if (point.id === NEW_POINT_ID) {
      dispatch(postNewPointAction({point: state, closeSave, setErrorForm, unBlock}));
    } else {
      dispatch(putEditPointAction({point: state, closeSave, setErrorForm, unBlock}));
    }
  };

  const formClasses = errorForm ? `${CLASSES_FORM_DEFAULT} ${CLASS_SHAKE}` : CLASSES_FORM_DEFAULT;

  return (
    <li className="trip-events__item">
      <form className={formClasses} action="#" method="post" onSubmit={handleSubmit}>

        <ExpandedPointHeader state={state} setState={setState} saving={saving} setErrorForm={setErrorForm}/>

        <ExpandedPointDetails state={state} setState={setState}/>

      </form>
    </li>
  );
}
