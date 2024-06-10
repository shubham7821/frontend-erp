"use client";
import React, { useEffect, useRef, useState } from "react";
// import {
//   Box,
//   Grid,
//   Button,
//   CircularProgress,
//   TextField,
//   Typography,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Dialog,
// } from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { useAppDispatch, useAppSelector } from "@/store/store";
// import { Item } from "../common/app_bar";
// import label from "@/helper/labels";
// import transform from "@/helper/transform";
import "bpmn-js-bpmnlint/dist/assets/css/bpmn-js-bpmnlint.css";
import lintModule from "bpmn-js-bpmnlint";
import bpmnlintConfig from "./bpmnlintconfig-packed";
// import { createBpmnIo } from "@/store/thunk/bpmnThunk";
// import { notificationFail } from "@/store/slices/notificationSlice";
// import Router, { useRouter } from "next/router";
// import $ from "jquery";
// import { BPMN_ERROR } from "../common/const";
// import {
//   getAllPlugin,
//   getAllPluginLicence,
//   getModulesByPlugin,
// } from "@/store/thunk/pluginThunk";

//bpmn plugins
import Modeler from "bpmn-js/lib/Modeler";
import {
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule,
  CamundaPlatformPropertiesProviderModule,
} from "bpmn-js-properties-panel";

import CamundaBpmnModdle from "camunda-bpmn-moddle/resources/camunda.json";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import "bpmn-js-properties-panel/dist/assets/properties-panel.css";


