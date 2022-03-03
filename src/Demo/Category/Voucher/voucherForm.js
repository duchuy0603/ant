import React from 'react'
import { Input, Button, Form, InputNumber, Switch, Upload, message,Select } from 'antd';
import { UploadOutlined, InboxOutlined, PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { ecommercegetAll } from '../../../store/Category/ecommerce';
import { useEffect } from 'react';
import { useState } from 'react';
import './voucher.scss'
import { useDispatch, useSelector } from 'react-redux';
import { getUserFromLocalStorage } from '../../../helpers/common';
import { DatePicker, Space } from 'antd';
import moment from 'moment';
import axios from 'axios';
import locale_vi from 'antd/es/date-picker/locale/vi_VN';
const { RangePicker } = DatePicker;

const VoucherForm = ({ onFinish, form, idEdit }) => {
    const datauser=getUserFromLocalStorage();
    const { TextArea } = Input;
    const { Dragger } = Upload;
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [imageUrl, setImageUrl] = useState('');
    const {Option}=Select;
    const dispatch=useDispatch();
    const {ecommercelist}=useSelector(state=>state.ecommerceReducer)


  
    const onChange = ({ fileList:newFileList }) => {
        setFileList(newFileList);

      };
      function onOk(value) {
        console.log('onOk: ', value);
      }
    useEffect(() => {
    
        dispatch(ecommercegetAll())
    }, [])
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

                <Form.Item name="name" label="Tên" required rules={[{ required: true, whitespace: true }, { type: 'string', max: 255 }]}
                    style={{ width: '50%', paddingRight: "10px" }}>
                    <Input placeholder="Ví dụ: Eplaza" />
                </Form.Item>
                <Form.Item name="decrease_percent" label="decrease_percent" required rules={[{ required: true}]}
                    style={{ width: '50%', paddingRight: "10px" }}>
                    <Input placeholder="Ví dụ:10.000$" />
                </Form.Item>
                <Form.Item name="decrease_price" label="decrease_price" required rules={[{ required: true }]}
                    style={{ width: '50%', paddingRight: "10px" }}>
                    <Input placeholder="Ví dụ: 20" />
                </Form.Item>
                {/* <Form.Item name="total_available" label="total_available" required rules={[{ required: true, whitespace: true }, { type: 'string', max: 255 }]}
                    style={{ width: '50%', paddingRight: "10px" }}>
                    <Input placeholder="Ví dụ: 20" />
                </Form.Item> */}
                <Form.Item name="max_decrease_price" label="max_decrease_price" required rules={[{ required: true }]}
                    style={{ width: '50%', paddingRight: "10px" }}>
                    <Input placeholder="Ví dụ: 20" />
                </Form.Item>
                <Form.Item name="voucher_type" label="Type" required rules={[{ required: true }]}
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
                <Form.Item name="date" label="Date" 
                    style={{ width: '50%', paddingRight: "10px" }}>
                   
                   
                   <DatePicker renderExtraFooter={() => ''}
                   format="HH:mm:ss DD-MM-YYYY"
                   showTime />
                   
                </Form.Item>

                <Form.Item name="des" label="Description" required rules={[{ required: true }, { type: 'string'}]}
                    style={{ width: '50%', paddingRight: "10px" }}>
                    <TextArea></TextArea>
                </Form.Item>
             <Form.Item name="ecommerce_id" label="EcommerceId" required rules={[{ required: true }]}
                    style={{ width: '50%', paddingRight: "10px"  }}>
                    <Select
                       
                        showSearch
                        style={{ width: 200 }}
                        placeholder="EcommerceId"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        filterSort={(optionA, optionB) =>
                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                        }>
                      

                        {ecommercelist.map((x,index)=>(
                            <Option key={index} value={x.id} >{x.name}</Option>
                        ))}
                        
                       
                    </Select>
                </Form.Item>
           
   
                <Form.Item name="image" hidden={true}>
                    <Input />
                </Form.Item>
        
                <Form.Item
                    style={{ width: '90%' }}>

                </Form.Item>
                <Form.Item className='button'>
                    <Button htmlType="submit" type="primary " >Lưu lại</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default VoucherForm;
