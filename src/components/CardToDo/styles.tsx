import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
} from "@material-ui/core/styles";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import { green } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      display: "flex",
      flexDirection: "column",
      height: 170,
      margin: theme.spacing(2),
      justifyContent: "space-between",
    },
    statusContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    title: {
      fontSize: 14,
    },

    buttonDelete: {
      color: "rgb(216,48,138)",
    },
  })
);

export const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);
