"use client";

import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import { Alert } from "@mui/material";
import CustomButton from "@/components/common/custom-button";
import Link from "next/link";

export function UpdatePasswordForm(): React.JSX.Element {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Card>
        <CardHeader subheader="Update password" title="Password" />
        <Divider />
        <CardContent>
          <Alert severity="warning" color="warning">
            Changing password will make you logout. You have to login again
            after that.
          </Alert>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <CustomButton
            component={Link}
            href="/reset-password"
            variant="contained"
            // @ts-ignore
            target="_blank"
          >
            Update
          </CustomButton>
        </CardActions>
      </Card>
    </form>
  );
}
