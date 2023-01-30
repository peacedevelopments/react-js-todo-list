import { useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import "./App.css";

export default function App() {
  const [allTodo, setAllTodo] = useState(
    !localStorage.getItem("allTodo")
      ? []
      : JSON.parse(localStorage.getItem("allTodo"))
  );

  const [userText, setUserText] = useState("");

  // Add New Task
  const addTodo = (e) => {
    e.preventDefault();

    const data = {
      id: Date.now(),
      title: userText,
      completed: false,
    };

    setAllTodo((prev) => [...prev, data]);

    setUserText("");
  };

  // Update Task
  const [seletedTodo, setSelectedTodo] = useState(null);

  const updateTodo = (e) => {
    e.preventDefault();

    const data = allTodo.map((item) =>
      item.id === seletedTodo.id
        ? { ...item, title: userText, completed: false }
        : item
    );

    setAllTodo(data);

    setUserText("");
    setSelectedTodo(null);
  };

  // Delete Todo
  const deleteTodo = (id) => {
    setAllTodo((prev) => prev.filter((item) => item.id !== id));
  };

  // Mark Todo Completed
  const toggleComplete = (id) => {
    setAllTodo((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  useEffect(() => {
    localStorage.setItem("allTodo", JSON.stringify(allTodo));
  }, [allTodo]);

  return (
    <Container>
      <div className="todo mt-2 mt-lg-3 border p-3">
        <div className="todoHeader pb-3 mb-3 d-flex justify-content-between align-items-center border-bottom">
          <h2 className="text-dark">React JS Todo App</h2>
          <Form
            onSubmit={seletedTodo === null ? addTodo : updateTodo}
            className="bg-light p-3 rounded d-flex justify-content-end align-items-center gap-2"
          >
            <Form.Control
              type="text"
              value={userText}
              onChange={(e) => setUserText(e.target.value)}
              placeholder="Enter Your Todo Task..."
            />
            <Button
              type="submit"
              variant="success"
              size="sm"
              className="p-2 px-4"
            >
              +
            </Button>
          </Form>
        </div>
        <h3 className="text-dark">All Todo List</h3>
        <div className="todoContainer d-flex align-items-center flex-wrap gap-2">
          {allTodo.length === 0 ? (
            <p className="text-dark m-0">Todo List Is Empty.</p>
          ) : (
            allTodo.map((item) => {
              return (
                <Card
                  key={item.id}
                  className={`todoCard ${item.completed ? "bg-light" : ""}`}
                >
                  <Card.Body className="d-flex justify-content-between align-items-center">
                    <Form.Group className="d-inline-flex align-items-center gap-2">
                      <Form.Check
                        id={item.id}
                        name={item.id}
                        checked={item.completed}
                        onChange={() => toggleComplete(item.id)}
                      />
                      <Form.Label
                        className={
                          item.completed
                            ? "text-decoration-line-through text-secondary m-0"
                            : "text-dark m-0"
                        }
                        htmlFor={item.id}
                      >
                        {item.title}
                      </Form.Label>
                    </Form.Group>
                    <div className="d-flex justify-content-end align-items-center gap-2">
                      <Button
                        onClick={() => deleteTodo(item.id)}
                        variant="danger"
                        size="sm"
                      >
                        Delete
                      </Button>
                      {!item.completed && (
                        <Button
                          onClick={() => {
                            setUserText(item.title);
                            setSelectedTodo(item);
                          }}
                          variant="primary"
                          size="sm"
                        >
                          Edit
                        </Button>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </Container>
  );
}
