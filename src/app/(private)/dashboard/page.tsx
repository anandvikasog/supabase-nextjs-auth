import * as React from "react";
import type { Metadata } from "next";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { config } from "@/config";
import { UpdatePasswordForm } from "@/components/dashboard/settings/update-password-form";
import { UpdateNameForm } from "@/components/dashboard/settings/update-name-form";
import { Grid } from "@mui/material";

export const metadata = {
  title: `Settings | ${config.site.name}`,
} satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <Grid>
        <Typography variant="h4">Profile</Typography>
      </Grid>
      <Grid container>
        <Grid xs={12} md={6} item sx={{ padding: "10px" }}>
          <UpdateNameForm />
        </Grid>
        <Grid xs={12} md={6} item sx={{ padding: "10px" }}>
          <UpdatePasswordForm />
        </Grid>
      </Grid>
    </Stack>
  );
}
