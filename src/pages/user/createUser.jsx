import { Divider, Form, Input, message, Modal, notification } from "antd"
import { callCreateUser } from "../../services/api";
import { useState } from "react";

const CreateUserPage = (props) => {
    const { openCreateUser, setOpenCreateUser, fetchUser } = props;
    const [isLoading, setIsLoading] = useState(false);

    const [form] = Form.useForm();

    const onFinish = async (values) => {
        const { fullName, email, password, phone } = values;
        setIsLoading(true)
        const res = await callCreateUser(fullName, email, password, phone);

        if (res && res.data) {
            message.success("Thêm người dùng thành công!");
            form.resetFields();
            setOpenCreateUser(false);
            await fetchUser();
        } else {
            notification.error({
                message: "Có lỗi xảy ra",
                description: res.message
            })
        }
        setIsLoading(false);
    };

    return (
        <>
            <Modal
                title="Thêm mới người dùng"
                open={openCreateUser}
                onOk={() => { form.submit() }}
                onCancel={() => { setOpenCreateUser(false) }}
                maskClosable={false}
                okText={"Tạo mới"}
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
                        label="Họ và tên"
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
                        <Input />
                    </Form.Item>

                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Mật khẩu"
                        name="password"
                        rules={[{ required: true, message: "Vui lòng nhập mật khẩu người dùng" }]}
                    >
                        <Input.Password />
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

export default CreateUserPage