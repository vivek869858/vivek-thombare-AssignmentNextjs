"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import {
  userPlus,
  userMinus,
  deleteButton,
  atIcon,
  worldIcon,
  phoneIcon,
  starIcon,
  color,
} from "./constant";

const index = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    let userData = await fetch("https://jsonplaceholder.typicode.com/users");
    let userArr = await userData.json();
    for (let i = 0; i < userArr.length; i++) {
      userArr[i].follow = 0;
      let name = userArr[i].name;
      let index = name?.indexOf(" ");
      userArr[i].initials =
        name.substring(0, 1) + name?.substring(index + 1, index + 2);
      let ran = Math?.floor(Math.random() * 6);
      userArr[i].color = color[ran];
    }
    setUsers(userArr);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const followUnFollow = (id) => {
    let userArr = users;
    for (let i = 0; i < userArr.length; i++) {
      if (userArr[i].id === id) {
        userArr[i].follow = userArr[i].follow === 0 ? 1 : 0;
      }
    }
    setUsers(userArr);
    deleteUser(null);
  };

  const deleteUser = (id) => {
    const newUsers = users?.filter((user) => {
      return user.id !== id;
    });
    setUsers(newUsers);
  };

  return (
    <div className="d-flex flex-wrap">
      {users?.map((user, index) => (
        <div key={index} className="card ms-5 mt-5" style={{ width: "20rem" }}>
          <div className="card-body">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
              
              
            >
              <h1
                style={{
                  backgroundColor: user.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  cursor:"pointer"
                }}
                 
                data-toggle="tooltip" data-placement="top" title={user?.name}
              >
                {user.initials}
              </h1>
              <h5 className="card-title">
                {user?.name}
                {user?.follow === 1 ? starIcon : ""}
              </h5>
            </div>

            <a href={`mailto:${user?.email}`} className="card-text text-dark">
              {atIcon}
              {user?.email}
            </a>
            <br />
            <a href="/" className="card-text text-dark">
              {phoneIcon}
              {user?.phone}
            </a>
            <br />
            <a
              href="/"
              className="card-text text-dark"
              onClick={() => window.open(user?.website)}
            >
              {worldIcon}

              {user?.website}
            </a>
            <br />
            <button
              onClick={(e) => {
                followUnFollow(user?.id);
              }}
              style={{ width: "120px" }}
              className={
                "btn " +
                (user.follow === 0
                  ? " btn-primary"
                  : "btn-light border border-primary ms-1")
              }
            >
              {user?.follow === 0 ? userPlus : userMinus}{" "}
              {user?.follow === 0 ? "Follow" : "Unfollow"}
            </button>
            <button
              onClick={(e) => {
                deleteUser(user?.id);
              }}
              style={{ width: "80px" }}
              className="w-50 btn btn-light border border-primary ms-1"
            >
              {deleteButton}
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default index;
