import React, { useState, useEffect } from 'react';
import { Form } from '@remix-run/react';
import { useLoaderData } from '@remix-run/react';
import UsersPending from '~/components/tables/UsersPending';

import DashboardLayout from '~/layouts/Dashboardlayout';
import Breadcrumb from '~/components/Breadcrumb';

export async function loader({ request, params }: LoaderContext) {
    const response = await fetch(`http://localhost:3000/api/org/users/${params.orgId}`, {
        headers: {
            cookie: request.headers.get('cookie'), // Pass the cookies along with the request
        },
    });
    const data = await response.json();
    console.log('DATA', data);
    return data;
}


function ManageUsers() {
    const { users, joinRequests } = useLoaderData();
    console.log('USERS', users);
    console.log('JOIN REQUESTS', joinRequests);



    return (
        <DashboardLayout >
        <Breadcrumb pageName="Manage Users" />
        <UsersPending joinRequests={joinRequests} />
        </DashboardLayout>
    )

}

export default ManageUsers;