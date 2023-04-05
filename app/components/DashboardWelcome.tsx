import React from 'react';
import { Link } from 'react-router-dom';

const DashboardWelcome: React.FC = () => {
    return (
        <div className='text-center'>
            <h1 className='text-2xl font-bold mb-4'>Welcome!</h1>
            <p>You are not part of an oragnization yet.</p>
            <div className='mt-4'>
                <Link
                    to='/dashboard/create-org'
                    className='bbg-blue-500  text-white px-4 py-2 rounded mr-4'
                >
                    Create an organization
                </Link>
                <Link
                    to='/dashboard/join-org'
                    className='bg-blue-500 text-white px-4 py-2 rounded'
                >
                    Join an organization
                </Link>
                </div>
        </div>
    );
};

export default DashboardWelcome;
    