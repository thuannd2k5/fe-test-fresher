import { Button, Result } from 'antd';
import { NavLink } from 'react-router-dom';

const NotPermitted = () => (
    <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={<NavLink to="/"><Button type="primary">Back Home</Button></NavLink>}
    />
);
export default NotPermitted;