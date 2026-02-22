import { Button, message, notification, Popconfirm, Table } from 'antd';
import { useEffect, useState } from 'react';
import { callDeleteUser, callFetchUser } from '../../services/api';
import InputSearch from './inputSearch';
import { MdDeleteOutline } from 'react-icons/md';
import { GrPowerReset } from 'react-icons/gr';
import { TfiImport } from 'react-icons/tfi';
import { IoMdAdd } from 'react-icons/io';
import { LiaFileExportSolid } from 'react-icons/lia';
import DrawDetail from './drawDetail';
import CreateUserPage from './createUser';
import moment from 'moment';
import { FORMAT_DATE_DISPLAY } from '../../utils/constant';
import UserImport from './userImport';
import * as XLSX from "xlsx";
import { GoPencil } from 'react-icons/go';
import UpdateUser from './updateUser';


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

    const [openCreateUser, setOpenCreateUser] = useState(false);
    const [openModalImport, setOpenModalImport] = useState(false);

    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);

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

    const handleDeleteUser = async (id) => {
        setIsLoading(true);
        const res = await callDeleteUser(id);
        if (res && res.data) {
            message.success("Xóa người dùng thành công!");
            await fetchUser();
        } else {
            notification.error({
                message: "Có lỗi xảy ra",
                description: res.message
            })
        }
        setIsLoading(false);
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
            title: 'UpdatedAt',
            dataIndex: 'updatedAt',
            sorter: true,
            render: (text, record, index) => {
                return (moment(record?.updatedAt).format(FORMAT_DATE_DISPLAY))
            }
        },
        {
            title: 'Action',
            render: (text, record, index) => {
                return (
                    <div style={{ display: "flex", gap: 10 }}>
                        <Popconfirm
                            placement="left"
                            title="Xóa người dùng"
                            description="Bạn có chắc chắn muốn xóa người dùng này?"
                            onConfirm={() => handleDeleteUser(record._id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <span>
                                <MdDeleteOutline color='red' size="1.5em" />
                            </span>
                        </Popconfirm>
                        <GoPencil
                            color='yellow' size="1.5em"
                            onClick={() => {
                                setOpenModalUpdate(true)
                                setDataUpdate(record)
                            }}
                        />
                    </div>
                )
            },
        },

    ];

    const handleExportExcel = (data) => {
        if (data.length > 0) {
            const worksheet = XLSX.utils.json_to_sheet(data);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            XLSX.writeFile(workbook, "DataSheet.xlsx");
        }
    };

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
                        onClick={() => handleExportExcel(listUser)}
                    >
                        Export
                    </Button >
                    <Button
                        icon={<TfiImport />}
                        type='primary'
                        onClick={() => {
                            setOpenModalImport(true)
                        }}
                    >
                        Import
                    </Button>
                    <Button
                        icon={<IoMdAdd />}
                        type='primary'
                        onClick={() => {
                            setOpenCreateUser(true)
                        }}
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
            <CreateUserPage
                openCreateUser={openCreateUser}
                setOpenCreateUser={setOpenCreateUser}
                fetchUser={fetchUser}
            />
            <UserImport
                openModalImport={openModalImport}
                setOpenModalImport={setOpenModalImport}
                fetchUser={fetchUser}
            />
            <UpdateUser
                openModalUpdate={openModalUpdate}
                setOpenModalUpdate={setOpenModalUpdate}
                fetchUser={fetchUser}
                listUser={listUser}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
            />
        </>
    )
}

export default UserTable;