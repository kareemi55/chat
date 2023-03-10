import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios  from "axios";
import Logo from "../../assets/logo.svg";
import Logout from "./Logout";
import {List, ListItem, ListItemText, ListItemAvatar} from '@material-ui/core'

import { Box, FormControl, Typography ,Button, Avatar, TextField} from "@mui/material";

export default function Contacts({ contacts, changeChat, }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [inputValue, setInputValue] = useState('');
  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    setCurrentUserName(data.username);
    setCurrentUserImage(data.avatarImage);
  }, []);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  // ###########################################################


  const handleSubmit = async (e) => {
    e.preventDefault();
    try { 
      await axios.post('http://localhost:5000/user', { username: inputValue});
      setInputValue(''); 
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <>
      {currentUserImage && currentUserImage && (
        <Container>
           
          <Box className="brand">
            <h5>logo</h5>
            <Typography className="h2">
            <Box className="logt">
          <Logout />
          </Box>
            </Typography>
          </Box>
         
          <Box className="newsearch">
          <FormControl onSubmit={handleSubmit}>
     
      <input placeholder="Search for user" value={inputValue} onChange={e => setInputValue(e.target.value)} />
   
      <Button type="submit">search</Button>
    </FormControl>
          </Box>
          <Box className="contacts">
            {contacts
              .filter((contact) => contact.username === inputValue)
              .map((contact, index) => {
                return (
                  <Box
                    key={contact._id}
                    className={`contact ${
                      index === currentSelected ? "selected" : ""
                    }`}
                    onClick={() => changeCurrentChat(index, contact)}
                  >
                    <Box className="avatar">
                      <Avatar
                        src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                        alt=""
                      />
                    </Box>
                    <Box className="username">
                      <Typography className="h3" variant="h6" >{contact.username}</Typography>
                    </Box>
                  </Box>
                );
              })}
          </Box>



  {/* <div className="contacts">
    {contacts
      .filter((contact) => inputValue.startsWith("") ? contact.username.includes(inputValue.substring(1)) : contact.username === inputValue)
      .map((contact, index) => {
        return (
          <div
            key={contact._id}
            className={`contact ${
              index === currentSelected ? "selected" : ""
            }`}
            onClick={() => changeCurrentChat(index, contact)}
          >
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                alt=""
              />
            </div>
            <div className="username">
              <h3>{contact.username}</h3>
              
            </div>
            <div>
            
            </div>
          </div>
        );
      })}
  </div> */}


          <div></div>
          <Box className="current-user">
            <Box className="avatar">
              <Avatar
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </Box>
            <Box className="username">
              <Typography className="h3" variant="h6">{currentUserName}</Typography>
            </Box>
          </Box>
          
         
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
display: grid;
grid-template-rows: 10% 7% 65%;
overflow: hidden;
background-color: #080420;
.brand {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  img {
    height: 2rem;
  }
  .h2 {
    color: white;
    text-transform: uppercase;
  }
}

.newsearch{
  display:flex;
  align-items:center;
  position:relative;
  left 3rem;
}
.newsearch FormControl{
  display:flex;
  flex-wrap:no-wrap;
}
.newsearch input{
  width: 100%;
  height:2.3rem;
  border-radius:25px;
}
.newsearch input:focus{
  outline:none;
}

.newsearch Button{
  position: relative;
  height: 1.9rem;
  left: 8.5rem;
  bottom: 2rem;
  border-radius:25px;
  background:#0d0d30;
  color:white;
  width:2px;

  

  
}
.newsearch Button:hover{
  height:2rem;
  right:4.5rem;
  
}

.contacts {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  gap: 0.8rem;
  &::-webkit-scrollbar {
    width: 0.2rem;
    &-thumb {
      background-color: #ffffff39;
      width: 0.1rem;
      border-radius: 1rem;
    }
  }
  .contact {
    background-color: #ffffff34;
    min-height: 5rem;
    cursor: pointer;
    width: 90%;
    border-radius: 0.2rem;
    padding: 0.4rem;
    display: flex;
    gap: 1rem;
    align-items: center;
    transition: 0.5s ease-in-out;
    .avatar {
      img {
        height: 3rem;
      }
    }
    .username {
      .h3 {
        color: white;
      }
    }
  }
  .selected {
    background-color: #9a86f3;
  }
}
.current-user {
  background-color: #0d0d30;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  .avatar {
    img {
      height: 4rem;
      max-inline-size: 100%;
    }
  }
  .username {
    .h3 {
      color: white;
    }
  }
  @media screen and (min-width: 720px)  {
    gap: 0.5rem;
    .username {
      h2 {
        font-size: 1rem;
      }

    }
  .newsearch form{
    display:flex;
    flex-wrap:wrap;
  }
  }
}
`;