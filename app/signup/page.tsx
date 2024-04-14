"use client";
import { SignUp } from "@clerk/nextjs";
import React from "react";

function page() {
  return (
    <div className="flex items-center justify-center h-full">
      <SignUp />
      {/* <form action="">
        <input type="text" />
      </form> */}
    </div>
  );
}

export default page;
