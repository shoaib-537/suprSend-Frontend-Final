"use client";
import React, { useEffect, useState } from "react";
import { useGlobalState } from "../context/globalProvider";
import Tasks from "../Components/Tasks/Tasks";
import axios from "axios";

type User = {
  id: number;
  name: string;
};
function page() {    
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


  const { importantTasks } = useGlobalState();
  return <Tasks title="Important Tasks" tasks={importantTasks}/>;
}

export default page;
