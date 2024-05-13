import { SelectEntry, isSelectEntryEdited } from "@bpmn-io/properties-panel";
import { useService } from "bpmn-js-properties-panel";

import { useEffect, useState } from "@bpmn-io/properties-panel/preact/hooks";
/* eslint-disable */
export default function (element) {
  return [
    {
      id: "metadata",
      component: Spell,
      isEdited: isSelectEntryEdited,
    },
  ];
}

function Spell(props) {
  const { element, id } = props;
  console.log("id", id);
  console.log("element", element);
  const modeling = useService("modeling");
  const translate = useService("translate");
  const debounce = useService("debounceInput");
  const [taskName, setTaskName] = useState("");

  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState([]);

  let selectedGroupItem = {
    id: element.id,
    groupId: element.di.bpmnElement.candidateGroups || "",
    // groupId: element.di.bpmnElement.$attrs.metadata || "",
  };
  console.log("selectedGroupItem", selectedGroupItem);
  const [selectedGroupValue, setSelectedGroupValue] =
    useState(selectedGroupItem);

  useEffect(() => {
    setTaskName(element.businessObject.name);
    let taskList = sessionStorage.getItem("taskList");
    if (taskList) {
      taskList = JSON.parse(sessionStorage.getItem("taskList"));
      const currentItemIndex = taskList.findIndex(
        (item) => item.task_id == element.id
      );
      if (currentItemIndex > -1) {
        taskList[currentItemIndex].task_name = element.businessObject.name;
      }
      sessionStorage.setItem("taskList", JSON.stringify(taskList));
    }
  }, [element]);

  //fetch user on selecting group option
  useEffect(() => {
    if (selectedGroupValue) {
      fetchUsersByGroup(selectedGroupValue.groupId);
    }
  }, [selectedGroupValue]);

  //fetch user list when switching(clicking) from one task to other task
  useEffect(() => {
    if (
      element.businessObject.candidateGroups &&
      element.businessObject.assignee
    ) {
      fetchUsersByGroup(element.businessObject.candidateGroups);
    }
  }, [element.businessObject.candidateGroups, element.businessObject.assignee]);

  const getValue = () => {
    return element.di.bpmnElement.candidateGroups || selectedGroupValue.groupId;
    // return element.businessObject.metadata || selectedGroupValue.groupId;
  };

  let taskList = sessionStorage.getItem("taskList");
  if (taskList) {
    taskList = JSON.parse(sessionStorage.getItem("taskList"));
  }

  /* const setValue = (value) => {
    const newObj = { id: element.id, groupId: value };
    setSelectedGroupValue(newObj);
    const selectedGroup = groups.find((group) => group.id == value);
    if (!taskList) {
      taskList = sessionStorage.setItem(
        "taskList",
        JSON.stringify([
          {
            task_id: element.id,
            task_name: taskName,
            group_id: value,
            group_name: selectedGroup.name,
            user_id: null,
            user_name: null,
            form_id: null,
          },
        ])
      );
    } else {
      const itemIndex = taskList.findIndex(
        (item) => item.task_id === element.id
      );
      if (itemIndex > -1) {
        taskList[itemIndex].task_name = taskName;
        taskList[itemIndex].group_id = value;
        taskList[itemIndex].user_id = null;
      } else {
        taskList.push({
          task_id: element.id,
          task_name: taskName,
          group_name: selectedGroup.name,
          group_id: value,
          user_id: null,
          user_name: null,
          form_id: null,
        });
      }

      sessionStorage.setItem("taskList", JSON.stringify(taskList));
    }

    return modeling.updateProperties(element, {
      metadata: value,
    });
  }; */

  const setValue = (value) => {
    const newObj = { id: element.id, groupId: value };

    setSelectedGroupValue(newObj);

    const selectedGroup = groups.find((group) => group.id == value);

    if (!taskList) {
      taskList = sessionStorage.setItem(
        "taskList",
        JSON.stringify([
          {
            task_id: element.id,
            task_name: taskName,
            group_id: value,
            group_name: selectedGroup.name,
            user_id: null,
            user_name: null,
            form_id: null,
          },
        ])
      );
    } else {
      const itemIndex = taskList.findIndex(
        (item) => item.task_id === element.id
      );
      if (itemIndex > -1) {
        taskList[itemIndex].task_name = taskName;
        taskList[itemIndex].group_id = value;
        taskList[itemIndex].user_id = null;
      } else {
        taskList.push({
          task_id: element.id,
          task_name: taskName,
          group_name: selectedGroup.name,
          group_id: value,
          user_id: null,
          user_name: null,
          form_id: null,
        });
      }
      sessionStorage.setItem("taskList", JSON.stringify(taskList));
    }

    // Update properties in the BPMN model
    modeling.updateProperties(element, {
      ["camunda:candidateGroups"]: value, // metadata property
    });
  };

  ////////////////////// USER ///////////////////////////////

  let selectedUserItem = {
    id: "metadataUser",
    userId: element.di.bpmnElement.assignee || "",
    // userId: element.di.bpmnElement.$attrs.metadataUser || "",
  };
  const [selectedUserValue, setSelectedUserValue] = useState(selectedUserItem);

  const getUserValue = () => {
    return (
      element.di.bpmnElement.assignee || selectedUserValue.userId
      // element.di.bpmnElement.$attrs.metadataUser || selectedUserValue.userId
    );
    // return element.businessObject.metadataUser || selectedUserValue.userId;
  };
  const setUserValue = (value) => {
    const newObj = { id: "metadataUser", userId: value };
    setSelectedUserValue(newObj);

    const selectedUser = users.find((user) => user.id == value);
    taskList = taskList.map((item) => {
      if (item.task_id === element.id) {
        return {
          ...item,
          user_id: value,
          user_name: selectedUser.first_name + " " + selectedUser.last_name,
        };
      } else return item;
    });
    sessionStorage.setItem("taskList", JSON.stringify(taskList));

    return modeling.updateProperties(element, {
      ["camunda:assignee"]: value,
    });
  };

  useEffect(() => {
    fetchGroups();
  }, [setGroups]);

  function fetchGroups() {
    const query = `
      query getAllGroupBULevel($user_type: String!) {
        getAllGroupBULevel(user_type: $user_type) {
          id
          name
          description
          is_default
          group_role_permission {
            id
            group_id
            role_permission_id
            role_permission {
              id
              name
              __typename
            }
            __typename
          }
          __typename
        }
      }`;

    const variables = {
      user_type: "bu_level",
    };

    const url = process.env.NEXT_PUBLIC_APP_API_URL; // Replace with the actual GraphQL API URL

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
        setGroups(res.data?.getAllGroupBULevel);
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  }

  function fetchUsersByGroup(group_id) {
    const query = `query getAllUsersByGroupID($user_group_id: Float!){
                    getAllUsersByGroupID(user_group_id: $user_group_id){
                      id
                      first_name
                      last_name
                    }
                  }`;

    const variables = {
      user_group_id: parseFloat(group_id),
    };

    const url = process.env.NEXT_PUBLIC_APP_API_URL; // Replace with the actual GraphQL API URL

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
        setUsers(res.data?.getAllUsersByGroupID);
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  }

  const getOptions = () => {
    return [
      { label: "<none>", value: undefined },
      ...groups.map((data) => ({
        label: data.name,
        value: data.id,
      })),
    ];
  };

  const getUsers = () => {
    if (users?.length > 0) {
      return [
        { label: "<none>", value: undefined },
        ...users.map((data) => ({
          label: data.first_name + " " + data.last_name,
          value: data.id,
        })),
      ];
    } else {
      return [{ label: "<none>", value: undefined }];
    }
  };

  return (
    <div>
      <SelectEntry
        id={id}
        element={element}
        description={translate("Select Group")}
        label={translate("")}
        getValue={getValue}
        setValue={setValue}
        getOptions={getOptions}
        debounce={debounce}
        // onBlur={(event) => fetchUsersByGroup(event.target.value)}
      />
      <SelectEntry
        id={id}
        element={element}
        description={translate("Select User")}
        label={translate("")}
        getValue={getUserValue}
        setValue={setUserValue}
        getOptions={getUsers}
        debounce={debounce}
      />
    </div>
  );
}
