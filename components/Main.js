import React, { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import useRoute from '../router';
import db from "../firebase/config"
import { useDispatch, useSelector  } from "react-redux";
import { authStateChangeUser } from "../redux/auth/authOperation";



export default function Main(){
  const { stateChange } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []); 

  const routing = useRoute(stateChange);
  useEffect(() => {}, []);
  return <NavigationContainer>{routing}</NavigationContainer>;
};

