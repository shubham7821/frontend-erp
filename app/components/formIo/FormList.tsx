"use client";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import styles from "./FormList.module.css"; // Importing CSS module

export default function FormList() {
  localStorage.setItem("processInstanceId", "Process_18u8on7");
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:4000/form/formAll")
      .then(function (response) {
        // handle success
        setData(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        setLoading(false);
        console.log(error);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data.length) return <p>No forms found</p>;
  const arrayDataItems = data.map((item: { _id: string }) => (
    <tr key={item._id}>
      <td>{item._id}</td>
      <td>
        <Link
          href={`/form-builder/add-edit?id=${item._id}`}
          className={styles.editLink}
        >
          Edit
        </Link>
      </td>
    </tr>
  ));

  return (
    <>
      <div className={styles.createFormButton}>
        <Link href={`/form-builder/add-edit`}>Create New Form</Link>
      </div>
      <Table className={styles.customTable} striped bordered hover>
        <thead>
          <tr>
            <th>#ID</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{arrayDataItems}</tbody>
      </Table>
    </>
  );
}
