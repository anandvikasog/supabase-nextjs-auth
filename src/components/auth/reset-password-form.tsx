"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import Alert from "@mui/material/Alert";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Controller, useForm } from "react-hook-form";
import { z as zod } from "zod";

import updateUser from "@/lib/actions/updateUser";
import logout from "@/lib/actions/logout";
import { Grid } from "@mui/material";
import { useAction } from "@/hooks/use-action";
import CustomButton from "../common/custom-button";
import { toast } from "react-toastify";

const schema = zod.object({
  password: zod
    .string()
    .min(6, { message: "Password should be at least 6 characters" }),
});

type Values = zod.infer<typeof schema>;

const defaultValues = { password: "" } satisfies Values;

export function ResetPasswordForm(): React.JSX.Element {
  const { execute, loading } = useAction();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = async (data: Values) => {
    let result: any = await execute(updateUser, [data]);
    if (!result) return;
    result = JSON.parse(result);
    // if (result?.error) {
    //   alert(result.error?.code || "Failed to change password");
    //   return;
    // }
    toast.success("Password changed");
    await logout();
  };

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
      <Stack width={500} spacing={4}>
        <Typography variant="h5">Change password</Typography>
        <Alert color="warning" severity="warning">
          You have to login again after the password is changed!
        </Alert>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <FormControl error={Boolean(errors.password)}>
                  <InputLabel>New Password</InputLabel>
                  <OutlinedInput {...field} label="Password" type="password" />
                  {errors.password ? (
                    <FormHelperText>{errors.password.message}</FormHelperText>
                  ) : null}
                </FormControl>
              )}
            />
            {errors.root ? (
              <Alert color="error">{errors.root.message}</Alert>
            ) : null}
            <CustomButton
              loading={loading}
              disabled={loading}
              type="submit"
              variant="contained"
            >
              Submit
            </CustomButton>
          </Stack>
        </form>
      </Stack>
    </Grid>
  );
}
