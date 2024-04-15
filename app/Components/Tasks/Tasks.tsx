"use client";
import { useGlobalState } from "@/app/context/globalProvider";
import React from "react";
import styled from "styled-components";
import CreateContent from "../Modals/CreateContent";
import TaskItem from "../TaskItem/TaskItem";
import { add, plus } from "@/app/utils/Icons";
import Modal from "../Modals/Modal";
import SuprSendInbox from "@suprsend/react-inbox";
import { useUser } from "@clerk/nextjs";
import crypto from "crypto";

interface Props {
  title: string;
  tasks: any[];
}
interface HmacParams {
  distinct_id: string;
  secret: string;
}
function hmac_rawurlsafe_base64_string({
  distinct_id,
  secret,
}: HmacParams): string {
  const hash = crypto;
  return crypto
    .createHmac("sha256", secret)
    .update(distinct_id)
    .digest("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function Tasks({ title, tasks }: Props) {
  const { theme, isLoading, openModal, modal } = useGlobalState();
  const { user } = useUser();
  const userId: string = user?.id ?? "default";

  const secretKey = "your-secret-key";
  const distinctId: string = userId ?? "default";

  const hmacValue = hmac_rawurlsafe_base64_string({
    distinct_id: distinctId,
    secret: secretKey,
  });
  console.log("hmacValue", hmacValue);
  return (
    <TaskStyled theme={theme}>
      {modal && <Modal content={<CreateContent />} />}
      <h1>{title}</h1>
      <div className="button-container">
        <SuprSendInbox  
          theme={{
            bell: {
              color: '#fff'  // Sets the bell icon color to white
            }
          }}
          workspaceKey="taJqjSoneQP1JqYXiz7F"
          subscriberId="JE2aXB0kQC3bCuSAHiYQG2NNGvvUeUBfqnIAPObhHAw"
          distinctId="kasipi4810@rartg.com"
        />
        <button className="btn-rounded" onClick={openModal}>
          {plus}
        </button>
      </div>

      <div className="tasks grid">
        {tasks.map((task) => (
          <TaskItem
            key={task._id}
            title={task.title}
            description={task.description}
            date={task.date}
            isCompleted={task.isCompleted}
            id={task._id}
          />
        ))}
        <button className="create-task" onClick={openModal}>
          {add}
          Add New Task
        </button>
      </div>
    </TaskStyled>
  );
}

const TaskStyled = styled.main`
  position: relative;
  padding: 2rem;
  width: 100%;
  background-color: ${(props) => props.theme.colorBg2};
  border: 2px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;
  height: 100%;

  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  .btn-rounded {
    position: fixed;
    top: 4.9rem;
    right: 5.1rem;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;

    background-color: ${(props) => props.theme.colorBg};
    border: 2px solid ${(props) => props.theme.borderColor2};
    box-shadow: 0 3px 15px rgba(0, 0, 0, 0.3);
    color: ${(props) => props.theme.colorGrey2};
    font-size: 1.4rem;

    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 768px) {
      top: 3rem;
      right: 3.5rem;
    }
  }

  .tasks {
    margin: 2rem 0;
  }

  > h1 {
    font-size: clamp(1.5rem, 2vw, 2rem);
    font-weight: 800;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 3rem;
      height: 0.2rem;
      background-color: ${(props) => props.theme.colorPrimaryGreen};
      border-radius: 0.5rem;
    }
  }

  .create-task {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    height: 16rem;
    color: ${(props) => props.theme.colorGrey2};
    font-weight: 600;
    cursor: pointer;
    border-radius: 1rem;
    border: 3px dashed ${(props) => props.theme.colorGrey5};
    transition: all 0.3s ease;

    i {
      font-size: 1.5rem;
      margin-right: 0.2rem;
    }

    &:hover {
      background-color: ${(props) => props.theme.colorGrey5};
      color: ${(props) => props.theme.colorGrey0};
    }
  }
`;

export default Tasks;
