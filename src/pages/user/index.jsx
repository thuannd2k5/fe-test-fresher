import { Button, Table, Form, Input, Row, Col, Space } from 'antd';


const UserPage = () => {

    const [form] = Form.useForm();
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Chinese Score',
            dataIndex: 'chinese',
            sorter: {
                compare: (a, b) => a.chinese - b.chinese,
                multiple: 3,
            },
        },
        {
            title: 'Math Score',
            dataIndex: 'math',
            sorter: {
                compare: (a, b) => a.math - b.math,
                multiple: 2,
            },
        },
        {
            title: 'English Score',
            dataIndex: 'english',
            sorter: {
                compare: (a, b) => a.english - b.english,
                multiple: 1,
            },
        },
    ];
    const data = [
        {
            key: '1',
            name: 'John Brown',
            chinese: 98,
            math: 60,
            english: 70,
        },
        {
            key: '2',
            name: 'Jim Green',
            chinese: 98,
            math: 66,
            english: 89,
        },
        {
            key: '3',
            name: 'Joe Black',
            chinese: 98,
            math: 90,
            english: 70,
        },
        {
            key: '4',
            name: 'Jim Red',
            chinese: 88,
            math: 99,
            english: 89,
        },
    ];
    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };


    return (
        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: 40,
                    marginBottom: 40
                }}>
                <Form
                    form={form}
                    layout="vertical"
                    style={{ width: '95%', textAlign: "right" }}
                >
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item label="Name" name="name">
                                <Input placeholder="Nhập tên" />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item label="Email" name="email">
                                <Input placeholder="Nhập email" />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item label="Số điện thoại" name="phone">
                                <Input placeholder="Nhập số điện thoại" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item>
                        <Space>
                            <Button type="primary">Search</Button>
                            <Button htmlType="reset">Clear</Button>
                        </Space>
                    </Form.Item>
                </Form>

            </div>
            <Table
                columns={columns}
                dataSource={data}
                onChange={onChange}
                pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['1', '2', '3'] }}
                style={{ margin: 20 }} />;
        </>
    )
}

export default UserPage;