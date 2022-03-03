import React from 'react'
import { Input, Button, Form, InputNumber, Switch, Upload, message } from 'antd';
import { UploadOutlined, InboxOutlined ,LoadingOutlined,PlusOutlined} from '@ant-design/icons';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import './ecommerce.scss'
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual';
import { ecommercegetAll } from '../../../store/Category/ecommerce';
const EcommerceForm = ({ onFinish, form, idEdit}) => {

   const trans=useTranslate();
    const dispatch = useDispatch(); 
    const { TextArea } = Input;
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
        action: `${process.env.REACT_APP_API_URL}/upload/upload-single `,
        onSuccess: (result, file) => {          
            if(result.success) {
                form.setFieldsValue({
                    image: result.url,
                 
                  
                })
                console.log('huy',result)
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
    //  method='POST' encType='multipart/form-data'
    return (
        <div>
             <Form className="ecommerce-form"           
                onFinish={onFinish }             
                validateMessages={validateMessages}
                
                form={form} >
                {
                    idEdit &&
                    <Form.Item name="id" hidden={true}>
                        <Input />
                    </Form.Item>
                }
                <Form.Item name="name" label="Tên" required rules={[{ required: true, whitespace: true }, { type: 'string', max: 255 }]}
                    style={{ width: '50%', paddingRight: "10px" }}>
                    <Input placeholder="Ví dụ: Eplaza" />
                </Form.Item>
                <Form.Item name="email" label="Email" required rules={[{ required: true }, { type: 'email', message: "không phải là Email" }, { max: 255 }]}
                    style={{ width: '50%' }}>
                    <Input placeholder="Ví dụ: Eplaza@gmail.com" />
                </Form.Item>
                <Form.Item name="phone" label="Phone" required rules={[{ required: true }, { pattern: /((09|03|07|08|05)+([0-9]{8})\b)/g }]}
                    style={{ width: '50%', paddingRight: "10px" }}>
                    <Input style={{ width: '100%' }} placeholder="Ví dụ: 0902174492" />
                </Form.Item>
                <Form.Item name="address" label="Address" required rules={[{ required: true }, { type: 'string', min: 0, max: 255 }]}
                    style={{ width: '50%' }}>
                    <Input placeholder="Ví dụ: 172A Yên Lãng" />
                </Form.Item>
                <Form.Item name="des" label="Description" required rules={[{ required: true }, { type: 'string', max: 255 }]}
                    style={{ width: '50%', paddingRight: "10px" }}>
                    <TextArea></TextArea>
                </Form.Item>
                <Form.Item name="new_img" label="Ảnh tin tức" valuePropName="file" getValueFromEvent={normFile}
                  style={{ width: '50%'}} >
                        <Upload
                            {...propsUpload}
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            onChange={handleChange}
                        >
                            {imageUrl ? <img src={`${process.env.REACT_APP_API_URL}/${imageUrl}` } alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> 
                                    : <div>
                                        {loading ? <LoadingOutlined /> : <PlusOutlined />}
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>}
                        </Upload>
                    </Form.Item>
                    <Form.Item  style={{width:'90%'}}>                      
                    </Form.Item>
                    <Form.Item name="image" hidden={true}>
                        <Input />
                    </Form.Item>              
                <Form.Item className='button'>
                    <Button htmlType="submit"
                        type="primary">Lưu lại</Button>
                </Form.Item>
            </Form>  
        </div>
    )
}
export default EcommerceForm
