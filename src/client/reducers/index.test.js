import reducers from './index.js';

test('reducers', () => {
  let state;
  state = reducers({
    latest: {
      amount:1,
      isFetching:false,
      error:null,
      selected:[],
      rates:{}
    },
    historic: {
      isFetching:false,
      error:null,
      dailyRates:{}
    },
    routing: {
      location: {
        pathname:'/',
        search:'',
        hash:'',
        key:'rg6zqv'
      }
    }
  }, {
    type:'REQUEST_RATES'
  });

  expect(state).toEqual({
    latest: {
      amount:1,
      isFetching:true,
      error:null,
      selected:[],
      rates:{}
    },
    historic: {
      isFetching:false,
      error:null,
      dailyRates:{}
    },
    routing:{
      location: {
        pathname:'/',
        search:'',
        hash:'',
        key:'rg6zqv'
      }
    }
  });
});
