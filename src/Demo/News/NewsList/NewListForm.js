import React from 'react';
import { Input, Button, Form, Select } from 'antd';
import { newThemes } from '../../_components/otherData';


const NewListForm = ({name, onFinish, form, idEdit}) => {
    const { Option } = Select;

    const validateMessages = {
        required: 'Không được để trống !',
        types: {
            string: '${label} không hợp lệ !',
        },
        string: {
            max: '${label} tối đa 255 ký tự !',
        },
    };

    return (
        <>
            <Form
                name={name}
                onFinish={onFinish}
                form={form}
                validateMessages={validateMessages}
            >
                {   
                    idEdit &&
                    <Form.Item name="id" hidden={true}>
                        <Input/>
                    </Form.Item>
                }
                <Form.Item name="name" label="Tên tin tức" required rules={[{ required: true }, { type: 'string', max: 255 }]}
                    style={{ width: '66%'}}>
                    <Input.TextArea placeholder="Nhập tin tức"/>
                </Form.Item>
                <Form.Item name="theme" label="Chủ đề" 
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
                        // loading={loadingCategoryDance}
                        >
                        {
                            newThemes.map(newTheme => (
                                <Option key={newTheme.id} value={newTheme.id}>{newTheme.name}</Option>
                            ))
                        }
                    </Select>
                </Form.Item>
                <Form.Item name="content_summary" label="Nội dung tóm tắt" required rules={[{ required: true }, { type: 'string'}]}
                    style={{ width: '100%'}}>
                    <Input.TextArea placeholder="Tóm tắt tin tức"/>
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" type="primary">Lưu lại</Button>
                </Form.Item>
            </Form>
        </>
    );
}
export default React.memo(NewListForm);