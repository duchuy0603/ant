import React, { useCallback, useEffect, useState } from 'react';
import { Input, Button, Form, Select, message, Upload } from 'antd';
import MarkdownIt from 'markdown-it';
import MdEditor, { Plugins } from 'react-markdown-editor-lite';
import {
    PlusOutlined,
    LoadingOutlined,
  } from '@ant-design/icons';
import { getTokenFromLocalStorage, isEmptyObject } from '../../../helpers/common';

const NewListForm = ({name, onFinish, form, idEdit, loadingNewsThemes, newsThemesList}) => {
    const { Option } = Select;
    
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    
    const mdParser = new MarkdownIt(/* Markdown-it options */);

    const validateMessages = {
        required: 'Không được để trống !', 
        whitespace: 'Không để toàn khoảng trắng !',
        types: {
            string: '${label} không hợp lệ !',
        },
        string: {
            max: '${label} tối đa 255 ký tự !',
        },
    };
    const token = getTokenFromLocalStorage();

    useEffect(() => {
        if(idEdit) {
            const imageUrl = form.getFieldValue('image');
            setImageUrl(imageUrl)
            console.log(imageUrl);
        }
    }, [form, idEdit])

    const handleChange = info => {
        if (info.file.status === 'uploading') {
            setLoading(true);
          }
    };
    const propsUpload = {
        name: 'file',
        maxCount: 1,
        action: `${process.env.REACT_APP_API_URL}/news/create-url`,
        headers: {
            'Authorization': 'Bearer ' + token,
        },
        onSuccess: (result) => {
            console.log(result);
            if(result.success) {
                form.setFieldsValue({
                    image: result.data,
                })
                setImageUrl(result.data);
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
        onError: () => {
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
        <>
            <Form
                name={name}
                onFinish={onFinish}
                form={form}
                validateMessages={validateMessages}
                layout="vertical"
            >
                {   
                    idEdit &&
                    <Form.Item name="id" hidden={true}>
                        <Input/>
                    </Form.Item>
                }
                <Form.Item name="name" label="Tên tin tức" required rules={[{ required: true, whitespace: true }, { type: 'string', max: 255 }]}
                    style={{ width: '66%'}}>
                    <Input.TextArea placeholder="Nhập tin tức"/>
                </Form.Item>
                <Form.Item name="theme_id" label="Chủ đề" 
                    rules={[{ required: true }]}
                    style={{ width: '34%'}}>
                    <Select
                        showSearch
                        placeholder="Chọn chủ đề"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        allowClear
                        loading={loadingNewsThemes}
                        >
                        {
                            newsThemesList.map(newTheme => (
                                <Option key={newTheme.id} value={newTheme.id}>{newTheme.name}</Option>
                            ))
                        }
                    </Select>
                </Form.Item>
                <Form.Item name="content_summary" label="Nội dung tóm tắt" required rules={[{ required: true, whitespace: true }, { type: 'string'}]}
                    style={{ width: '80%'}}>
                    <Input.TextArea placeholder="Tóm tắt tin tức"/>
                </Form.Item>
                {
                    idEdit ?
                    <Form.Item name="new_img" required label="Ảnh tin tức" valuePropName="file" getValueFromEvent={normFile}
                        style={{ width: '20%'}} >
                        <Upload
                            {...propsUpload}
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            onChange={handleChange}
                        >
                            {imageUrl && imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover'  }} /> 
                                    : <div>
                                        {loading ? <LoadingOutlined /> : <PlusOutlined />}
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>}
                        </Upload>
                    </Form.Item>
                    :<Form.Item name="new_img" label="Ảnh tin tức" valuePropName="file" getValueFromEvent={normFile}
                    rules={[{ required: true }]} style={{ width: '20%'}} >
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
                    </Form.Item>
                }
                <Form.Item name="content_detail" label="Nội dung chi tiết" getValueFromEvent={normContent}
                    required rules={[{ required: true, whitespace: true }]} style={{ width: '100%'}}>
                    <MdEditor style={{ minHeight: '400px' }} 
                        renderHTML={text => mdParser.render(text)} 
                        view={{html: false}}
                        />
                </Form.Item>
                <Form.Item name="image" hidden={true}>
                    <Input/>
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" type="primary">Lưu lại</Button>
                </Form.Item>
            </Form>
        </>
    );
}
export default NewListForm;