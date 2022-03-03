import React from 'react';
import { NavLink } from 'react-router-dom';
import './../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
import 'antd/dist/antd.css';
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import { Input, Button, Form, InputNumber, Switch, Upload, message, Select } from 'antd';
import { UploadOutlined, InboxOutlined, PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../Category/User/user.scss'
import { useHistory } from 'react-router-dom';
import { userAdd } from '../../../store/Category/user';
import { ecommercegetAll } from './../../../store/Category/ecommerce';
import UserApi from '../../../api/user';
import ecommerceApi from '../../../api/ecommerce';

const SignUp1 = () => {

    const { TextArea } = Input;
    const { Option } = Select;
    const [form] = Form.useForm();
    const history = useHistory()
    const dispatch = useDispatch();
    const { categorieslist } = useSelector(state => state.categoriesReducer)
    const { ecommercelist } = useSelector(state => state.ecommerceReducer)
    console.log(ecommercelist)
    const [showAgeTotal, setShowAgeTotal] = useState(false);
    const [showAgeMore, setShowAgeMore] = useState(false);

    const validateMessages = {
        required: 'Không được để trống !',
        types: {
            string: '${label} không hợp lệ !',
            number: '${label} không hợp lệ !',

        },
        string: {
            max: '${label} tối đa 255 ký tự !',
        },
        number: {
            range: '${label} trong khoảng 1-100 !',
        },
        pattern: {
            mismatch: '${label} không hợp lệ !',
        },
    };

    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [imageUrl, setImageUrl] = useState('');
    const [ecommerce, setecommerce] = useState([]);

console.log(ecommerce);
    useEffect(() => {

        const imageUrl = form.getFieldValue('image');
        setImageUrl(imageUrl)
        console.log(imageUrl);
        dispatch(ecommercegetAll())
//         const ecommerceLogin= async()=>{
// const data=await ecommerceApi.getEcommerceLogin();
// setecommerce(data)
//         }
//         ecommerceLogin();
    }, [])

    const handleChange = info => {
        console.log(info.file);
        if (info.file.status === 'uploading') {
            setLoading(true);
        }
    };

    const onFinishAdd = async(data) => {
     const respone=await UserApi.create(data);
     if(respone.error?.message=="USER_MAIL_EXIST"){
         message.error("Email đã tồn tại")
         console.log(message.error.message);
     }else if(respone.error?.message=="USER_EXIST_NAME"){
         
        message.error("User đã tồn tại")
   
     }else{
        message.success('Đăng  Ký Thành Công')
        history.push('/auth/signin')
     }
      
    
       
    }
    const propsUpload = {
        name: 'file',
        maxCount: 1,
        action: `${process.env.REACT_APP_API_URL}/users/create-url`,

        onSuccess: (result, file) => {
            console.log('ok', result);
            if (result.success) {
                form.setFieldsValue({
                    image: result.url,
                })
                setImageUrl(result.url);
                message.success('Tải ảnh lên thành công !');
            } else {
                form.setFieldsValue({
                    image: '',
                })
                setImageUrl('');
                if (result.error.message === "File too large") {
                    message.error('Dung lượng ảnh không quá 5mb !');
                } if (result.error.message === "Images Only!") {
                    message.error('Chỉ tải lên định dạng ảnh .jpg, .png, .jpeg !');
                } else {
                    message.error('Tải ảnh lên thất bại ! Hãy thử lại !');
                }
            }
            setLoading(false);
        },
        onError: (err, response) => {
            form.setFieldsValue({
                image: '',
            })
            setImageUrl('');
            message.error('Tải ảnh lên thất bại ! Hãy thử lại');
            setLoading(false);
        }
    };


    const normContent = (value) => {
        return value.text;
    };
    const normFile = (e) => {
        return e && e.file;
    };
    return (
        <Aux>
            <Breadcrumb />
            <div className="auth-wrapper">
                <div className="auth-content">
                    <div className="auth-bg">
                        <span className="r" />
                        <span className="r s" />
                            <span className="r s" />
                        <span className="r" />
                    </div>
                    <div className="card">
                        <div className="card-body text-center">
                            <div className="mb-4">
                                <i className="feather icon-user-plus auth-icon" />
                             </div>
                            <h3 className="mb-3">SmileTech</h3>
                            <h4 className="mb-4">Đăng Ký</h4>
                            <Form className="ecommerce-form" validateMessages={validateMessages} onFinish={onFinishAdd} form={form} method='POST' encType='multipart/form-data' >

                                <Form.Item name="UserName" label="UserName" required rules={[{ required: true, whitespace: true }, { type: 'string', max: 255 }]}
                                    style={{ width: '100%', paddingRight: "10px" }}>
                                    <Input placeholder="Ví dụ: Eplaza" />
                                </Form.Item>
                                <Form.Item name="FullName" label="FullName" required rules={[{ required: true, whitespace: true }, { type: 'string', max: 255 }]}
                                    style={{ width: '100%', paddingRight: "10px" }}>
                                    <Input placeholder="nguyen duc huy" />
                                </Form.Item>
                                <Form.Item name="Password" label="Password" required rules={[{ required: true, whitespace: true }, { type: 'string', max: 255 }]}
                                    style={{ width: '100%', paddingRight: "10px" }}>
                                    <Input.Password placeholder="nguyen duc huy" />
                                </Form.Item>
                                <Form.Item name="Email" label="Email" required rules={[{ required: true }, { type: 'email', message: "không phải là Email", max: 255 }]}
                                    style={{ width: '100%', paddingRight: "10px" }}>
                                    <Input placeholder="" />
                                </Form.Item>
                                <Form.Item name="Phone" label="Phone" required rules={[{ required: true }, { type: 'string' }, { pattern: /((09|03|07|08|05)+([0-9]{8})\b)/g }]}
                                    style={{ width: '100%', paddingRight: "10px" }}>
                                    <Input placeholder="" />
                                </Form.Item>
                                <Form.Item name="EcommerceId" label="ecommerceId" required rules={[{ required: true }]}
                                    style={{ width: '100%', paddingRight: "10px" }}>
                                    <Select
                                        showSearch
                                        style={{ width: "100% " }}
                                        placeholder="ecommerceId"
                                        optionFilterProp="children"

                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        filterSort={(optionA, optionB) =>
                                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                        }>
                                        {ecommercelist.map((x, index) => (
                                            <Option key={index} value={x.id}>{x.name}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                {/* <Form.Item name="type" label="Type" required rules={[{ required: true }]}
                                    style={{ width: '100%', paddingRight: "10px" }}>
                                    <Select

                                        showSearch
                                        style={{ width: "100%" }}
                                        placeholder="type"
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        filterSort={(optionA, optionB) =>
                                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                        }>
                                        <Option value={1}>Hoạt Động</Option>
                                        <Option value={0}>Tạm Dừng</Option>
                                    </Select>
                                </Form.Item> */}

                                {/* <Form.Item name="new_img" label="Ảnh Đại Diện" valuePropName="file" getValueFromEvent={normFile}
                                    rules={[{ required: true }]} style={{ width: '100%' }} >
                                    <Upload
                                        {...propsUpload}
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        onChange={handleChange}
                                    >
                                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            : <div>
                                                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                                                <div style={{ marginTop: 8 }}>Upload</div>
                                            </div>}
                                    </Upload>
                                </Form.Item> */}

                                <Form.Item name="image" hidden={true}>
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    style={{ width: '90%' }}>

                                </Form.Item>
                                <Form.Item style={{ width: '90%' }} >
                                    <Button className='button-login' htmlType="submit" type="primary">Signup</Button>
                              <br/>
                               
                                </Form.Item >
                          
                            </Form>
                            <p className="mb-0 text-muted">Bạn đã có tài khoản ? <NavLink to="/auth/signin">Đăng nhập</NavLink></p>
                            {/* <div className="form-group text-left">
                                    <div className="checkbox checkbox-fill d-inline">
                                        <input type="checkbox" name="checkbox-fill-2" id="checkbox-fill-2"/>
                                            <label htmlFor="checkbox-fill-2" className="cr">Send me the <a href={DEMO.BLANK_LINK}> Newsletter</a> weekly.</label>
                                    </div>
                                </div> */}
                            {/* <button className="btn btn-primary shadow-2 mb-4">Đăng ký</button> */}
                    
                        </div>
                    </div>
                </div>
            </div>
        </Aux>
    );

}

export default SignUp1;