"use client";

import * as React from "react";
import RouterLink from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import Alert from "@mui/material/Alert";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import Link from "@mui/material/Link";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Controller, useForm } from "react-hook-form";
import { z as zod } from "zod";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { paths } from "@/paths";
import signup from "@/lib/actions/signup";
import { toast } from "react-toastify";
import { useAction } from "@/hooks/use-action";
import CustomButton from "../common/custom-button";
import Image from "next/image";
import { Grid } from "@mui/material";

const schema = zod.object({
  name: zod.string().min(1, { message: "Required" }),
  email: zod.string().min(1, { message: "Required" }).email(),
  password: zod
    .string()
    .min(6, { message: "Password should be at least 6 characters" }),
  terms: zod
    .boolean()
    .refine((value) => value, "You must accept the terms and conditions"),
});

type Values = zod.infer<typeof schema>;

const defaultValues = {
  name: "",
  email: "",
  password: "",
  terms: false,
} satisfies Values;

export function SignUpForm(): React.JSX.Element {
  const [linkSent, setLinkSent] = React.useState<boolean>(false);
  const [targetEmail, setTargetEmail] = React.useState("");
  const { execute, loading } = useAction();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = async (data: Values) => {
    let result: any = await execute(signup, [data]);
    if (!result) return;
    result = JSON.parse(result);
    if (result?.error) {
      toast.error(result.error?.code || "Failed to signup");
      return;
    }
    if (result?.data?.user?.user_metadata?.email_verified === false) {
      setTargetEmail(result.data.user.user_metadata.email);
      toast.success("Email verification link is sent.");
      setLinkSent(true);
      reset();
      return;
    }
    toast.error("Email already registered.");
    return;
  };

  return (
    <Stack spacing={3}>
      {linkSent ? (
        <Grid
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Image
            src="/assets/success.png"
            alt="success image"
            height={200}
            width={200}
          />
          <Alert color="success">
            Email verification link is sent on{" "}
            <Typography variant="h6">{targetEmail}</Typography>
          </Alert>
          <CustomButton
            variant="outlined"
            component={RouterLink}
            href={paths.public.signIn}
            sx={{ marginTop: "20px" }}
            endIcon={<ArrowForwardIcon />}
          >
            Sign in
          </CustomButton>
        </Grid>
      ) : (
        <>
          <Stack spacing={1}>
            <Typography variant="h4">Sign up</Typography>
            <Typography color="text.secondary" variant="body2">
              Already have an account?{" "}
              <Link
                component={RouterLink}
                href={paths.public.signIn}
                underline="hover"
                variant="subtitle2"
              >
                Sign in
              </Link>
            </Typography>
          </Stack>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <FormControl error={Boolean(errors.name)}>
                    <InputLabel>Name</InputLabel>
                    <OutlinedInput {...field} label="Name" />
                    {errors.name ? (
                      <FormHelperText>{errors.name.message}</FormHelperText>
                    ) : null}
                  </FormControl>
                )}
              />
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <FormControl error={Boolean(errors.email)}>
                    <InputLabel>Email address</InputLabel>
                    <OutlinedInput
                      {...field}
                      label="Email address"
                      type="email"
                    />
                    {errors.email ? (
                      <FormHelperText>{errors.email.message}</FormHelperText>
                    ) : null}
                  </FormControl>
                )}
              />
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <FormControl error={Boolean(errors.password)}>
                    <InputLabel>Password</InputLabel>
                    <OutlinedInput
                      {...field}
                      label="Password"
                      type="password"
                    />
                    {errors.password ? (
                      <FormHelperText>{errors.password.message}</FormHelperText>
                    ) : null}
                  </FormControl>
                )}
              />
              <Controller
                control={control}
                name="terms"
                render={({ field }) => (
                  <div>
                    <FormControlLabel
                      control={<Checkbox {...field} />}
                      label={
                        <React.Fragment>
                          I have read the <Link>terms and conditions</Link>
                        </React.Fragment>
                      }
                    />
                    {errors.terms ? (
                      <FormHelperText error>
                        {errors.terms.message}
                      </FormHelperText>
                    ) : null}
                  </div>
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
                Sign up
              </CustomButton>
            </Stack>
          </form>
        </>
      )}
    </Stack>
  );
}
