import { InboxOutlined } from "@ant-design/icons";
import { Divider, message, Modal, Table } from "antd";
import Dragger from "antd/es/upload/Dragger";

const UserImport = (props) => {
    const { openModalImport, setOpenModalImport } = props;

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
            if (status !== 'uploading') {
                console.log('uploading');
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };
    return (
        <>
            <Modal
                title="Import Data User"
                open={openModalImport}
                onOk={() => setOpenModalImport(false)}
                onCancel={() => setOpenModalImport(false)}
                okText="Import Data"
                width={"50vw"}
                okButtonProps={{
                    disabled: true
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