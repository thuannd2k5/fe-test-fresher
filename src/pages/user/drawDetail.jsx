import { Badge, Descriptions, Drawer } from 'antd';
import moment from 'moment';


const DrawDetail = (props) => {
    const { openViewDetail, setOpenViewDetail, dataViewDetail, setDataViewDetail } = props;

    const onClose = () => {
        setOpenViewDetail(false)
    }

    return (
        <>
            <Drawer
                title="Chức năng xem chi tiết"
                onClose={onClose}
                open={openViewDetail}
                width={"50vw"}
            >
                <Descriptions
                    title="Thông tin user"
                    column={2}
                    bordered
                >
                    <Descriptions.Item label="ID">{dataViewDetail?._id}</Descriptions.Item>
                    <Descriptions.Item label="FullName">{dataViewDetail?.fullName}</Descriptions.Item>
                    <Descriptions.Item label="Email">{dataViewDetail?.email}</Descriptions.Item>
                    <Descriptions.Item label="Phone">{dataViewDetail?.phone}</Descriptions.Item>
                    <Descriptions.Item label="Role" span={2}>
                        <Badge status="processing" text={dataViewDetail?.role} />
                    </Descriptions.Item>
                    <Descriptions.Item label="CreateAt">{moment(dataViewDetail?.createdAt).format("DD-MM-YYYY HH:mm:ss")}</Descriptions.Item>
                    <Descriptions.Item label="UpdatedAt">{moment(dataViewDetail?.updatedAt).format("DD-MM-YYYY HH:mm:ss")}</Descriptions.Item>
                </Descriptions>
            </Drawer>
        </>
    );
};
export default DrawDetail;