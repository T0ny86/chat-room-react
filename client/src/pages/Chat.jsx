import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { io } from "socket.io-client";
import styled from "styled-components";

import api, { allUsersRoute, URL } from "../utils/API";
import { Welcome, Contacts, ChatContainer } from "../components";

const Chat = () => {

  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  const navigate = useNavigate();
  const socket = useRef();

  useEffect(() => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY) ||
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY) === 'undefined') {
      navigate("/login");
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)));
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(URL);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {

    async function getContacts() {

      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await api.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    }
    getContacts();

  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <>
      <Container>
        <div className="container">
          <Contacts contacts={contacts} changeChat={handleChatChange} />
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )}
        </div>
      </Container>
    </>
  );
}

export default Chat;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;