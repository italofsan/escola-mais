import { Grid, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";

import { api } from "../../services/api";
import { User } from "../../types";

import { CardUser } from "../../components/CardUser";

import { useStyles } from "./styles";
import { errorMessage } from "../../components/Messages";

export const Home = () => {
  const classes = useStyles();
  const [users, setUsers] = useState<User[]>([]);

  const getUsers = async () => {
    try {
      const { data } = await api.get("users");
      setUsers(data);
    } catch (error) {
      console.log(error);
      errorMessage("It wasn't possible fetch users");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Grid container>
      <Grid item xs={12} className={classes.titleContainer}>
        <Typography className={classes.titleText}>To do list</Typography>
      </Grid>

      <Grid container>
        {users.map((user, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <CardUser user={user} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};
