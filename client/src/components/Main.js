import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";

import InputBar from "./InputBar";
import TodoList from "./TodoList";
import StatusToggle from "./StatusToggle";
import GroupSelector from "./GroupSelector/GroupSelector";
import { URL_GETUSERDATA } from "../config/urls";
import { SelectedGroupProvider } from "./SelectedGroupContext";
import MainHeader from "./MainHeader";
import Sidebar from "./Sidebar/Sidebar";

export default function Main(props) {
  const [userData, setUserData] = useState(null);

  // ${count} is used to
  const [count, setCount] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    axios.get(URL_GETUSERDATA).then((response) => {
      setUserData(response.data);
    });
  }, [count]);

  return (
    <Container fluid className="p-0" style={{ height: "100vh" }}>
      <MainHeader
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <SelectedGroupProvider>
        <div className="container-">
          {console.log(userData ? userData.todos : [])}
          {console.log(count)}
          <Sidebar isSidebarOpen={isSidebarOpen}>
            <GroupSelector
              groups={userData ? userData.groups : []}
              setCount={setCount}
            />
          </Sidebar>
          <div className="middle-lane">
            <InputBar setCount={setCount} />
            <StatusToggle />
            <TodoList
              list={userData ? userData.todos : []}
              setCount={setCount}
            />
          </div>
        </div>
      </SelectedGroupProvider>
    </Container>
  );
}
