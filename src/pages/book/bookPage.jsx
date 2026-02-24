import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import { callFetchBook } from "../../services/api";
import { MdOutlineDelete } from "react-icons/md";
import moment from "moment";
import { FORMAT_DATE_DISPLAY } from "../../utils/constant";
import { LuPencil } from "react-icons/lu";
import SearchBook from "./inputBook";
import { LiaFileExportSolid } from "react-icons/lia";
import { TfiImport } from "react-icons/tfi";
import { IoMdAdd } from "react-icons/io";
import { GrPowerReset } from "react-icons/gr";

const BookPage = () => {
    const [dataBook, setDataBook] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [filter, setFilter] = useState("");
    const [sortQuery, setSortQuery] = useState("sort=-updatedAt");


    useEffect(() => {
        fetchBook();
    }, [current, pageSize, filter, sortQuery])


    const fetchBook = async () => {
        setIsLoading(true);
        let query = `current=${current}&pageSize=${pageSize}`;

        if (filter) {
            query += `&${filter}`
        }

        if (sortQuery) {
            query += `&${sortQuery}`
        }

        const res = await callFetchBook(query);

        if (res && res.data) {
            setDataBook(res.data.result);
            setTotal(res.data.meta.total);
        }
        setIsLoading(false);
    }

    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
            render: (value, record, index) => {
                return (
                    <a>{record?._id}</a>
                )
            },
        },
        {
            title: 'Tên Sách',
            dataIndex: 'mainText',
            sorter: true,
            width: "25%"
        },
        {
            title: 'Thể Loại',
            dataIndex: 'category',
            sorter: true
        },
        {
            title: 'Tác Giả',
            dataIndex: 'author',
            sorter: true,
            width: "15%"
        },
        {
            title: 'Giá tiền',
            sorter: true,
            dataIndex: 'price'
        },
        {
            title: 'Ngày Cập Nhật',
            dataIndex: 'updatedAt',
            sorter: true,
            render: (value, record, index) => {
                return (
                    moment(record.updatedAt).format(FORMAT_DATE_DISPLAY)
                )
            }
        },
        {
            title: 'Action',
            render: (value, record, index) => {
                return (
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.25em" }}>
                        <MdOutlineDelete style={{ color: "red" }} />
                        <LuPencil style={{ color: "yellow" }} />
                    </div>
                )
            }
        }
    ];

    const handleCaption = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: "20px", backgroundColor: "white" }}>
                <span >
                    Table List Books
                </span>
                <div style={{ display: "flex", gap: 15 }}>
                    <Button
                        icon={<LiaFileExportSolid />}
                        type='primary'
                        onClick={() => handleExportExcel(dataBook)}
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
                            setOpenCreateBook(true)
                        }}
                    >
                        Them moi
                    </Button>
                    <Button type="ghost" onClick={() => {
                        setFilter("");
                        setSortQuery("sort=-updatedAt")
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
        console.log("sorter", sorter)
        if (sorter && sorter.field) {
            const q = sorter.order === 'ascend' ? `sort=${sorter.field}` : `sort=-${sorter.field}`
            setSortQuery(q);
        }
    };

    const handleSearch = (query) => {
        setFilter(query)
    }

    return (
        <>
            <SearchBook handleSearch={handleSearch} />
            {handleCaption()}
            <Table
                rowKey="_id"
                loading={isLoading}
                columns={columns}
                dataSource={dataBook}
                onChange={onChange}
                pagination={{
                    current: current,
                    pageSize: pageSize,
                    total: total,
                    showSizeChanger: true,
                    showTotal: (total, range) => {
                        return (
                            <div> {range[0]}-{range[1]} trên {total} rows</div>
                        )
                    }
                }}
            />;
        </>
    )
}

export default BookPage;