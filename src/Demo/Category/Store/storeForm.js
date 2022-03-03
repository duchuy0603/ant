import React from 'react'
import { Input, Button, Form, InputNumber, Switch, Upload, message,Select } from 'antd';
import { UploadOutlined, InboxOutlined ,LoadingOutlined,PlusOutlined} from '@ant-design/icons';
import { ecommercegetAll } from '../../../store/Category/ecommerce';
import { useState } from 'react';
import './store.scss'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const StoreForm = ({ onFinish, form, idEdit}) => {
   const {Option}=Select;
    const dispatch = useDispatch();
 useEffect(() => {
 dispatch(ecommercegetAll())
 }, [])
 const {ecommercelist}=useSelector(state=>state.ecommerceReducer)
 console.log(ecommercelist)
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
                <Form.Item name="content" label="Content" required rules={[{ required: true }, { type: 'string', min: 0, max: 255 }]}
                    style={{ width: '50%' }}>
                    <Input placeholder="" />
                </Form.Item>
                <Form.Item name="des" label="Description" required rules={[{ required: true }, { type: 'string', max: 255 }]}
                    style={{ width: '50%', paddingRight: "10px" }}>
                    <TextArea></TextArea>
                </Form.Item>
                <Form.Item name="gmap" label="GMap" required rules={[{ required: true }, { type: 'string', min: 0, max: 255 }]}
                    style={{ width: '50%' }}>
                    <Input placeholder="Ví dụ: 172A Yên Lãng" />
                </Form.Item>
                <Form.Item name="facebook" label="Facebook" required rules={[{ required: true }, { type: 'string', min: 0, max: 255 }]}
                    style={{ width: '50%' }}>
                    <Input placeholder="Ví dụ: Facebook" />
                </Form.Item>
                <Form.Item name="shopee" label="Shopee" required rules={[{ required: true }, { type: 'string', min: 0, max: 255 }]}
                    style={{ width: '50%' }}>
                    <Input placeholder="Ví dụ: Nguyễn Đức Huy" />
                </Form.Item>
                <Form.Item name="youtube" label="Youtube" required rules={[{ required: true }, { type: 'string', min: 0, max: 255 }]}
                    style={{ width: '50%' }}>
                    <Input placeholder="Ví dụ: Nguyễn Đức Huy" />
                </Form.Item>
                <Form.Item name="ecommerce_id" label="EcommerceId" required rules={[{ required: true }]}
                    style={{ width: '50%' }}>
                    <Select
                       
                        showSearch
                        style={{ width: 200 }}
                        placeholder="ecommerceId"
                        optionFilterProp="children"
                       
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        filterSort={(optionA, optionB) =>
                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                        }>
                        {ecommercelist.map((x,index)=>(
                                <Option  key={index} value={x.id}>{x.name}</Option>
                                
                            ))}
                    </Select>
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

export default StoreForm
