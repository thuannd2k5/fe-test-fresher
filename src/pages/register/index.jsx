import { Button, Form, Input, Card } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, PhoneOutlined } from '@ant-design/icons';

const onFinish = values => {
    console.log('Success:', values);
};

const RegisterPage = () => (
    <div style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
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
                    rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                >
                    <Input
                        prefix={<UserOutlined style={{ color: '#999' }} />}
                        placeholder="Nguyễn Văn A"
                        style={{ borderRadius: 8 }}
                    />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Vui lòng nhập email!' },
                        { type: 'email', message: 'Email không hợp lệ!' }
                    ]}
                >
                    <Input
                        prefix={<MailOutlined style={{ color: '#999' }} />}
                        placeholder="example@email.com"
                        style={{ borderRadius: 8 }}
                    />
                </Form.Item>

                <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[
                        { required: true, message: 'Vui lòng nhập mật khẩu!' },
                        { min: 6, message: 'Mật khẩu tối thiểu 6 ký tự!' }
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined style={{ color: '#999' }} />}
                        placeholder="••••••••"
                        style={{ borderRadius: 8 }}
                    />
                </Form.Item>

                <Form.Item
                    label="Số điện thoại"
                    name="phone"
                    rules={[
                        { required: true, message: 'Vui lòng nhập số điện thoại!' },
                        { pattern: /^[0-9]{10}$/, message: 'Số điện thoại phải có 10 chữ số!' }
                    ]}
                >
                    <Input
                        prefix={<PhoneOutlined style={{ color: '#999' }} />}
                        placeholder="0123456789"
                        style={{ borderRadius: 8 }}
                    />
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
                        loading={true}
                    >
                        Đăng Ký
                    </Button>
                </Form.Item>

                <div style={{ textAlign: "center", color: "#666", fontSize: 14 }}>
                    Đã có tài khoản? <a href="#" style={{ color: "#667eea", fontWeight: 600 }}>Đăng nhập</a>
                </div>
            </Form>
        </Card>
    </div>
);

export default RegisterPage;