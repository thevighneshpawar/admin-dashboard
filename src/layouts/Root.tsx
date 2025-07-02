import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { self } from '../http/api';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../store';
import { AxiosError } from 'axios';

const getSelf = async () => {
    const { data } = await self();

    return data;

};

const Root = () => {


    const { setUser } = useAuthStore();

    const { data, isLoading } = useQuery({
        queryKey: ['self'],
        queryFn: getSelf,
        retry(failureCount: number, error) {
            // If the error is a 401 Unauthorized, do not retry
            if (error instanceof AxiosError && error.response?.status === 401) {
                return false;
            }
            // Retry up to 3 times for other errors
            return failureCount < 3;
        },
    })

    useEffect(() => {

        //  console.log(data);

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
