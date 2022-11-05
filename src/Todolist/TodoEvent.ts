import { ITodo } from './index';
class TodoEvent {

    private static instance: TodoEvent
    private todoData: ITodo[] = []

    public static create() {
        if (!TodoEvent.instance) {
            TodoEvent.instance = new TodoEvent()
        }

        return TodoEvent.instance;
    }

    public addTodo(todo: ITodo): Promise<ITodo> {
        return new Promise((resolve, reject) => {
            const _todo: ITodo = this.todoData.find(t => t.content === todo.content)
            if (_todo) {
                return
            }
            this.todoData.push(todo)

            resolve(todo)
        })
    }

    public removeTodo(id: number): Promise<number> {
        return new Promise((resolve, reject) => {
            this.todoData = this.todoData.filter(t => t.id !== id)
            resolve(id)
        })
    }

    public toggleTodo(id: number): Promise<number> {
        return new Promise((resolve, reject) => {
            this.todoData = this.todoData.map(t => {
                if (t.id === id) {
                    t.completed = !t.completed
                    resolve(id)
                }
                return t
            })

        })
    }
}

export default TodoEvent