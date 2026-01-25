import { Button, Form, Input, Card, message, notification } from 'antd';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { callLogin } from '../../services/api';
import { useDispatch } from 'react-redux';
import { doLoginAction } from '../../redux/account/accountSlice';


const LoginPage = () => {

    const navigate = useNavigate();
    const [isSubmit, setIsSubmit] = useState(false);

    const dispatch = useDispatch();

    const onFinish = async (values) => {
        const { email, password } = values;
        setIsSubmit(true);
        const res = await callLogin(email, password)
        setIsSubmit(false);

        if (res?.data) {
            localStorage.setItem("access_token", res.data.access_token);
            dispatch(doLoginAction(res.data.user))
            message.success("Đăng nhập thành công!");
            navigate('/');
        } else {
            notification.error({
                message: "Có lỗi xảy ra",
                description: Array.isArray(res?.message)
                    ? res.message.join(", ")
                    : res.message
            })
        }
    };
    return (
        <>
            <div style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #667eea 0%, #f0eaf7 100%)",
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
                            Đăng Nhập
                        </h2>
                        <p style={{ color: "#666", fontSize: 14 }}>
                            Hãy đăng nhập để bắt đầu
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
                                Đăng Nhập
                            </Button>
                        </Form.Item>

                        <div style={{ textAlign: "center", color: "#666", fontSize: 14 }}>
                            Chưa có tài khoản? <NavLink to="/register">Đăng Kí</NavLink>
                        </div>
                    </Form>
                </Card>
            </div>
        </>
    )
};


export default LoginPage;