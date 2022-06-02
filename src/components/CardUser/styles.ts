import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: 275,
      margin: theme.spacing(2),
    },
    title: {
      fontSize: 14,
    },
    textEmail: {
      marginBottom: 12,
    },
    buttonGoFoward: {
      color: "rgb(216,48,138)",
    },
  })
);
