import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core";
import { Todo } from "../../types";

import { useStyles, GreenCheckbox } from "./styles";

type CardTodoProps = {
  todo: Todo;
  handleUpdateTodo: (todoSelected: Todo) => Promise<void>;
  handleDeleteTodo: (todoId: number) => Promise<void>;
};

export const CardToDo = ({
  todo,
  handleUpdateTodo,
  handleDeleteTodo,
}: CardTodoProps) => {
  const classes = useStyles();

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
