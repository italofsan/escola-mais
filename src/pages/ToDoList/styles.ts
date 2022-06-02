import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    goBackContainer: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      height: 50,
      marginLeft: theme.spacing(3),
    },
    addTodoContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: 100,
    },
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
