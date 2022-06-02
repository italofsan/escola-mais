import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    titleContainer: {
      display: "flex",
      justifyContent: "center",
    },
    titleText: {
      fontSize: 42,
      fontWeight: 700,

      marginTop: 12,
    },
  })
);
