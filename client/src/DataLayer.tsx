import React, { createContext, useContext, useReducer,ReactNode} from "react";

export const DataLayerContext = createContext<[any, React.Dispatch<any>]>([{}, () => null]); // This is the DataLayerContext that we will use to wrap our app in the DataLayer

interface DataLayerProps {
  initialState: any;
  reducer: React.Reducer<any, any>;
  children:ReactNode;
}

export const DataLayer: React.FC<DataLayerProps> = ({ reducer, initialState, children }) => {
        return <DataLayerContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </DataLayerContext.Provider>;

};


export const UseDataLayerValue = () => useContext(DataLayerContext); // This is the hook that we will use to pull information from the DataLayer
