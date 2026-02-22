import { InboxOutlined } from "@ant-design/icons";
import { Divider, message, Modal, notification, Table } from "antd";
import Dragger from "antd/es/upload/Dragger";
import { useState } from "react";
import * as XLSX from "xlsx";
import { callImportUserBulk } from "../../services/api";

const UserImport = (props) => {
    const { openModalImport, setOpenModalImport } = props;
    const [dataSource, setDataSource] = useState([]);

    const dummyRequest = async ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 1000);
    }
    const propsUpload = {
        name: 'file',
        multiple: false,
        maxCount: 1,
        accept: ".csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        customRequest: dummyRequest,
        onChange(info) {
            const { status } = info.file;

            if (status === 'done') {
                if (info.fileList && info.fileList.length > 0) {
                    const file = info.fileList[0].originFileObj;
                    let reader = new FileReader();
                    reader.readAsArrayBuffer(file);
                    reader.onload = function (e) {
                        let data = new Uint8Array(e.target.result);
                        let workbook = XLSX.read(data, { type: 'array' });
                        // find the name of your sheet in the workbook first
                        const worksheet = workbook.Sheets[workbook.SheetNames[0]];

                        // convert to json format
                        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
                            header: ["fullName", "email", "phone"],
                            range: 1, // Bắt đầu đọc từ dòng thứ 2 (bỏ qua header)
                        });
                        if (jsonData && jsonData.length > 0) {
                            setDataSource(jsonData);
                        }
                    }
                };
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    const handleSubmit = async () => {
        const data = dataSource.map(item => ({
            ...item,
            password: "123456"
        }))
        const res = await callImportUserBulk(data);
        if (res.data) {
            notification.success({
                description: `Success ${res?.data.countSuccess}, Error ${res?.data.countError}.`,
                message: "Upload thành công"
            });
            setDataSource([]);
            setOpenModalImport(false);
            props.fetchUser();
        } else {
            notification.error({
                description: res.message,
                message: "Đã có lỗi xảy ra"
            })
        }


    };
    return (
        <>
            <Modal
                title="Import Data User"
                open={openModalImport}
                onOk={() => handleSubmit()}
                onCancel={() => {
                    setOpenModalImport(false);
                    setDataSource([]);
                }}
                okText="Import Data"
                width={"50vw"}
                okButtonProps={{
                    disabled: dataSource.length < 1
                }}
                maskClosable={false}

            >
                <Divider />
                <Dragger {...propsUpload}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single upload. Only accepted file format: .csv, .xlsx, .xls
                    </p>
                </Dragger>
                <div style={{ paddingTop: 20 }}>
                    <span>Dữ liệu Upload</span>
                    <Table
                        rowKey="email"
                        dataSource={dataSource}
                        columns={[
                            { title: 'Name', dataIndex: 'fullName' },
                            { title: 'Email', dataIndex: 'email' },
                            { title: 'Phone', dataIndex: 'phone' }
                        ]}
                    />
                </div>
            </Modal>
        </>
    )
}

export default UserImport;