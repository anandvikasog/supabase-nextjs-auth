"use client";

import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import { Controller, useForm } from "react-hook-form";
import { z as zod } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormHelperText } from "@mui/material";
import CustomButton from "@/components/common/custom-button";
import { useDispatch, useSelector } from "react-redux";
import { useAction } from "@/hooks/use-action";
import updateUser from "@/lib/actions/updateUser";
import { toast } from "react-toastify";
import { updateData } from "@/store/Features/auth/authSlice";

const schema = zod.object({
  name: zod.string().min(1, { message: "Required" }),
});

type Values = zod.infer<typeof schema>;

const defaultValues = {
  name: "",
} satisfies Values;

export function UpdateNameForm(): React.JSX.Element {
  const dispatch = useDispatch();
  const { name } = useSelector((store: any) => store.auth);
  const { execute, loading } = useAction();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  React.useEffect(() => {
    reset({ name });
  }, [name]);

  const watcher = watch();

  const submitHandler = async (data: Values) => {
    let result: any = await execute(updateUser, [
      { data: { name: data?.name } },
    ]);
    if (!result) return;
    dispatch(updateData({ name: data.name }));
    toast.success("Name changed");
  };
  return (
    <Card>
      <form onSubmit={handleSubmit(submitHandler)}>
        <CardHeader subheader="Update name" title="Name" />
        <Divider />
        <CardContent>
          <Stack spacing={3} sx={{ maxWidth: "sm" }}>
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
          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <CustomButton
            disabled={watcher.name === name || loading}
            loading={loading}
            type="submit"
            variant="contained"
          >
            Update
          </CustomButton>
        </CardActions>
      </form>
    </Card>
  );
}
