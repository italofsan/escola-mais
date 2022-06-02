import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { User } from "../../types";

import { useStyles } from "./styles";

type CardUserProps = {
  user: User;
};

export const CardUser = ({ user }: CardUserProps) => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {user.username}
        </Typography>
        <Typography variant="h5" component="h2">
          {user.name}
        </Typography>
        <Typography className={classes.textEmail} color="textSecondary">
          {user.email}
        </Typography>
        <Typography variant="body2" component="p">
          {user.company.catchPhrase}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="text"
          className={classes.buttonGoFoward}
          onClick={() => navigate(`/users/${user.id}`)}
        >
          To do list
        </Button>
      </CardActions>
    </Card>
  );
};
