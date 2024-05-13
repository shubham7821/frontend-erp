"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { FormBuilder, saveForm } from "@formio/react";
import { useState, useEffect } from "react";
import axios from "axios";
// import FormioContrib from "@formio/contrib";
// Formio.use(FormioContrib);
export default function CreateForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const id = searchParams.get("id");
  const [jsonSchema, setSchema] = useState({ components: [] });
  const onFormChange = (schema) => {
    //setSchema({ ...schema, components: [...schema.components] });
  };
  useEffect(() => {
    if (id) {
      axios
        .get("http://127.0.0.1:4000/form/" + id)
        .then(function (response) {
          // handle success
          console.log(response.data);
          setSchema(response.data.data);
          setLoading(false);
        })
        .catch(function (error) {
          // handle error
          setLoading(false);
          console.log(error);
        });
    }
  }, []);
  const saveForm = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:4000/form/createForm", {
        id: id ? id : "0",
        data: jsonSchema,
      })
      .then(function (response) {
        router.push("/form-builder");
      })
      .catch(function (error) {
        // handle error
        setLoading(false);
        console.log(error);
      });
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FormBuilder form={jsonSchema} onChange={onFormChange} />
        <button
          onClick={saveForm}
          style={{
            position: "fixed",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "16px",
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          Save
        </button>
      </div>
    </>
  );
}