let modeler = null;
let uniq = null;
const BPMNModeler = (props) => {
  const [xml, setXml] = useState(
    '<?xml version="1.0" encoding="UTF-8"?><bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:bpmncns="http://cloud-native-sustainability/schema/bpmn/cns" targetNamespace="http://bpmn.io/schema/bpmn"><bpmn:process id="Process_1" isExecutable="true"><bpmn:task id="Task_0" name="Greeter" bpmncns:optional="true" bpmncns:executionModality="highPerformance" /></bpmn:process><bpmndi:BPMNDiagram id="Diagram_1"><bpmndi:BPMNPlane id="Plane_1" bpmnElement="Process_1"><bpmndi:BPMNShape id="Task_0_di" bpmnElement="Task_0"><dc:Bounds x="160" y="80" width="100" height="80" /></bpmndi:BPMNShape></bpmndi:BPMNPlane></bpmndi:BPMNDiagram></bpmn:definitions>'
  );
  // const {
  //   subModuleId,
  //   subModuleName,
  //   name,
  //   pluginId,
  //   plugin,
  //   module,
  //   moduleId,
  // } = params;
  const ref = useRef();
  const propertiesPanel = useRef();
  // const [initLoading, setInitLoading] = useState(false);
  // const [selectedPluginId, setSelectedPluginId] = useState(
  //   pluginId ? pluginId : 0
  // );
  // const [selectedModuleId, setSelectedModuleId] = useState(
  //   moduleId ? moduleId : 0
  // );
  // const [selectedSubModuleId, setSubSelectedModuleId] = useState(
  //   subModuleId ? subModuleId : 0
  // );
  // const router = useRouter();
  // const { allPlugin, allModulesByPlugin } = useAppSelector(
  //   (state) => state.pluginReducer
  // );
  // const [subModuleList, setSubModuleList] = useState([]);
  // const dispatch = useAppDispatch();
  // const isLoading = useAppSelector((state) => state.loaderReducer);
  // const { currentLanguage, languagesKeyList } = useAppSelector(
  //   (state) => state.languageReducer
  // );
  const [allowRender, setallowRender] = React.useState(false);
  const [formName, setFormName] = useState("");
  // const { allPluginLicence } = useAppSelector((state) => state.pluginReducer);

  //fetch plugins
  // useEffect(() => {
  //   if (!module && !plugin) {
  //     setInitLoading(true);
  //     dispatch(getAllPlugin());
  //     setInitLoading(false);
  //   } /* eslint-disable */
  // }, [module, plugin]);

  //fetch module data on selecting plugin
  // useEffect(() => {
  //   if (selectedPluginId !== "0") {
  //     dispatch(getModulesByPlugin({ plugin_id: Number(selectedPluginId) }));
  //   }
  // }, [selectedPluginId]);

  useEffect(() => {
    setTimeout(() => {
      setallowRender(true);
    }, 100);
  }, []);

  const mounted = useRef();

  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic
      const container = ref.current;
      modeler = new Modeler({
        container,
        propertiesPanel: {
          parent: "#js-properties-panel",
        },
        moddleExtensions: {
          camunda: CamundaBpmnModdle,
        },
        additionalModules: [
          // customPropertiesProviderModule,
          BpmnPropertiesPanelModule,
          BpmnPropertiesProviderModule,
          CamundaPlatformPropertiesProviderModule,
          lintModule,
        ],
        linting: {
          bpmnlint: bpmnlintConfig,
          active: true,
        },
      });

      modeler.on("import.done", (event) => {
        const { error, warnings } = event;

        if (error) {
          console.log(error.message, err.warnings);
        }

        modeler.get("canvas").zoom("fit-viewport");
      });

      modeler.on("commandStack.changed", (event) => {
        // console.log("commandStack.changed", event);
        // user modeled something or
        // performed an undo/redo operation
      });

      modeler.on("element.changed", (event) => {
        // console.log("element.changed", event);
        const element = event.element;

        // the element was changed by the user
      });

      // modeler.on("shape.remove", function (event) {
      //   let taskList = sessionStorage.getItem("taskList")
      //     ? JSON.parse(sessionStorage.getItem("taskList"))
      //     : null;
      //   if (taskList) {
      //     taskList = taskList.filter(
      //       (task) => task.task_id !== event.element.id
      //     );
      //     sessionStorage.setItem("taskList", JSON.stringify(taskList));
      //   }
      // });

      if (xml) {
        displayDiagram(xml);
      }

      mounted.current = true;
    } else {
      // do componentDidUpdate logic
    }
  });

  const displayDiagram = async (xml) => {
    try {
      const { warnings } = await modeler.importXML(xml);
    } catch (err) {
      const { warnings } = err;
      console.log("Diagram import unsuccessful", err, warnings);
    }
  };

  // form input and dropdown change handler
  // const handleChange = (event) => {
  //   let bpmnPlugin = sessionStorage.getItem("bpmnPlugin")
  //     ? JSON.parse(sessionStorage.getItem("bpmnPlugin"))
  //     : { plugin_id: null, plugin_module_id: null, plugin_sub_module_id: null };

  //   const { name, value } = event.target;
  //   switch (name) {
  //     case "bpmnName":
  //       setFormName(value);
  //       const parser = new DOMParser();
  //       const xmlDoc = parser.parseFromString(xml, "text/xml");

  //       // Get the bpmn:process element
  //       const processElement = xmlDoc.getElementsByTagName("bpmn:process")[0];

  //       // Change the id attribute
  //       processElement.setAttribute("id", value);

  //       // Serialize the XML back to a string
  //       const serializer = new XMLSerializer();
  //       const newXml = serializer.serializeToString(xmlDoc);
  //       console.log(
  //         "🚀 ~ file: create.js:215 ~ handleChange ~ newXml:",
  //         newXml
  //       );
  //       setXml(newXml);
  //       break;
  //     case "pluginMenu":
  //       setSelectedPluginId(value);
  //       bpmnPlugin.plugin_id = value.toString();
  //       sessionStorage.setItem("bpmnPlugin", JSON.stringify(bpmnPlugin));
  //       break;

  //     case "moduleMenu":
  //       setSelectedModuleId(value);

  //       bpmnPlugin.plugin_module_id = value.toString();
  //       sessionStorage.setItem("bpmnPlugin", JSON.stringify(bpmnPlugin));

  //       const index = allModulesByPlugin.findIndex(
  //         (module) => module.id == value
  //       );
  //       if (index > -1) {
  //         setSubModuleList(allModulesByPlugin[index].plugin_sub_modules);
  //       }
  //       break;
  //     case "subModuleMenu":
  //       bpmnPlugin.plugin_sub_module_id = value.toString();
  //       sessionStorage.setItem("bpmnPlugin", JSON.stringify(bpmnPlugin));

  //       setSubSelectedModuleId(value);
  //       break;

  //     default:
  //       break;
  //   }
  // };

  const SubmitData = () => {
    // let bpmn_error = $(".bjsl-button span").text();
    // if (BPMN_ERROR === bpmn_error) {

    if (modeler) {
      console.log("xml");
      modeler.saveXML({ format: true }, function (err, xml) {
        if (err) {
          console.error("could not export BPMN 2.0 diagram xml", err);
        } else {
          console.log(xml);
          // let plugin_name = "";
          // if (plugin) {
          //   plugin_name = plugin;
          // } else {
          //   const matchedPlugin = allPlugin.find(
          //     (plugin) => plugin.id.toString() === selectedPluginId.toString()
          //   );
          //   if (matchedPlugin) {
          //     plugin_name = matchedPlugin?.name;
          //   }
          // }
          // let plugin_module_name = "";
          // let matchedModule = null;
          // if (module) {
          //   plugin_module_name = module;
          // } else {
          //   matchedModule = allModulesByPlugin.find(
          //     (module) => module.id.toString() === selectedModuleId.toString()
          //   );
          //   if (matchedModule) {
          //     plugin_module_name = matchedModule.name;
          //   }
          // }
          // let plugin_sub_module_name = "";
          // if (subModuleName) {
          //   plugin_sub_module_name = subModuleName;
          // } else {
          //   const matchedSubModule = matchedModule?.plugin_sub_modules.find(
          //     (subModule) =>
          //       subModule.id.toString() === selectedSubModuleId.toString()
          //   );
          //   if (matchedSubModule) {
          //     plugin_sub_module_name = matchedSubModule.name;
          //   }
          // }
          // let bpmnPlugin = sessionStorage.getItem("bpmnPlugin")
          //   ? JSON.parse(sessionStorage.getItem("bpmnPlugin"))
          //   : {
          //       plugin_id: null,
          //       plugin_module_id: null,
          //       plugin_sub_module_id: null,
          //     };
          // let taskList = sessionStorage.getItem("taskList");
          // if (taskList) {
          //   taskList = JSON.parse(sessionStorage.getItem("taskList"));
          // }
          // taskList = taskList?.map((task) => {
          //   console.log("task", task);
          //   return {
          //     ...task,
          //     group_id: task.group_id ? parseFloat(task.group_id) : null,
          //     user_id: task.user_id ? parseFloat(task.user_id) : null,
          //     plugin_id: bpmnPlugin.plugin_id
          //       ? parseFloat(bpmnPlugin.plugin_id)
          //       : null,
          //     plugin_sub_module_id: bpmnPlugin.plugin_sub_module_id
          //       ? parseFloat(bpmnPlugin.plugin_sub_module_id)
          //       : null,
          //     plugin_module_id: bpmnPlugin.plugin_module_id
          //       ? parseFloat(bpmnPlugin.plugin_module_id)
          //       : null,
          //     // ...bpmnPlugin,
          //   };
          // });
          // if (
          //   formName != "" &&
          //   plugin_name !== "" &&
          //   plugin_module_name !== "" &&
          //   plugin_sub_module_name !== ""
          // ) {
          //   let payload = {
          //     bpmn_data: xml,
          //     name: formName,
          //     plugin_id: parseInt(selectedPluginId), //need to correct
          //     plugin_module_id: parseInt(selectedModuleId), //need to correct
          //     plugin_name: plugin_name,
          //     plugin_module_name: plugin_module_name,
          //     plugin_sub_module_id: params.id
          //       ? params.id
          //       : parseInt(selectedSubModuleId),
          //     plugin_sub_module_name: plugin_sub_module_name,
          //   };
          //   let reqParamsAdd = {
          //     payload: payload,
          //     userTaskList: taskList ? taskList : [],
          //   };
          //   console.log("payload", reqParamsAdd);
          //   dispatch(createBpmnIo(reqParamsAdd));
          // } else {
          //   dispatch(notificationFail(label.MESSAGE_PLZ_ENTER_NAME.LABEL));
          // }
        }
        // = { bpmn_data: xml };
      });
    }
    // } else {
    //   dispatch(notificationFail(label.MESSAGE_BE_PROPERTIES_PANEL.LABEL));
    // }
  };

  // if (initLoading) {
  //   return (
  //     <Dialog open={initLoading}>
  //       <Box sx={{ padding: "1rem" }}>
  //         <CircularProgress />
  //       </Box>
  //     </Dialog>
  //   );
  // }
  return (
    <>
      <button onClick={SubmitData}>Save</button>
      <div
        style={{
          marginTop: "50px",
          width: "99%",
          padding: "42px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{ width: "100vw", height: "100vh" }}
          className="canvas"
          id="js-canvas"
          ref={ref}
        />
        <div
          className="properties-panel-parent"
          id="js-properties-panel"
          ref={propertiesPanel}
        />
      </div>
    </>
  );
};
export default BPMNModeler;
