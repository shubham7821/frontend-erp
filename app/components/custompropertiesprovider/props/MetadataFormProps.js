import { SelectEntry, isSelectEntryEdited } from "@bpmn-io/properties-panel";
import { useService } from "bpmn-js-properties-panel";

import { useEffect, useState } from "@bpmn-io/properties-panel/preact/hooks";
/* eslint-disable */
export default function (element) {
  return [
    {
      id: "metadataForm",
      element,
      component: Spell,
      isEdited: isSelectEntryEdited,
    },
  ];
}

function Spell(props) {
  const { element, id } = props;
  // console.log("element", element);
  // console.log("id", id);
  const modeling = useService("modeling");
  const translate = useService("translate");
  const debounce = useService("debounceInput");

  const [taskName, setTaskName] = useState("");

  //refelct the changes whenever name of the task changes
  useEffect(() => {
    setTaskName(element.businessObject.name);
  }, [element]);

  const [forms, setForms] = useState([]);
  useEffect(() => {
    fetchForms();
  }, []);

  let selectedForm = {
    id: element.id,
    formId: element.di.bpmnElement.formKey || "",
    // formId: element.di.bpmnElement.$attrs.metadataForm || "",
  };
  // console.log("selectedForm", selectedForm);
  const [selectedValue, setSelectedValue] = useState(selectedForm);

  const getValue = () => {
    return element.di.bpmnElement.formKey || selectedValue.formId;
    // return element.di.bpmnElement.$attrs.metadataForm || selectedValue.formId;
  };
  let taskList = sessionStorage.getItem("taskList");
  if (taskList) {
    taskList = JSON.parse(sessionStorage.getItem("taskList"));
  }

  const setValue = (value) => {
    const newObj = { id: element.id, formId: value };
    setSelectedValue(newObj);

    if (!taskList) {
      taskList = sessionStorage.setItem(
        "taskList",
        JSON.stringify([
          {
            task_id: element.id,
            task_name: taskName,
            group_id: null,
            group_name: null,
            user_id: null,
            user_name: null,
            form_id: value,
          },
        ])
      );
    } else {
      const itemIndex = taskList.findIndex(
        (item) => item.task_id === element.id
      );
      if (itemIndex > -1) {
        taskList[itemIndex].form_id = value;
      } else {
        taskList.push({
          task_id: element.id,
          group_id: null,
          user_id: null,
          form_id: value,
        });
      }

      sessionStorage.setItem("taskList", JSON.stringify(taskList));
    }

    return modeling.updateProperties(element, {
      ["camunda:formKey"]: value,
    });
  };

  function fetchForms() {
    const query = `
        query getFormList {
           getFormList {
              data
              }
          }`;

    const variables = {
      user_type: "bu_level",
    };

    const url = process.env.NEXT_PUBLIC_MONGO_URL; // Replace with the actual GraphQL API URL

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Access_token: localStorage.getItem("auth_token"),
        User_id: 208,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        let formList = res.data?.getFormList?.data || [];
        if (formList) {
          const list = res.data?.getFormList?.data;

          let bpmnPlugin = sessionStorage.getItem("bpmnPlugin")
            ? JSON.parse(sessionStorage.getItem("bpmnPlugin"))
            : null;
          // console.log("bpmnPlugin", bpmnPlugin);
          if (bpmnPlugin) {
            // console.log("formList", formList);
            formList = list.filter(
              (form) =>
                form.plugin_id.toString() === bpmnPlugin.plugin_id.toString() &&
                form.plugin_sub_module_id.toString() ===
                  bpmnPlugin.plugin_sub_module_id.toString()
            );
          }
        }
        setForms(formList);
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  }

  const getOptions = () => {
    return [
      { label: "<none>", value: undefined },
      ...forms.map((data) => ({
        label: data.name,
        value: data._id,
      })),
    ];
  };

  return (
    <div>
      <SelectEntry
        id={id}
        element={element}
        description={translate("Select a Form")}
        label={translate("")}
        getValue={getValue}
        setValue={setValue}
        getOptions={getOptions}
        debounce={debounce}
      />
    </div>
  );
}
