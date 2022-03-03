import React from 'react'
import { Input, Button, Form, InputNumber, Switch, Upload, message,Select } from 'antd';
import { UploadOutlined, InboxOutlined, PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./user"
import axios from 'axios';

import { storegetAll } from './../../../store/Category/stores';


const UserForm = ({ onFinish, form, idEdit }) => {
    const { TextArea } = Input;
    const { Option } = Select;
    const dispatch=useDispatch();
    const {categorieslist}=useSelector(state=>state.categoriesReducer)
    const {storelist}=useSelector(state=>state.storeReducer)
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

 
    useEffect(() => {
        if(idEdit) {
            const imageUrl = form.getFieldValue('image');
            setImageUrl(imageUrl)
            console.log(imageUrl);
        }
        
        dispatch(storegetAll())
    }, [form, idEdit])

    const handleChange = info => {
        console.log(info.file);
        if (info.file.status === 'uploading') {
            setLoading(true);
          }
    };
    

    const propsUpload = {
        name: 'file',
        maxCount: 1,
        action: `${process.env.REACT_APP_API_URL}/upload/upload-single`,
    
        onSuccess: (result, file) => {
            console.log('ok', result);
            if(result.success) {
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
                if(result.error.message === "File too large") {
                    message.error('Dung lượng ảnh không quá 5mb !');
                } if(result.error.message === "Images Only!") {
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
        <div>
            <Form className="ecommerce-form" validateMessages={validateMessages} onFinish={onFinish} form={form} method='POST' encType='multipart/form-data' >
                {
                    idEdit &&
                    <Form.Item name="id" hidden={true}>
                        <Input />
                    </Form.Item>
                }

                <Form.Item name="user_name" label="UserName" required rules={[{ required: true, whitespace: true }, { type: 'string', max: 255 }]}
                    style={{ width: '50%', paddingRight: "10px" }}>
                    <Input placeholder="Ví dụ: Eplaza" />
                </Form.Item>
                <Form.Item name="full_name" label="FullName" required rules={[{ required: true, whitespace: true }, { type: 'string', max: 255 }]}
                    style={{ width: '50%', paddingRight: "10px" }}>
                    <Input placeholder="nguyen duc huy" />
                </Form.Item>
                <Form.Item name="password" label="Password" required rules={[{ required: true, whitespace: true }, { type: 'string', max: 255 }]}
                    style={{ width: '50%', paddingRight: "10px" }}>
                    <Input.Password placeholder="nguyen duc huy" />
                </Form.Item>
                <Form.Item name="email" label="Email" required rules={[{ required: true }, { type: 'email', message: "không phải là Email" , max: 255 }]}
                    style={{ width: '50%', paddingRight: "10px" }}>
                    <Input placeholder="" />
                </Form.Item>
                <Form.Item name="phone" label="Phone" required rules={[{ required: true }, { type: 'string' }, { pattern: /((09|03|07|08|05)+([0-9]{8})\b)/g }]}
                    style={{ width: '50%', paddingRight: "10px" }}>
                    <Input placeholder="" />
                </Form.Item>



                
      
                <Form.Item name="store_id" label="storeId" required rules={[{ required: true }]}
                    style={{ width: '50%',paddingRight: "10px"  }}>
                    <Select
                        showSearch
                        style={{ width: "100% "}}
                        placeholder="storeId"
                        optionFilterProp="children"
                        
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        filterSort={(optionA, optionB) =>
                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                        }>
                            {storelist.map((x,index)=>(
                                <Option  key={index} value={x.id}>{x.name}</Option>
                            ))}
                    </Select>
                </Form.Item>
                <Form.Item name="type" label="Type" required rules={[{ required: true }]}
                    style={{ width: '50%',paddingRight: "10px"  }}>
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
                </Form.Item>
      <Form.Item name="new_img" label="Ảnh Đại Diện" valuePropName="file" getValueFromEvent={normFile}
                  style={{ width: '50%'}} >
                        <Upload
                            {...propsUpload}
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            onChange={handleChange}
                        >
                            {imageUrl ? <img src={`${process.env.REACT_APP_API_URL}/${imageUrl}`} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> 
                                    : <div>
                                        {loading ? <LoadingOutlined /> : <PlusOutlined />}
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>}
                        </Upload>
                    </Form.Item>
                
                <Form.Item name="image" hidden={true}>
                    <Input />
                </Form.Item>
                <Form.Item
                    style={{ width: '90%' }}>

                </Form.Item>
                <Form.Item className='button'>
                    <Button htmlType="submit" type="primary">Lưu lại</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default UserForm;
