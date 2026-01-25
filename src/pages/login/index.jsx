import { Button, Form, Input, Card } from 'antd';
import { NavLink } from 'react-router-dom';

const onFinish = values => {
    console.log('Success:', values);
};

const LoginPage = () => {
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
                                loading={false}
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