import { useState, useEffect } from "react";
import axios from "axios";

export default function HabitList() {
  const [habits, setHabits] = useState([]);

  const fetchHabits = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/habits");
      setHabits(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  return (
    <div>
      <h2>All Habits</h2>
      {habits.length === 0 ? (
        <p>No habits yet</p>
      ) : (
        <ul>
          {habits.map((habit) => (
            <li key={habit.id}>
              {habit.name} ({habit.frequency})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}