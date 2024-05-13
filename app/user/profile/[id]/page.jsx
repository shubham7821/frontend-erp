"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form } from "@formio/react";
import { useRouter } from "next/navigation";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Container,
  Row,
  Col,
} from "reactstrap";

export default function UserProfile({ params }) {
  const [task, setTask] = useState();
  const [regiform, setRegiform] = useState();
  const [employee, setEmployee] = useState({});
  const router = useRouter();
  useEffect(() => {
    fetchTask();
  }, []);

  const fetchVaiables = async (data) => {
    const res2 = await axios.get(
      `${process.env.camundaApi}process-instance/${data.processInstanceId}/variables`
    );
    if (res2.data?.employee_id) fetchEmployee(res2.data.employee_id.value);
  };

  const fetchEmployee = async (employee_id) => {
    const URL = `http://127.0.0.1:4000/employee/${employee_id}`;
    axios
      .get(URL)
      .then(function (response) {
        // console.log(response);
        if (response.data) {
          setEmployee(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const fetchTask = async () => {
    const res = await axios.get(
      `${process.env.camundaApi}task?assignee=${params.id}`
    );
    if (res.data[0]) {
      setTask(res.data[0]);
      fetchVaiables(res.data[0]);
      if (res.data[0].formKey) getFormData(res.data[0]);
    }
  };

  const getFormData = (data) => {
    const URL = "http://127.0.0.1:4000/form/" + data.formKey;
    axios
      .get(URL)
      .then(function (response) {
        // console.log(response.data);
        setRegiform(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSubmit = (res) => {
    const URL = "http://127.0.0.1:4000/employee";
    // console.log(res);
    axios
      .post(URL, res)
      .then(function (response) {
        if (response.data) {
          completeTask(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const completeTask = async (data) => {
    const res = await axios.post(
      `${process.env.camundaApi}task/${task.id}/complete`,
      {
        "Content-Type": "application/json",
        variables: {
          employee_id: {
            value: data._id,
            type: "String",
          },
        },
        withVariablesInReturn: true,
      }
    );
    router.push("/user/profile");
  };

  const viewComment = async () => {
    const res = await axios.post(
      `${process.env.camundaApi}task/${task.id}/complete`,
      {}
    );
    router.push("/user/edit-employee/" + params.id);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 backdrop-blur-0 bg-cyan-100">
      <h1 className="text-2xl font-sans font-black">
        {employee?.comment ? "Comment" : "Task"}
      </h1>
      {employee.comment ? (
        <pre>
          {JSON.stringify(employee["comment"], null, 2)}
          <button
            onClick={() => viewComment()}
            className="bg-green-800 mt-4 hover:bg-blue-100 text-white font-bold py-2 px-4 rounded"
          >
            View Comment and edit employee
          </button>
        </pre>
      ) : regiform ? (
        <Card className="card-register">
          <CardHeader>
            <CardTitle tag="h4">Registration Form</CardTitle>
          </CardHeader>
          <CardBody>
            <Form src={regiform} onSubmit={(data) => handleSubmit(data)} />
          </CardBody>
        </Card>
      ) : (
        "No task found"
      )}
    </div>
  );
}
