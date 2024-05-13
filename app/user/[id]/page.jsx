"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Form } from "@formio/react";
import React, { useEffect, useState } from "react";
import { Button, FormGroup, Label, Input } from "reactstrap";

export default function UserProfile({ params }) {
  const [task, setTask] = useState();
  const [employee, setEmployee] = useState({});
  const [status, setStatus] = useState("");
  const [locatstatus, setLocatstatus] = useState("");
  const [comment, setComment] = useState("");
  const router = useRouter();
  useEffect(() => {
    fetchTask();
  }, []);
  const fetchTask = async () => {
    const res = await axios.get(
      `${process.env.camundaApi}task?assignee=${params.id}`
    );

    if (res.data[0]) {
      const res2 = await axios.get(
        `${process.env.camundaApi}process-instance/${res.data[0].processInstanceId}/variables`
      );
      fetchEmployee(res2.data.employee_id.value);
      setTask(res.data[0]);
      if (res2?.data && res2.data?.approval_status?.value === "RWC") {
        setStatus("RWC");
      }
    }
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
  const completeTask = async (status) => {
    await axios.post(`http://127.0.0.1:4000/employee/updateStatus`, {
      id: employee._id,
      status: status,
      comment: "",
    });
    setLocatstatus(status);
    const res = await axios.post(
      `${process.env.camundaApi}task/${task.id}/complete`,
      {
        "Content-Type": "application/json",
        variables: {
          approval_status: {
            value: status,
            type: "String",
          },
          employee_id: {
            value: employee._id,
            type: "String",
          },
        },
        withVariablesInReturn: true,
      }
    );

    if (status == "RWC") {
      fetchTask();
    } else {
      router.push("/user/profile");
    }
  };

  const updateComment = async () => {
    await axios.post(`http://127.0.0.1:4000/employee/updateStatus`, {
      id: employee._id,
      status: status,
      comment: comment,
    });
    const res = await axios.post(
      `${process.env.camundaApi}task/${task.id}/complete`,
      {
        variables: {
          systemComment: {
            value: comment,
            type: "String",
          },
        },
        withVariablesInReturn: true,
      }
    );

    router.push("/user/profile");
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <hr />
      {task ? (
        <div>
          <pre>{JSON.stringify(employee, null, 2)}</pre>
          {/* <Form src={employee} /> */}
          {locatstatus !== "RWC" ? (
            <div className="space-x-1">
              <button
                className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => completeTask("A")}
              >
                Approve
              </button>
              <button
                className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => completeTask("R")}
              >
                Reject
              </button>
              <button
                className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => completeTask("RWC")}
              >
                Reject with comment
              </button>
            </div>
          ) : (
            ""
          )}
          {locatstatus === "RWC" ? (
            <>
              <form>
                <FormGroup>
                  <Label for="exampleEmail">Comment</Label>
                  <Input
                    type="text"
                    name="comment"
                    id="comment"
                    placeholder="Enter your comment"
                    style={{ color: "#000" }}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <Button color="primary" onClick={updateComment}>
                    Save
                  </Button>
                </FormGroup>
              </form>
            </>
          ) : (
            ""
          )}
        </div>
      ) : (
        <h3>No task found</h3>
      )}
    </div>
  );
}
