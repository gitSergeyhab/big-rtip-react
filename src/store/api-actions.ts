import { APIRoute } from '../const';
import { adaptPointToClient, adaptPointToServer } from '../services/adapters';
import { Destination, Offer, Point, ServerPoint, ThunkActionResult } from '../types/types';
import { loadDestinations, loadOffers, loadPoints, setDisplayPoints } from './actions';

const makeNewPoints = (newPoint: Point, oldPoints: Point[]): Point[] => {
  const index = oldPoints.findIndex((item) => item.id === newPoint.id);
  if (index === -1) {
    return [...oldPoints, newPoint];
  }

  return [...oldPoints.slice(0, index), newPoint, ...oldPoints.slice(index + 1)];
};

export const fetchPointsAction = (): ThunkActionResult =>
  async(dispatch, _getState, api) => {
    const {data} = await api.get<ServerPoint[]>(APIRoute.Points);
    const clientPoints = data.map((point) => adaptPointToClient(point));
    dispatch(loadPoints(clientPoints));
  };


export const fetchOffersAction = (): ThunkActionResult =>
  async(dispatch, _getState, api) => {
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    dispatch(loadOffers(data));
  };

export const fetchDestinationsAction = (): ThunkActionResult =>
  async(dispatch, _getState, api) => {
    const {data} = await api.get<Destination[]>(APIRoute.Destinations);
    dispatch(loadDestinations(data));
  };

type PutEditPoint = {point: Point, closeSave: () => void, setErrorForm: (status: boolean) => void, unBlock: () => void}

export const putEditPointAction = ({point, closeSave, setErrorForm, unBlock}: PutEditPoint): ThunkActionResult =>
  async(dispatch, getState, api) => {
    try {
      const {data} = await api.put<ServerPoint>(`${APIRoute.Points}/${point.id}`, adaptPointToServer(point));
      const oldPoints = getState().Point.points;
      const newPoint = adaptPointToClient(data);
      const newPoints = makeNewPoints(newPoint, oldPoints);
      dispatch(loadPoints(newPoints));
      dispatch(setDisplayPoints());
      closeSave();
    } catch {
      setErrorForm(true);
      setTimeout(() => setErrorForm(false), 1000);
      unBlock();
    }
  };

export const postNewPointAction = ({point, closeSave, setErrorForm, unBlock}: PutEditPoint): ThunkActionResult =>
  async(dispatch, getState, api) => {
    try {
      const {data} = await api.post<ServerPoint>(APIRoute.Points, adaptPointToServer(point));
      const oldPoints = getState().Point.points;
      const newPoint = adaptPointToClient(data);
      const newPoints = makeNewPoints(newPoint, oldPoints);
      dispatch(loadPoints(newPoints));
      dispatch(setDisplayPoints());
      unBlock();
      closeSave();
    } catch {
      setErrorForm(true);
      setTimeout(() => setErrorForm(false), 1000);
      unBlock();
    }
  };

type DeletePoint = {id: string, unBlock: () => void, setErrorForm: (status: boolean) => void}

export const deletePointAction = ({id, unBlock, setErrorForm}: DeletePoint): ThunkActionResult =>
  async (dispatch, getState, api) => {
    try {
      await api.delete(`${APIRoute.Points}/${id}`);
      const points = [...getState().Point.points];
      const index = points.findIndex((point) => point.id === id);
      points.splice(index, 1);
      dispatch(loadPoints(points));
      unBlock();
      dispatch(setDisplayPoints());
    } catch {
      unBlock();
      setErrorForm(true);
      setTimeout(() => setErrorForm(false), 1000);
    }
  };


type ChangeStatusPoint = {point: Point, setErrorForm: (status: boolean) => void}

export const changeFavoriteStatusAction = ({point, setErrorForm} : ChangeStatusPoint): ThunkActionResult =>
  async(dispatch, getState, api) => {
    try {
      const {data} = await api.put<ServerPoint>(`${APIRoute.Points}/${point.id}`, adaptPointToServer(point));
      const oldPoints = getState().Point.points;
      const newPoint = adaptPointToClient(data);
      const newPoints = makeNewPoints(newPoint, oldPoints);
      dispatch(loadPoints(newPoints));
      dispatch(setDisplayPoints());
    } catch {
      setErrorForm(true);
      setTimeout(() => setErrorForm(false), 1000);
    }
  };
