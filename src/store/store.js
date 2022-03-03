import {configureStore} from '@reduxjs/toolkit';
import mainReducer from './mainReducer';
import categoriesReducer from './Category/categories';
import ecommerceReducer from './Category/ecommerce';
import teamReducer from './Category/team';
import brandReducer from './Category/brand';
import propertyReducer from './Category/property';
import featureReducer from './Category/feature';
import storeReducer from './Category/stores';
import productReducer from './Category/product';
import newReducer from './Category/new';
import userReducer from './Category/user';
import authReducer from './Category/auth';
import eventsReducer from './Category/event';
import voucherReducer from './Category/vouchers';
import notificationsReducer from './Category/notifications';
import { IntlReducer as Intl } from 'react-redux-multilingual';

const store = configureStore({
    reducer: {
        mainReducer: mainReducer,
        ecommerceReducer:ecommerceReducer,
        categoriesReducer:categoriesReducer,
        teamReducer:teamReducer,
        brandReducer:brandReducer,
        propertyReducer:propertyReducer,
        featureReducer:featureReducer,
        storeReducer:storeReducer,
        productReducer:productReducer,
        newReducer:newReducer,
        userReducer:userReducer,
        authReducer:authReducer,
        eventsReducer:eventsReducer,
        voucherReducer:voucherReducer,
        notificationsReducer:notificationsReducer,
        Intl
    },
    preloadedState: { Intl: { locale: 'vi'}}
});

export default store;