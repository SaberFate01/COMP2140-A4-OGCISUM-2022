import React, {useState, createContext} from 'react';

//A list of global useContext that is used to sync/pass data across the various components
export const Context = React.createContext();
export const TextContext = React.createContext(null);
export const LocationContext = React.createContext(null);
export const LocationNameContext = React.createContext(null);
export const LocationDistrictContext = React.createContext(null);
export const NearContext = React.createContext(null);
export const DistanceContext = React.createContext(false);
export const LocationIdContext = React.createContext(null);
export const LocationToSampleContext = React.createContext(null);
export const SampleIdContext = React.createContext(null);
