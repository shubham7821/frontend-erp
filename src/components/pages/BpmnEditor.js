// components/BpmnEditor.js
"use client"
import React, { useEffect, useRef } from 'react';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import propertiesPanelModule from 'bpmn-js-properties-panel';
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda-platform';
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda.json';

import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-js.css';
import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css'

const BpmnEditor = () => {
  const modelerRef = useRef(null);

  useEffect(() => {
    const modeler = new BpmnModeler({
      container: '#canvas',
      propertiesPanel: {
        parent: '#properties-panel'
      },
      additionalModules: [
        propertiesPanelModule,
        propertiesProviderModule
      ],
      moddleExtensions: {
        camunda: camundaModdleDescriptor
      }
    });

    modelerRef.current = modeler;

    const createDiagram = async () => {
      try {
        const response = await fetch('/path/to/your-diagram.bpmn');
        const diagramXML = await response.text();
        await modeler.importXML(diagramXML);
      } catch (err) {
        console.error('Failed to load diagram:', err);
      }
    };

    createDiagram();

    return () => {
      modeler.destroy();
    };
  }, []);

  return (
    <div>
      <div id="canvas" style={{ height: '500px', width: '70%', float: 'left' }}></div>
      <div id="properties-panel" style={{ width: '30%', float: 'right' }}></div>
    </div>
  );
};

export default BpmnEditor;
