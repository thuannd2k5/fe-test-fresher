import { Button, Table, Form, Input, Row, Col, Space } from 'antd';
import { useEffect, useState } from 'react';
import { callFetchUser } from '../../services/api';


const UserTable = () => {

    const [listUser, setListUser] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        fetchUser();
    }, [current, pageSize])


    const fetchUser = async () => {
        let query = `current=${current}&pageSize=${pageSize}`;
        const res = await callFetchUser(query);

        if (res && res.data) {
            setListUser(res.data.result);
            setTotal(res.data.meta.total);
        }
    }

    const columns = [
        {
            title: 'id',
            dataIndex: '_id',
        },
        {
            title: 'Tên Đầy Đủ',
            dataIndex: 'fullName',
            sorter: true
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: true
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            sorter: true
        },
        {
            title: 'Action',
            render: (text, record, index) => {
                return (
                    <><button>Delete</button></>
                )
            },
        },

    ];



    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination);
        if (pagination && pagination.current !== current) {
            setCurrent(pagination.current);
        }
        if (pagination && pagination.pageSize !== pageSize) {
            setPageSize(pagination.pageSize);
            setCurrent(1);
        }
    };


    return (
        <>
            <Table rowKey="_id"
                columns={columns}
                dataSource={listUser}
                onChange={onChange}
                pagination={{
                    current: current,
                    pageSize: pageSize,
                    showSizeChanger: true,
                    total: total

                }}
                style={{ margin: 20 }} />;
        </>
    )
}

export default UserTable;