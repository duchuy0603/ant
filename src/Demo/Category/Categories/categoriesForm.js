import React from 'react'
import { Input, Button, Form, InputNumber, Switch, Upload, message ,Select} from 'antd';
import { UploadOutlined, InboxOutlined ,LoadingOutlined,PlusOutlined} from '@ant-design/icons';
import { ecommercegetAll } from '../../../store/Category/ecommerce';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import './categories.scss'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { min } from 'moment';

const CategoriesForm = ({ onFinish, form, idEdit}) => {
    const { Option } = Select;
    const dispatch = useDispatch();
 const {ecommercelist}=useSelector(state=>state.ecommerceReducer)
 
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
        dispatch(ecommercegetAll())
    }, [form,idEdit])

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
            console.log('okk', result);
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
               
                <Form.Item name="content" label="Content" required rules={[{ required: true }]}
                    style={{ width: '50%', paddingRight: "10px" }}>
                    <Input style={{ width: '100%' }} placeholder="Ví dụ: 0902174492" />
                </Form.Item>
                <Form.Item name="parent_id" label="ParentId" required rules={[{ required: true}]}
                    style={{ width: '50%', paddingRight: "10px"  }}>
                    <Input placeholder="Ví dụ: 172A Yên Lãng" />
                </Form.Item>
                
                <Form.Item name="des" label="Description" required rules={[{ required: true }, { type: 'string', max: 255 }]}
                    style={{ width: '50%', paddingRight: "10px" }}>
                    <TextArea></TextArea>
                </Form.Item>

                <Form.Item name="ecommerce_id" label="EcommerceId" required rules={[{ required: true }]}
                    style={{ width: '50%', paddingRight: "10px"  }}>
                    <Select
                       
                        showSearch
                        style={{ width: "100%" }}
                        placeholder="EcommerceId"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        filterSort={(optionA, optionB) =>
                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                        }>
                      

                        {ecommercelist.map((x)=>(
                            <Option key={x} value={x.id} >{x.name}</Option>
                        ))}
                        
                       
                    </Select>
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
                            {imageUrl ? <img src={`${process.env.REACT_APP_API_URL}/${imageUrl}`} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> 
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

export default CategoriesForm;
