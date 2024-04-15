"use client";
import { useEffect, useState } from "react";
import Tasks from "./Components/Tasks/Tasks";
import { useGlobalState } from "./context/globalProvider";

type User = {
  id: number;
  name: string;
};
export default function Home() {
  const [data, setData] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/tasks", {
          method: "GET", // This is optional, as GET is the default method
        });
        const responseData = await res.json();
        setData(responseData.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  const { tasks } = useGlobalState();

  return <Tasks title="All Tasks" tasks={tasks} />;
}
