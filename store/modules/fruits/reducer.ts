const initialState = false;

const idReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "ADD_ID":
      const { id } = action;
      return id;

    default:
      return state;
  }
};

export default idReducer;
