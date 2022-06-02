import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    titleContainer: {
      display: "flex",
      justifyContent: "center",
    },
  })
);
