import { useState } from "react";
import { DoItem } from "./components/DoItem";

const default_items = [
  {
    id: 1,
    name: "Faire les courses",
    content: "Acheter ... et ...",
    priority: 5,
  },
  {
    id: 2,
    name: "Apprendre React",
    content: "Réalisation de mini projet todo.",
    priority: 0,
  },
  {
    id: 3,
    name: "Réunion à préparer",
    content: "Entretien avec ... au sujet de...",
    priority: 8,
  },
];

function App() {
  const [items, setItems] = useState(default_items);

  const onDelete = (itemId) => {
    setItems((curr) => curr.filter((item) => item.id !== itemId));
  };

  const onPriority = (itemId) => {
    setItems((curr) => {
      const copyItems = curr.map((item) => {
        if (item.id === itemId) {
          return { ...item, priority: (item.priority + 1) % 11 };
        }
        return item;
      });
      return copyItems;
    });
  };

  const getColorClass = (priority) => {
    if (priority >= 4 && priority <= 6) {
      return "mid-priority";
    } else if (priority >= 7 && priority <= 10) {
      return "high-priority";
    } else {
      return "";
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);

    let name = event.target.name.value;
    let content = event.target.content.value;

    const newItem = {
      id: items[items.length - 1]?.id + 1 ?? 0,
      name,
      content,
      priority: 0,
    };

    addItem(newItem);

    event.target.name.value = "";
    event.target.content.value = "";
  };

  const addItem = (item) => {
    setItems([...items, item]);
    console.log({ item });
  };

  return (
    <div>
      <h1>To Do React</h1>
      <h3>
        {items.length} {items.length > 1 ? "tâches" : "tâche"} en cours
      </h3>
      <div className="container">
        <form onSubmit={(e) => handleSubmit(e)} className="tweet-form">
          <h2>Nouvelle Tâche</h2>
          <input type="text" name="name" placeholder="Titre..." />
          <input type="text" name="content" placeholder="Contenu..." />
          <button type="submit">Valider</button>
        </form>
        <div className="items-container">
          {items.map((item) => {
            return (
              <DoItem
                key={item.id}
                id={item.id}
                name={item.name}
                content={item.content}
                priority={item.priority}
                onDelete={(id) => {
                  onDelete(id);
                }}
                onPriority={(id) => {
                  onPriority(id);
                }}
                colorClass={getColorClass(item.priority)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
