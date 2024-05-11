// import React from 'react';
// import Logout from '../Logout'; // Ensure you have the correct path to the Logout component

// function UserDashboard() {
//     return (
//         <div style={{ padding: '20px', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
//             <h1>User Dashboard</h1>
//             <Logout />
//             <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//                 <div style={{ width: '60%', padding: '20px', marginTop: '20px', backgroundColor: '#fff', borderRadius: '8px' }}>
//                     <h2>Profile</h2>
//                     <p>View and edit your profile information.</p>
//                 </div>
//                 <div style={{ width: '60%', padding: '20px', marginTop: '20px', backgroundColor: '#fff', borderRadius: '8px' }}>
//                     <h2>Activities</h2>
//                     <p>Check your recent activities and stats.</p>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default UserDashboard;
import React from 'react';
import Logout from '../Logout'; // Ensure you have the correct path to the Logout component
import 'bootstrap/dist/css/bootstrap.min.css';

function UserDashboard() {
    return (
        <div className="container">
            <div className="p-4 bg-gray-200 min-h-screen">
                <h1 className="text-3xl mb-4">User Dashboard</h1>
                <Logout />
                <div className="flex flex-col items-center">
                    <div className="w-full md:w-3/5 p-4 mt-4 bg-white rounded-lg">
                        <h2 className="text-xl mb-2">Profile</h2>
                        <p>View and edit your profile information.</p>
                    </div>
                    <div className="w-full md:w-3/5 p-4 mt-4 bg-white rounded-lg">
                        <h2 className="text-xl mb-2">Activities</h2>
                        <p>Check your recent activities and stats.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserDashboard;
