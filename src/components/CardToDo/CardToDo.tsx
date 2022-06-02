import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core";
import { useTodo } from "../../hooks/useTodo";
import { Todo } from "../../types";

import { useStyles, GreenCheckbox } from "./styles";

type CardTodoProps = {
  todo: Todo;
};

export const CardToDo = ({ todo }: CardTodoProps) => {
  const classes = useStyles();
  const { handleUpdateTodo, handleDeleteTodo } = useTodo();

  return (
    <Card className={classes.card}>
      <CardContent>
        <div className={classes.statusContainer}>
          <Typography variant="h5" component="h2">
            {todo.completed ? "Completed" : "Pending"}
          </Typography>
          <GreenCheckbox
            checked={todo.completed}
            onChange={() => handleUpdateTodo(todo)}
          />
        </div>
        <Typography variant="body2" component="p">
          {todo.title}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="text"
          className={classes.buttonDelete}
          onClick={() => handleDeleteTodo(todo.id)}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};
