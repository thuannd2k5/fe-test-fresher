import { Divider, Form, Input, message, Modal, notification } from "antd";
import { useEffect, useState } from "react";
import { callUpdateUser } from "../../services/api";

const UpdateUser = (props) => {
    const { openModalUpdate, setOpenModalUpdate, fetchUser, dataUpdate, setDataUpdate } = props;

    const [isLoading, setIsLoading] = useState(false);

    const [form] = Form.useForm();

    const onFinish = async (values) => {
        const { _id, fullName, phone } = values;
        setIsLoading(true)
        const res = await callUpdateUser(_id, fullName, phone);

        if (res && res.data) {
            message.success("Cập nhật người dùng thành công!");
            setOpenModalUpdate(false);
            await fetchUser();
        } else {
            notification.error({
                message: "Có lỗi xảy ra",
                description: res.message
            })
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if (dataUpdate) {
            form.setFieldsValue(dataUpdate)
        }
    }, [dataUpdate])


    return (
        <>
            <Modal
                title="Cập nhật người dùng"
                open={openModalUpdate}
                onOk={() => { form.submit() }}
                onCancel={() => {
                    setOpenModalUpdate(false)
                    setDataUpdate(null);
                }}
                maskClosable={false}
                okText={"Cập nhật"}
                cancelText={"Hủy"}
                confirmLoading={isLoading}
            >
                <Divider />
                <Form
                    form={form}
                    onFinish={onFinish}
                    style={{ maxWidth: 600 }}
                    autoComplete="off"
                >
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="ID"
                        name="_id"
                        rules={[{ required: true }]}
                        hidden
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Tên Đầy Đủ"
                        name="fullName"
                        rules={[{ required: true, message: "Vui lòng nhập họ tên người dùng" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: "Vui lòng nhập email người dùng" }]}
                    >
                        <Input disabled />
                    </Form.Item>

                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Số điện thoại"
                        name="phone"
                        rules={[{ required: true, message: "Vui lòng nhập số điện thoại người dùng" }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default UpdateUser;