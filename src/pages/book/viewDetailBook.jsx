import { Badge, Descriptions, Divider, Drawer, Modal, Upload } from "antd";
import moment from "moment";
import { FORMAT_DATE_DISPLAY } from "../../utils/constant";
import { useState } from "react";

const ViewDetailBook = (props) => {

    const getBase64 = file =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });

    const { openViewDetail, setOpenViewDetail, dataViewDetail } = props;

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
            uid: '-2',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
            uid: '-3',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
            uid: '-4',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
    ]);

    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    const handleChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    }


    return (
        <>
            <Drawer
                title="Chi tiết Sách"
                closable={{ 'aria-label': 'Close Button' }}
                onClose={() => setOpenViewDetail(false)}
                open={openViewDetail}
                width={"50vw"}
            >
                <Descriptions
                    title="Thông tin sách"
                    bordered
                    column={2}
                >
                    <Descriptions.Item label="ID" >{dataViewDetail?._id}</Descriptions.Item>
                    <Descriptions.Item label="Tên Sách" >{dataViewDetail?.mainText}</Descriptions.Item>
                    <Descriptions.Item label="Tác Giả">{dataViewDetail?.author}</Descriptions.Item>
                    <Descriptions.Item label="Giá tiền">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(dataViewDetail?.price)}</Descriptions.Item>
                    <Descriptions.Item label="Thể Loại" span={2}>
                        <Badge status="processing" text={dataViewDetail?.category} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Ngày tạo">{moment(dataViewDetail?.createdAt).format(FORMAT_DATE_DISPLAY)}</Descriptions.Item>
                    <Descriptions.Item label="Ngày cập nhật">{moment(dataViewDetail?.updatedAt).format(FORMAT_DATE_DISPLAY)}</Descriptions.Item>
                </Descriptions>
                <Divider orientation="left">Ảnh Book</Divider>
                <Upload
                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    showUploadList={
                        { showRemoveIcon: false }
                    }
                >
                </Upload>
                <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={() => handleCancel()}>
                    <img
                        style={{ width: '100%' }}
                        src={previewImage}
                    />
                </Modal>

            </Drawer >
        </>
    )
}

export default ViewDetailBook;