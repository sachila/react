import React from "react";
import { Provider } from "react-redux";
import { applyMiddleware, createStore, Store } from "redux";
import thunk from "redux-thunk";
import { MainPage } from "../pages/MainPage";
import { DispatchType } from "../store/dispatch";
import { InitialState } from "../store/initialState";
import reducer from "../store/reducer";
import { AppActions } from "../store/types";

export const RootProvider: React.FC = () => {
  const store: Store<InitialState, AppActions> & {
    dispatch: DispatchType;
  } = createStore(reducer, applyMiddleware(thunk));

  return (
    <Provider store={store}>
      <MainPage />
    </Provider>
  );
};
