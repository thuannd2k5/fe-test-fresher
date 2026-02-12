import { Button, Table, Form, Input, Row, Col, Space } from 'antd';
import { useEffect, useState } from 'react';
import { callFetchUser } from '../../services/api';
import InputSearch from './inputSearch';
import { MdDeleteOutline } from 'react-icons/md';
import { GrPowerReset } from 'react-icons/gr';
import { TfiImport } from 'react-icons/tfi';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { LiaFileExportSolid } from 'react-icons/lia';


const UserTable = () => {

    const [listUser, setListUser] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchUser();
    }, [current, pageSize])


    const fetchUser = async (queryString) => {
        setIsLoading(true);
        let query = `current=${current}&pageSize=${pageSize}`;

        if (queryString) {
            query += queryString
        }
        const res = await callFetchUser(query);

        if (res && res.data) {
            setListUser(res.data.result);
            setTotal(res.data.meta.total);
        }
        setIsLoading(false);
    }

    const handleSearch = (query) => {
        fetchUser(query)
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
                    <><MdDeleteOutline color='red' size="1.5em" /></>
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
            <InputSearch handleSearch={handleSearch} />
            <div style={{ margin: 20, backgroundColor: "white", padding: 32, }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <div style={{ fontSize: "25px", paddingBottom: "15px" }}>
                        Table list users
                    </div>
                    <div style={{ display: "flex", paddingRight: "5px" }}>
                        <Button style={{ backgroundColor: "#187ced", color: "white", marginRight: "10px" }}>
                            <LiaFileExportSolid />&nbsp; Export
                        </Button >
                        <Button style={{ backgroundColor: "#187ced", color: "white", marginRight: "10px" }}>
                            <TfiImport />&nbsp; Import
                        </Button>
                        <Button style={{ backgroundColor: "#187ced", color: "white", marginRight: "10px" }}>
                            <IoIosAddCircleOutline />&nbsp;Them moi
                        </Button>
                        <Button style={{ border: "none", }}>
                            <GrPowerReset size="1.5em" />
                        </Button>
                    </div>
                </div>
                <Table rowKey="_id"
                    isLoading={isLoading}
                    columns={columns}
                    dataSource={listUser}
                    onChange={onChange}
                    pagination={{
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: total

                    }}
                />;
            </div>
        </>
    )
}

export default UserTable;