import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaFire, FaTrash } from "react-icons/fa";

export default function HabitList({ habits, fetchHabits }) {
const handleComplete = async (id) => {
  try {
    await axios.post(`http://localhost:8080/api/habits/${id}/complete`);
    await fetchHabits();
    toast.success("Marked done for today");
  } catch (err) {
    toast.error("Failed to mark complete");
  }
};
  const handleDelete = (id) => {
  toast((t) => (
    <div className="flex flex-col gap-2">
      <span className="text-sm">Delete this habit?</span>

      <div className="flex justify-end gap-2">
        <button
          onClick={async () => {
            try {
              await axios.delete(`http://localhost:8080/api/habits/${id}`);
              await fetchHabits();
              toast.success("Habit deleted");
            } catch (err) {
              console.error(err);
              toast.error("Failed to delete habit");
            }
            toast.dismiss(t.id);
          }}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Yes
        </button>

        <button
          onClick={() => toast.dismiss(t.id)}
          className="bg-gray-500 text-white px-3 py-1 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  ));
};

  return (
    <div className="bg-gray-700 p-8">
      <h2 className="text-xl text-white mb-4">All Habits</h2>
      {habits.length === 0 ? (
        <p className="text-gray-400">No habits yet</p>
      ) : (
        <ul>
          {habits.map((habit) => (
  <div
    key={habit.id}
    className="p-4 mb-3 flex justify-between items-center bg-gray-800 rounded"
  >
    <div>
      <h3 className="text-lg flex items-center text-white gap-2">
        <FaFire className="text-orange-500" />
        {habit.name}
      </h3>

      <p className="text-gray-400">{habit.description}</p>
      <span className="text-gray-400">{habit.frequency}</span>
    </div>

    <div className="flex gap-3">
    <button
  onClick={() => handleComplete(habit.id)}
  disabled={habit.completedToday}
  className={`px-3 py-1 rounded ${
    habit.completedToday
      ? "bg-gray-500 cursor-not-allowed"
      : "bg-green-500"
  }`}
>
  {habit.completedToday ? "Completed" : "Mark Done"}
</button>

      <button
        onClick={() => handleDelete(habit.id)}
        className="text-red-500 hover:text-red-600"
      >
        <FaTrash />
      </button>

      <p className="text-orange-400 flex items-center gap-1 mt-1">
  🔥 {habit.streak} day streak
</p>
    </div>
  </div>
))}

          
        </ul>
      )}
    </div>
  );
}