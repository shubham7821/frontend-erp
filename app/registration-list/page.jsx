"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import styles from "./layout.module.css"; // Make sure the path to your CSS file is correct

export default function RegistrationList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    const URL = "http://127.0.0.1:4000/employee";
    axios
      .get(URL)
      .then((response) => {
        if (response.data) {
          const filteredEmployees = response.data.filter(
            (item) => item.status !== "P"
          );
          setEmployees(filteredEmployees);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const arrayDataItems = employees.map((item) => (
    <tr key={item._id} className={styles.table_row}>
      <td>{item.data.name}</td>
      <td>{item.status === "RWC" ? "Comment" : item.status}</td>
    </tr>
  ));

  return (
    <div className={styles.body_background}>
      <h1>Registration List</h1>
      <Table striped bordered hover>
        <thead className={styles.table_header}>
          <tr>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{arrayDataItems}</tbody>
      </Table>
    </div>
  );
}
