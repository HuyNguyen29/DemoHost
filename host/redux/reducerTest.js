const initialState = {
  data: {},
};

const testReducer = (state = initialState, action) => {
  const { payload } = action;

  switch (action.type) {
    case "TEST": {
      return {
        ...state,
        data: payload,
      };
    }
    default:
      return state;
  }
};

export default testReducer;
