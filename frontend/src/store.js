import { combineReducers, applyMiddleware, legacy_createStore } from "redux";
// import { configureStore } from '@reduxjs/toolkit'
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { legacy_createStore as createStore } from 'redux';

import { adminReducer } from "./reducers/adminReducer";
import { deliveryboyReducer,newDeliveryBoyReducer,deleteReducer, singledeliveryboyReducer,u } from "./reducers/deliveryBoyReducer";
import { getTouchReducer } from "./reducers/getTouchReducer";
import { customerReducer } from "./reducers/customerReducer";
import { questionReducer } from "./reducers/questionReducer";
import { cuisinesReducer,deletecuisinesReducer } from "./reducers/cuisinesReducer";
import { restaurantReducer,restaurantLoginReducer, ProfileReducer, forgotPasswordReducer } from "./reducers/restaurantReducer"

const reducer = combineReducers({
    admin:adminReducer,
    gettouch:getTouchReducer,
    customer:customerReducer,
    question:questionReducer,
    cuisines:cuisinesReducer,
    deleteCuisines:deletecuisinesReducer,

    //Delivery Boy
    deliveryboy:deliveryboyReducer,
    newDeliveryBoy:newDeliveryBoyReducer,
    deleteDeliveryBoy:deleteReducer,
    singleDeliveryBoy:singledeliveryboyReducer,
    
    restaurantDetail:restaurantLoginReducer,
});

let initialState = {

};

const middleware = [thunk];
const store = legacy_createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;