import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    todoContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    todoContent: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      marginLeft: theme.spacing(2),
    },
  })
);
