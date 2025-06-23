import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { self } from '../http/api';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../store';

const getSelf = async () => {
    const { data } = await self();

    return data;

};

const Root = () => {


    const { setUser } = useAuthStore();

    const { data, isLoading } = useQuery({
        queryKey: ['self'],
        queryFn: getSelf,


    })

    useEffect(() => {

        console.log(data);

        if (data) {
            setUser(data);
        }

    }, [data, setUser])



    if (isLoading) {
        return <div>Loading...</div>
    }




    return <Outlet />
}

export default Root
