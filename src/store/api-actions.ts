import { toast } from 'react-toastify';

import { adaptPointToClient, adaptPointToServer } from '../services/adapters';
import { Destination, Offer, Point, ServerPoint, ThunkActionResult } from '../types/types';
import { makeNewPoints } from '../utils/util';
import { loadDestinations, loadOffers, loadPoints, setDisplayPoints } from './actions';
import { APIRoute } from '../const';


enum ErrorMessage {
  FetchPointsAction = 'unable to upload events',
  FetchOffersAction = 'unable to upload offers',
  FetchDestinationsAction = 'unable to upload destinations',
  PutEditPointAction = 'unable to change the event',
  PostNewPointAction = 'unable to add new event',
  DeletePointAction = 'unable to remove the events',
  ChangeFavoriteStatusAction = 'unable to change status the event',
}

export const fetchPointsAction = (): ThunkActionResult =>
  async(dispatch, _getState, api) => {
    try {
      const {data} = await api.get<ServerPoint[]>(APIRoute.Points);
      const clientPoints = data.map((point) => adaptPointToClient(point));
      dispatch(loadPoints(clientPoints));
    } catch {
      toast.error(ErrorMessage.FetchPointsAction);
    }
  };


export const fetchOffersAction = (): ThunkActionResult =>
  async(dispatch, _getState, api) => {
    try {
      const {data} = await api.get<Offer[]>(APIRoute.Offers);
      dispatch(loadOffers(data));
    } catch {
      toast.error(ErrorMessage.FetchOffersAction);
    }
  };

export const fetchDestinationsAction = (): ThunkActionResult =>
  async(dispatch, _getState, api) => {
    try {
      const {data} = await api.get<Destination[]>(APIRoute.Destinations);
      dispatch(loadDestinations(data));
    } catch {
      toast.error(ErrorMessage.FetchDestinationsAction);
    }
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
      toast.error(ErrorMessage.PutEditPointAction);
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
      toast.error(ErrorMessage.PostNewPointAction);
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
      toast.error(ErrorMessage.DeletePointAction);
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
      toast.error(ErrorMessage.ChangeFavoriteStatusAction);
    }
  };
