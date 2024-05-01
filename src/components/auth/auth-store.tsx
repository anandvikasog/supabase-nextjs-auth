"use client";

import { logIn } from "@/store/Features/auth/authSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const AddAuthData = ({ userData }: { userData: any }) => {
  const dispatch = useDispatch();
  const { user_metadata, id } = userData;

  useEffect(() => {
    dispatch(
      logIn({
        email: user_metadata?.email,
        name: user_metadata?.name,
        id: id,
      })
    );
  }, []);
  return <></>;
};

export default AddAuthData;
