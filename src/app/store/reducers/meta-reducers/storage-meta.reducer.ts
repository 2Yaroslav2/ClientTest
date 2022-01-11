import {ActionReducer} from "@ngrx/store";
import {State} from "../../index";
import {storageSync} from "@larscom/ngrx-store-storagesync";
import {BASKET_KEY, CURRENT_LANGUAGE_KEY, LANGUAGE_KEY} from "../../../shared/key/any.key";

export function storageSyncReducer(reducer: ActionReducer<State>): ActionReducer<State> {
  const metaReducer = storageSync<State>({
    version: 1,
    features: [
      { stateKey: BASKET_KEY },
      { stateKey: CURRENT_LANGUAGE_KEY}
    ],
    storageError: console.error,
    storage: window.localStorage
  });

  return metaReducer(reducer);
}
