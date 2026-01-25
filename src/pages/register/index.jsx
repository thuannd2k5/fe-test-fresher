import { Button, Form, Input, Card, notification, message } from 'antd';
import { useState } from 'react';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { callRegister } from '../../services/api';


const RegisterPage = () => {
    const navigate = useNavigate();
    const [isSubmit, setIsSubmit] = useState(false);


    const onFinish = async (values) => {
        const { fullName, email, password, phone } = values;
        setIsSubmit(true);

        // Call API register here
        const res = await callRegister(fullName, email, password, phone);
        setIsSubmit(false);

        if (res?.data?._id) {
            message.success("Đăng ký tài khoản thành công!");
            navigate('/login')
        } else {
            notification.error({
                message: "Có lỗi xảy ra",
                description: res.data.message
            })
        }
    }


    return (
        <>
            <div style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #667eea 0%, #d1b9ea 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px"
            }}>
                <Card
                    style={{
                        width: "100%",
                        maxWidth: 500,
                        borderRadius: 16,
                        boxShadow: "0 20px 60px rgba(0,0,0,0.3)"
                    }}
                >
                    <div style={{ textAlign: "center", marginBottom: 30 }}>
                        <h2 style={{
                            fontSize: 28,
                            fontWeight: 700,
                            color: "#1a1a1a",
                            marginBottom: 8
                        }}>
                            Đăng Ký Tài Khoản
                        </h2>
                        <p style={{ color: "#666", fontSize: 14 }}>
                            Tạo tài khoản mới để bắt đầu
                        </p>
                    </div>

                    <Form
                        name="register"
                        onFinish={onFinish}
                        autoComplete="off"
                        layout="vertical"
                        size="large"
                    >
                        <Form.Item
                            label="Họ và tên"
                            name="fullName"
                            rules={[{ required: true, message: "Họ tên không được để trống" }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: "Email không được để trống" }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Mật khẩu"
                            name="password"
                            rules={[{ required: true, message: "Mật khẩu không được để trống" }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            label="Số điện thoại"
                            name="phone"
                            rules={[{ required: true, message: "Số điện thoại không được để trống" }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item style={{ marginBottom: 10 }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                style={{
                                    height: 45,
                                    borderRadius: 8,
                                    fontSize: 16,
                                    fontWeight: 600,
                                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                    border: "none"
                                }}
                                loading={isSubmit}
                            >
                                Đăng Ký
                            </Button>
                        </Form.Item>

                        <div style={{ textAlign: "center", color: "#666", fontSize: 14 }}>
                            Đã có tài khoản? <NavLink to="/login">Đăng nhập</NavLink>
                        </div>
                    </Form>
                </Card>
            </div>
        </>
    )
};

export default RegisterPage;