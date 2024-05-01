import CustomButton from "@/components/common/custom-button";
import { paths } from "@/paths";
import { Alert, Grid } from "@mui/material";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import RouterLink from "next/link";
import { Metadata } from "next";
import { config } from "@/config";

export const metadata = {
  title: `Email verified | ${config.site.name}`,
} satisfies Metadata;

const EmailVerified = async ({
  searchParams,
}: {
  searchParams: { code: string };
}) => {
  if (!searchParams?.code) {
    redirect(paths.private.dashboard);
  }

  return (
    <Grid
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Image
        src="/assets/success.png"
        alt="success image"
        height={200}
        width={200}
      />
      <Alert color="success">Email verified successfully.</Alert>
      <CustomButton
        variant="outlined"
        component={RouterLink}
        href={paths.private.dashboard}
        sx={{ marginTop: "20px" }}
        endIcon={<ArrowForwardIcon />}
      >
        Dashboard
      </CustomButton>
    </Grid>
  );
};

export default EmailVerified;
