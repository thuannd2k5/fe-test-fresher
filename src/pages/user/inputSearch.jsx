import { Button, Col, Form, Input, Row, Card, Space } from "antd";

const InputSearch = (props) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        let query = "";

        if (values.name) {
            query += `&fullName=/${values.name}/i`
        }

        if (values.email) {
            query += `&email=/${values.email}/i`
        }

        if (values.phone) {
            query += `&phone=/${values.phone}/i`
        }

        if (query) {
            props.handleSearch(query)
        }
    };


    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 32,
                marginBottom: 32,
            }}
        >
            <Card
                style={{ width: '95%' }}
                bordered={false}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={8}>
                            <Form.Item label="Name" name="name">
                                <Input placeholder="Nhập tên" />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item label="Email" name="email">
                                <Input placeholder="Nhập email" />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item label="Số điện thoại" name="phone">
                                <Input placeholder="Nhập số điện thoại" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row justify="end">
                        <Space>
                            <Button type="primary" htmlType="submit">
                                Search
                            </Button>
                            <Button
                                onClick={() => form.resetFields()}
                            >
                                Clear
                            </Button>
                        </Space>
                    </Row>
                </Form>
            </Card>
        </div>
    );
};

export default InputSearch;
