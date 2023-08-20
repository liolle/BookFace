import React from 'react';
import { useState, useEffect, lazy, Suspense } from 'react';
import { Route, Navigate, Outlet, useNavigate } from 'react-router-dom';
import Loading from '../Pages/Loading';

const DEVELOP = "http://localhost:3535"
const PRODUCTION = "https://book-face-backend.vercel.app"

const PrivateRoute = () => {
  const [auth, setAuth] = useState<boolean | null>(null);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchAuth = async () => {
      const authRoute = PRODUCTION + "/login/auth";
      let options = {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("VAToken") || ""}`,
          'accept': 'application/json',
          'Content-Type': 'application/json',

        },
        credentials: 'include' as RequestCredentials
      }
      const res = await fetch(authRoute, options);
      setTimeout(() => {

        res.status === 200 ? setAuth(true) : setAuth(false);
      }, 500);
    };


    fetchAuth();

  }, []);

  if (auth === null) {
    return (
        <Loading />
    )
  }

  return auth ? <Outlet /> : <Navigate to="/Login" />

};

export default PrivateRoute