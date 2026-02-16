import { Button, Table } from 'antd';
import { useEffect, useState } from 'react';
import { callFetchUser } from '../../services/api';
import InputSearch from './inputSearch';
import { MdDeleteOutline } from 'react-icons/md';
import { GrPowerReset } from 'react-icons/gr';
import { TfiImport } from 'react-icons/tfi';
import { IoMdAdd } from 'react-icons/io';
import { LiaFileExportSolid } from 'react-icons/lia';
import DrawDetail from './drawDetail';


const UserTable = () => {

    const [listUser, setListUser] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const [filter, setFilter] = useState("");
    const [sortQuery, setSortQuery] = useState("");

    const [openViewDetail, setOpenViewDetail] = useState(false);
    const [dataViewDetail, setDataViewDetail] = useState(null);

    useEffect(() => {
        fetchUser();
    }, [current, pageSize, filter, sortQuery])


    const fetchUser = async () => {
        setIsLoading(true);
        let query = `current=${current}&pageSize=${pageSize}`;

        if (filter) {
            query += `&${filter}`
        }

        if (sortQuery) {
            query += `&${sortQuery}`
        }

        const res = await callFetchUser(query);

        if (res && res.data) {
            setListUser(res.data.result);
            setTotal(res.data.meta.total);
        }
        setIsLoading(false);
    }

    const handleSearch = (query) => {
        setFilter(query)
    }

    const columns = [
        {
            title: 'id',
            dataIndex: '_id',
            render: (text, record, index) => {
                return (
                    <a
                        onClick={() => {
                            setDataViewDetail(record);
                            setOpenViewDetail(true);
                        }}
                    >{record._id}</a>
                )
            }
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

    const handleCaption = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: "20px", backgroundColor: "white" }}>
                <span >
                    Table List Users
                </span>
                <div style={{ display: "flex", gap: 15 }}>
                    <Button
                        icon={<LiaFileExportSolid />}
                        type='primary'
                    >
                        Export
                    </Button >
                    <Button
                        icon={<TfiImport />}
                        type='primary'
                    >
                        Import
                    </Button>
                    <Button
                        icon={<IoMdAdd />}
                        type='primary'
                    >
                        Them moi
                    </Button>
                    <Button type="ghost" onClick={() => {
                        setFilter("");
                        setSortQuery("")
                    }}>
                        <GrPowerReset />
                    </Button>
                </div>
            </div>
        )
    }

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination);
        if (pagination && pagination.current !== current) {
            setCurrent(pagination.current);
        }
        if (pagination && pagination.pageSize !== pageSize) {
            setPageSize(pagination.pageSize);
            setCurrent(1);
        }
        if (sorter && sorter.field) {
            const q = sorter.order === 'ascend' ? `sort=${sorter.field}` : `sort=-${sorter.field}`
            setSortQuery(q);
        }
    };


    return (
        <>
            <InputSearch handleSearch={handleSearch} />
            {handleCaption()}
            <Table
                rowKey="_id"
                loading={isLoading}
                columns={columns}
                dataSource={listUser}
                onChange={onChange}
                pagination={{
                    current: current,
                    pageSize: pageSize,
                    showSizeChanger: true,
                    total: total,
                    showTotal: (total, range) => {
                        return (
                            <div> {range[0]}-{range[1]} trên {total} rows</div>
                        )
                    }

                }}

            />
            <DrawDetail
                openViewDetail={openViewDetail}
                setOpenViewDetail={setOpenViewDetail}
                dataViewDetail={dataViewDetail}
                setDataViewDetail={setDataViewDetail}
            />
        </>
    )
}

export default UserTable;