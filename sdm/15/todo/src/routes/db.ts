enum TODO_STATE {
  TODO = 1,
  ALTER,
}
export interface Todo {
  id: number;
  groupId: number;
  title: string;
  content: string;
  startDt: Date;
  endDt: Date;
  tag?: string;
  icon?: string;
  progress?: number;
  state?: TODO_STATE;
}
export function isTodo(params: any): params is Todo {
  return (
    typeof params.id === "number" &&
    typeof params.groupId === "number" &&
    typeof params.title === "string" &&
    typeof params.content === "string" &&
    typeof params.startDt === "object" &&
    typeof params.endDt === "object" &&
    typeof params.tag === "string" &&
    typeof params.icon === 'string' &&
    typeof params.progress === "number" &&
    typeof params.state === "object"
  );
}

let todos: Array<Todo> = new Array<Todo>();
todos.push({
  id: 1,
  groupId: 1,
  title: "qqqq",
  content: "qqqq",
  startDt: new Date(),
  endDt: new Date(),
  tag: "q,a",
  state: TODO_STATE.TODO,
});

export const db: Map<string, any> = new Map();
db.set("todos", todos);
