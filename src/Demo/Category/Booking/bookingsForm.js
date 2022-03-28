import React from 'react'
import { Input, Button, Form, InputNumber, Switch, Upload, message,Select } from 'antd';
import { UploadOutlined, InboxOutlined, PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./bookings.scss";
import { DatePicker, Space } from 'antd';
import moment from 'moment';
import locale_vi from 'antd/es/date-picker/locale/vi_VN';
import { ecommercegetAll } from '../../../store/Category/ecommerce';
const BookingForm = ({ onFinish, form, idEdit }) => {
    const { TextArea } = Input;
    const { Dragger } = Upload;
    const { RangePicker } = DatePicker;
    const { Option } = Select;
    const dispatch=useDispatch();
    const {ecommercelist}=useSelector(state=>state.ecommerceReducer)
   
   

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
            setImageUrl(imageUrl[0])
            console.log(imageUrl);
        }
        dispatch(ecommercegetAll())
      
    }, [form, idEdit])
    function onOk(value) {
        console.log('onOk: ', value);
      }
    const handleChange = info => {
        console.log(info.file);
        if (info.file.status === 'uploading') {
            setLoading(true);
          }
    };
    

    // const propsUpload = {
    //     name: 'files',
    //     maxCount: 1,
    //     action: `${process.env.REACT_APP_API_URL}/upload/upload-array `,
    
    //     onSuccess: (result, file) => {
    //         console.log('ok', result);
    //         if(result.success) {
    //             form.setFieldsValue({
    //                 image: result.url,
    //             })
    //             setImageUrl(result.url);
    //             message.success('Tải ảnh lên thành công !');
    //         } else {
    //             form.setFieldsValue({
    //                 image: '',
    //             })
    //             setImageUrl('');
    //             if(result.error.message === "File too large") {
    //                 message.error('Dung lượng ảnh không quá 5mb !');
    //             } if(result.error.message === "Images Only!") {
    //                 message.error('Chỉ tải lên định dạng ảnh .jpg, .png, .jpeg !');
    //             } else {
    //                 message.error('Tải ảnh lên thất bại ! Hãy thử lại !');
    //             }
    //         }
    //         setLoading(false);
    //     },
    //     onError: (err, response) => {
    //         form.setFieldsValue({
    //             image: '',
    //         })
    //         setImageUrl('');
    //         message.error('Tải ảnh lên thất bại ! Hãy thử lại');
    //         setLoading(false);
    //     }
    // };

    // const props = {
    //     name: 'files',
    //     multiple: true,
    //     action: `${process.env.REACT_APP_API_URL}/upload/upload-array`,
    //     onChange(info) {
    //       const { status } = info.file;
    //       if (status !== 'uploading') {
    //         console.log(info.file, info.fileList);
    //       }
    //       if (status === 'done') {
    //         const list=info.fileList.map(item=>{return encodeURI(item.name)});
    //         console.log(list)
    //         form.setFieldsValue({
    //                              image: list,
    //                   });
                  
    //                   setImageUrl(info.list);
    //         message.success(`${info.file.name} file uploaded successfully.`);
    //       } else if (status === 'error') {
    //         form.setFieldsValue({
    //                         image: '',
    //                     })
    //                     setImageUrl('')
    //         message.error(`${info.file.name} file upload failed.`);
    //       }
    //     },
    //     onDrop(e) {
    //       console.log('Dropped files', e.dataTransfer.files);
    //     },
    //   };
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

                <Form.Item name="contact" label="Contact" required rules={[{ required: true, whitespace: true }, { type: 'string', max: 255 }]}
                    style={{ width: '50%', paddingRight: "10px" }}>
                    <Input placeholder="Ví dụ: Eplaza" />
                </Form.Item>
                <Form.Item name="phone" label="Phone" required rules={[{ required: true}]}
                    style={{ width: '50%', paddingRight: "10px" }}>
                    <Input placeholder="Ví dụ:10.000$" />
                </Form.Item>
              
                <Form.Item name="date" label="Date" 
                    style={{ width: '50%', paddingRight: "10px" }}>
                   
                   
                    <RangePicker
                    locale={locale_vi}
                    disabledDate={(currentdate)=>{
                    return currentdate&&currentdate < moment().startOf('day')
                        }}
                        showTime={{ format: 'HH:mm' }}
                        format="HH:mm DD/MM/YYYY "
                        // onChange={onChange}
                        onOk={onOk}
                    />
                   
                </Form.Item>

           
             <Form.Item name="ecommerce_id" label="Sàn" required rules={[{ required: true }]}
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
                            <Option key={x.id} value={x.id} >{x.name}</Option>
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

export default BookingForm;
