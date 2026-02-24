import { Button, Col, Form, Input, Row, Card, Space } from "antd";

const InputBook = (props) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        let query = "";

        if (values.mainText) {
            query += `&mainText=/${values.mainText}/i`
        }

        if (values.author) {
            query += `&author=/${values.author}/i`
        }

        if (values.category) {
            query += `&category=/${values.category}/i`
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
                            <Form.Item label="mainText" name="mainText">
                                <Input placeholder="Tên Sách" />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item label="author" name="author">
                                <Input placeholder="Tác Giả" />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item label="category" name="category">
                                <Input placeholder="Thể Loại" />
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

export default InputBook;
