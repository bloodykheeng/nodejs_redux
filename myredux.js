/*
const express = require("express");
const app = express();
const redux = require("redux");

const createStore = redux.createStore;

app.get("/", (req, res) => {
  res.send("hello world");
});

const buycake = () => {
  return {
    type: "buycake",
  };
};

const initialState = { numOfCakes: 10 };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "buycake":
      return { ...state, numOfCakes: state.numOfCakes - 1 };
    default:
      return state;
  }
};

const store = createStore(reducer);
console.log("initial state is : ", store.getState());
const unsubscribe = store.subscribe(() =>
  console.log("updated state", store.getState())
);
store.dispatch(buycake());
store.dispatch(buycake());
store.dispatch(buycake());
unsubscribe();

app.listen(3000, () => {
  console.log("server started on port 3000");
});
*/
/*
const app = require("express")();
const redux = require("redux");
const createStore = redux.createStore;

const port = 3000;

const buycake = () => {
  return {
    type: "buycake",
    payload: 1,
  };
};

const initialState = { numOfCakes: 10 };

const cakeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "buycake":
      return { ...state, numOfCakes: state.numOfCakes - action.payload };
    default:
      return state;
  }
};

const store = createStore(cakeReducer);
const unsubscribe = store.subscribe(() =>
  console.log("store state is : ", store.getState())
);
store.dispatch(buycake());
store.dispatch(buycake());
store.dispatch(buycake());
unsubscribe();

app.listen(3000, () => console.log("server started on port 3000"));
*/

//const { default: axios } = require("axios");

// const redux = require("redux");
// const reduxLogger = require("redux-logger");
// const axios = require("axios");

// const logger = reduxLogger.createLogger();
// const applyMiddleware = redux.applyMiddleware;

// const createStore = redux.createStore;
// const combineReducers = redux.combineReducers;

// app.use(express.json());
// const users = [
//   { id: 1, name: "bloody" },
//   { id: 2, name: "kheeng" },
// ];
// app.get("/users", (req, res) => {
//   res.json(users);
// });

// // axios
// //   .get("http://localhost:3000/users")
// //   .then((response) => {
// //     console.log("axios response is : ", response.data);
// //   })
// //   .catch((err) => {
// //     console.log("axios error is : ", err);
// //   });

// const buycake = () => {
//   return {
//     type: "buycake",
//     payload: 1,
//   };
// };
// const buyicecream = () => {
//   return {
//     type: "icecream",
//     payload: 1,
//   };
// };

// const cakestate = { numOfCakes: 10 };
// const icecreamstate = { numOfIcecream: 10 };

// const icecreamReducer = (state = icecreamstate, action) => {
//   switch (action.type) {
//     case "icecream":
//       return { ...state, numOfIcecream: state.numOfIcecream - action.payload };
//     default:
//       return state;
//   }
// };

// const cakeReducer = (state = cakestate, action) => {
//   switch (action.type) {
//     case "buycake":
//       return { ...state, numOfCakes: state.numOfCakes - action.payload };
//     default:
//       return state;
//   }
// };

// const rootReducer = combineReducers({
//   cake: cakeReducer,
//   icecream: icecreamReducer,
// });

// const store = createStore(rootReducer, applyMiddleware(logger));
// //console.log("initial state is : ", store.getState());
// // const unsubscribe = store.subscribe(() => {
// //   console.log("initial state is : ", store.getState());
// // });
// // store.dispatch(buycake());
// // store.dispatch(buycake());
// // store.dispatch(buycake());
// // store.dispatch(buyicecream());
// // store.dispatch(buyicecream());
// // store.dispatch(buyicecream());

// //unsubscribe();

// // console.log(
// //   "The total number of cakes are : ",
// //   store.getState().cake.numOfCakes
// // );

// REDUX THUNK ASYNC FUNCTIONS

const axios = require("axios");
const initialState = {
  loading: false,
  data: [],
  error: "",
};
const fetchusersrequest = () => {
  return {
    type: "fetchusersrequest",
  };
};
const fetchuserssucces = (users) => {
  return {
    type: "fetchuserssucces",
    payload: users,
  };
};
const fetchuserserror = (err) => {
  return {
    type: "fetchuserserror",
    payload: err,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "fetchusersrequest":
      return {
        loading: true,
        data: [],
        error: "",
      };
    case "fetchuserssucces":
      return {
        loading: false,
        data: action.payload,
        error: "",
      };
    case "fetchuserserror":
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

const fetchusers = () => {
  return (dispatch) => {
    dispatch(fetchusersrequest());

    axios
      .get("http://localhost:300/users")
      .then((res) => {
        const users = res.data.map((user) => user.name);
        dispatch(fetchuserssucces(users));
      })
      .catch((err) => {
        dispatch(fetchuserserror(err.message));
      });
  };
};

const redux = require("redux");
const createStore = redux.createStore;

const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require("redux-thunk").default;

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
store.subscribe(() => console.log("store state is : ", store.getState()));
store.dispatch(fetchusers());
