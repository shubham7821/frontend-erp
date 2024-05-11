import React, { useState } from 'react';
import axios from 'axios';

const CamundaProcessStarter = () => {
    const [processInstanceId, setProcessInstanceId] = useState('');
    const [error, setError] = useState('');

    const startProcess = async () => {
        const url = 'http://localhost:8080/engine-rest/process-definition/key/your_process_key/start';
        const headers = {
            'Content-Type': 'application/json',
            // Include Authorization if needed
            // 'Authorization': 'Basic ' + window.btoa('username:password')
        };
        const data = {
            variables: {
                exampleVar: {
                    value: 'thisIsAValue',
                    type: 'String'
                }
            }
        };

        try {
            const response = await axios.post(url, data, { headers });
            setProcessInstanceId(response.data.id);
        } catch (err) {
            setError('Failed to start process: ' + err.message);
        }
    };

    return (
        <div>
            <h1>Start Camunda Process</h1>
            <button onClick={startProcess}>Start Process</button>
            {processInstanceId && <p>Process Instance ID: {processInstanceId}</p>}
            {error && <p>Error: {error}</p>}
        </div>
    );
};

export default CamundaProcessStarter;
