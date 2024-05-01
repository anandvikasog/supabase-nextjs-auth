"use client";

import React from "react";
import SpinnerLoader from "./spinner-loader";
import { Button, ButtonProps } from "@mui/material";

type CustomButtonProps = ButtonProps & {
  loading?: boolean;
  handler?: () => any;
};

const CustomButton = ({
  disabled,
  children,
  handler = () => {},
  loading = false,
  ...rest
}: CustomButtonProps) => {
  const loadingComponent = (
    <>
      <SpinnerLoader />
    </>
  );
  return (
    <Button disabled={disabled} onClick={handler} {...rest}>
      {loading ? loadingComponent : children}
    </Button>
  );
};

export default CustomButton;
