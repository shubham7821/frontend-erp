"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form } from "@formio/react";
import { useRouter } from "next/navigation";

export default function UserProfile({ params }) {
  const [task, setTask] = useState();
  const [regiform, setRegiform] = useState({});
  const [employee, setEmployee] = useState({});
  const [empid, setEmpid] = useState();
  const router = useRouter();
  useEffect(() => {
    fetchTask();
  }, []);
  const fetchTask = async () => {
    const res = await axios.get(
      `${process.env.camundaApi}task?assignee=${params.id}`
    );
    if (res.data[0]) {
      fetchVaiables(res.data[0]);
      setTask(res.data[0]);
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
    // console.log(res);
    const URL = "http://127.0.0.1:4000/employee/update";
    axios
      .post(URL, { id: empid, data: res })
      .then(function (response) {
        if (response.data) {
          completeTask(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const fetchVaiables = async (data) => {
    const res2 = await axios.get(
      `${process.env.camundaApi}process-instance/${data.processInstanceId}/variables`
    );
    if (res2?.data?.employee_id?.value) {
      fetchEmployee(res2.data.employee_id.value);
      setEmpid(res2.data.employee_id.value);
      getFormData(data);
    }
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

  const fetchEmployee = async (employee_id) => {
    const URL = `http://127.0.0.1:4000/employee/${employee_id}`;
    axios
      .get(URL)
      .then(function (response) {
        if (response.data) {
          setEmployee(response.data.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 backdrop-blur-0">
      <h1>Task</h1>
      {task ? (
        <Form
          src={regiform}
          options={{ readOnly: false }} // Set to true to make fields read-only
          submission={{ data: employee }}
          onSubmit={(data) => handleSubmit(data)}
        />
      ) : (
        "No task found"
      )}
    </div>
  );
}
