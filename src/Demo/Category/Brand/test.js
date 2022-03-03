import { Input, Button, Form, Select, DatePicker, Checkbox, ConfigProvider , message, Upload, Skeleton, InputNumber } from 'antd';
import vi_VN from 'antd/lib/locale/vi_VN';
import locale_vi from 'antd/es/date-picker/locale/vi_VN';
import second from 'first'
import { useState } from 'react';
import {
    ArrowLeftOutlined,
    PlusOutlined,
    MinusCircleOutlined,
    UploadOutlined,
  } from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';
import { Editor } from '@tinymce/tinymce-react'; 
import { getLanguage, getTokenFromLocalStorage } from '../../../helpers/common';
import tournamentsListApi from '../../../api/Competition/tournamentsListApi';
import { useTranslate } from 'react-redux-multilingual';

const TournamentsListForm = ({name, onFinish, form, idEdit, loadingFees, feesList}) => {
    const { Option } = Select;
    const translate = useTranslate();
    const { RangePicker } = DatePicker;
    const token = getTokenFromLocalStorage();
    
    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);

    const validateMessages = {
        required: `${translate('Khong_duoc_de_trong')} !`, 
whitespace: `${translate('Khong_duoc_de_trong')} !`,
        types: {
            string: '${label}'+` ${translate('khong_hop_le')} !`,
            number: '${label}'+` ${translate('khong_hop_le')} !`,
        },
        string: {
            max: '${label}'+` ${translate('toi_da_255_ky_tu')} !`,
        },
    };

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    const handleUpload = () => {
        if(form.getFieldValue('files').every(item => item.file_title && item.file_upload.length>0)) {
            const formData = new FormData();
            fileList.fileList ? fileList.fileList.forEach(file => {
              formData.append('files', file);
            }) : fileList.forEach(file => {
                    formData.append('files', file);
                  }); 
            setUploading(true);
            axios({
                method: 'post',
                url: `${process.env.REACT_APP_API_URL}/resources/upload-files-in-tournaments`,
                headers: {
                        'Authorization': 'Bearer ' + token,
                },
                data: formData,
            }).then(function (response) {
                    const dataUrl = response.data.url;
                    const valueFiles = form.getFieldValue('files');
                    form.setFieldsValue({
                        files: valueFiles.map((item, index) => {
                            return {
                                ...item,
                                file_url: dataUrl[index].url,
                                file_url_json: dataUrl[index].urljson
                            }
                        })
                    });
                    setFileList([]);
                    setUploading(false);
                    message.success(translate('Tai_len_thanh_cong'));
                })
                .catch(function (error) {
                    console.log('error', error);
                    form.setFieldsValue({
                        files: []
                    });
                    setUploading(false);
                    message.error(translate('Tai_len_that_bai'));
                });
        } else message.error(translate('Hay_chon_tai_lieu_va_dien_day_du_tieu_de'))
    };

    const propsUpload = {
        name: 'files',
        onRemove: file => {
            setFileList(prevState => {
              const index = prevState.indexOf(file);
              const newFileList = prevState.slice();
              newFileList.splice(index, 1);
              return newFileList
            });
        },
        beforeUpload: file => {
            setFileList(prevState => 
                [...prevState, file]
            );
            return false;
        },
    
        fileList,
        maxCount: 1,
    };

    const normContent = (e) => {
        const valueEditor = e.target.getContent()
        return valueEditor;
      };

    return (
        <>
            <Form
                layout="vertical"
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
                <Form.Item name="name" label={translate('Giai_dau')} required rules={[{ required: true, whitespace: true }, { type: 'string', max: 255 }]}
                    style={{ width: '60%'}}>
                    <Input/>
                </Form.Item>
                <Form.Item name="is_active" label={translate('Kich_hoat')} style={{ width: '16%'}} valuePropName='checked'>
                    <Checkbox/>
                </Form.Item>
                <Form.Item name="is_comment" label={translate('Cho_phep_binh_luan')} style={{ width: '24%'}} valuePropName='checked'>
                    <Checkbox/>
                </Form.Item>
                <Form.Item name="address" label={translate('Dia_diem')} required rules={[{ required: true, whitespace: true }, { type: 'string', max: 255 }]}
                    style={{ width: '60%'}}>
                    <Input/>
                </Form.Item>
                <Form.Item name="date" label={translate('Thoi_gian')} required rules={[{ required: true }]}
                    style={{ width: '40%'}}>
                    { getLanguage() === 'vi' ?
                        <RangePicker 
                            locale={locale_vi}
                            format='DD/MM/YYYY'
                            disabledDate={(currentDate) => {
                                return currentDate && currentDate < moment().startOf('day'); 
                                //không được chọn ngày trước ngày hôm nay
                            }}/>
                        :<RangePicker 
                            format='DD/MM/YYYY'
                            disabledDate={(currentDate) => {
                                return currentDate && currentDate < moment().startOf('day'); 
                        }}/>
                    }
                </Form.Item>
                <Form.List name="fee_details">
                    {fields => (
                        <div style={{margin: '8px 0'}}>
                        {/* <p style={{margin: '0 0 6px 10px'}}>{translate('Quy_dinh_le_phi')} :</p> */}
                        <Form.List name="fee_main_1">
                            {
                                fields => (
                                    <>
                                    <span className='ant-form-item' style={{ lineHeight: '24px', minWidth: '178px', display: 'inline-block' }}><b className="start_red">* </b>{translate ('Le_phi_chinh_don')}:</span>
                                    <span className='ant-form-item' style={{ lineHeight: '24px'}}>{translate('Tu')}</span>
                                    <Form.Item name="formality_id" initialValue={1} hidden={true}><InputNumber/></Form.Item>
                                    {idEdit && <Form.Item name="id" hidden={true}><Input/></Form.Item>}
                                    <Form.Item
                                        style={{ width: '10%'}}
                                        name="start_content"
                                        required rules={[{ required: true },{ type: 'number', min: 1}]}>
                                        <InputNumber min={1}/>
                                    </Form.Item>
                                    <span className='ant-form-item' style={{ lineHeight: '24px'}}>{translate('den')}</span>
                                    <Form.Item
                                        style={{ width: '10%'}}
                                        name="end_content"
                                        required rules={[{ required: true },{ type: 'number', min: 1}]}>
                                        <InputNumber min={1}/>
                                    </Form.Item>
                                    <span className='ant-form-item' style={{lineHeight: '24px'}}>{translate('noi_dung')},</span>
                                    <span className='ant-form-item' style={{lineHeight: '24px'}}>{translate('Le_phi')}:</span>
                                    <Form.Item 
                                        name="fee_id" 
                                        rules={[{ required: true }]} style={{ width: '30%'}}>
                                        <Select
                                            showSearch
                                            placeholder={translate('Le_phi')}
                                            optionFilterProp="children"
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                            allowClear
                                            loading={loadingFees}
                                            >
                                            {
                                                feesList.filter(fee => fee.formality.id===1).map(fee => (
                                                    <Option key={fee.id} value={fee.id}>{fee.name}</Option>
                                                ))
                                            }
                                        </Select>
                                    </Form.Item>
                                    </>
                                )
                            }
                        </Form.List>
                        <Form.List name="fee_extra_1">
                            {
                                fields => (
                                    <>
                                    <span className='ant-form-item' style={{ lineHeight: '24px', minWidth: '178px', display: 'inline-block' }}><b className="start_red">* </b>{translate ('Le_phi_phu_don')}:</span>
                                    <span className='ant-form-item' style={{ lineHeight: '24px'}}>{translate('Tu')}</span>
                                    <Form.Item name="formality_id" initialValue={1} hidden={true}><InputNumber/></Form.Item>
                                    {idEdit && <Form.Item name="id" hidden={true}><Input/></Form.Item>}
                                    <Form.Item
                                        style={{ width: '10%'}}
                                        name="start_content"
                                        required rules={[{ required: true },{ type: 'number', min: 1}]}>
                                        <InputNumber min={1}/>
                                    </Form.Item>
                                    <span className='ant-form-item' style={{ lineHeight: '24px'}}>{translate('den')}</span>
                                    <Form.Item
                                        style={{ width: '10%'}}
                                        name="end_content"
                                        required rules={[{ required: true },{ type: 'number', min: 1}]}>
                                        <InputNumber min={1}/>
                                    </Form.Item>
                                    <span className='ant-form-item' style={{lineHeight: '24px'}}>{translate('noi_dung')},</span>
                                    <span className='ant-form-item' style={{lineHeight: '24px'}}>{translate('Le_phi')}:</span>
                                    <Form.Item name="fee_id" 
                                        rules={[{ required: true }]}
                                        style={{ width: '30%'}}>
                                        <Select
                                            showSearch
                                            placeholder={translate('Le_phi')}
                                            optionFilterProp="children"
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                            allowClear
                                            loading={loadingFees}
                                            >
                                            {
                                                feesList.filter(fee => fee.formality.id===1).map(fee => (
                                                    <Option key={fee.id} value={fee.id}>{fee.name}</Option>
                                                ))
                                            }
                                        </Select>
                                    </Form.Item>
                                    </>
                                )
                            }
                        </Form.List>
                        <Form.List name="fee_main_2">
                            {
                                fields => (
                                    <>
                                    <span className='ant-form-item' style={{ lineHeight: '24px', minWidth: '178px', display: 'inline-block' }}><b className="start_red">* </b>{translate ('Le_phi_chinh_doi')}:</span>
                                    <span className='ant-form-item' style={{ lineHeight: '24px'}}>{translate('Tu')}</span>
                                    <Form.Item name="formality_id" initialValue={2} hidden={true}><InputNumber/></Form.Item>
                                    {idEdit && <Form.Item name="id" hidden={true}><Input/></Form.Item>}
                                    <Form.Item
                                        style={{ width: '10%'}}
                                        name="start_content"
                                        required rules={[{ required: true },{ type: 'number', min: 1}]}>
                                        <InputNumber min={1}/>
                                    </Form.Item>
                                    <span className='ant-form-item' style={{ lineHeight: '24px'}}>{translate('den')}</span>
                                    <Form.Item
                                        style={{ width: '10%'}}
                                        name="end_content"
                                        required rules={[{ required: true },{ type: 'number', min: 1}]}>
                                        <InputNumber min={1}/>
                                    </Form.Item>
                                    <span className='ant-form-item' style={{lineHeight: '24px'}}>{translate('noi_dung')},</span>
                                    <span className='ant-form-item' style={{lineHeight: '24px'}}>{translate('Le_phi')}:</span>
                                    <Form.Item name="fee_id" 
                                        rules={[{ required: true }]}
                                        style={{ width: '30%'}}>
                                        <Select
                                            showSearch
                                            placeholder={translate('Le_phi')}
                                            optionFilterProp="children"
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                            allowClear
                                            loading={loadingFees}
                                            >
                                            {
                                                feesList.filter(fee => fee.formality.id===2).map(fee => (
                                                    <Option key={fee.id} value={fee.id}>{fee.name}</Option>
                                                ))
                                            }
                                        </Select>
                                    </Form.Item>
                                    </>
                                )
                            }
                        </Form.List>
                        <Form.List name="fee_extra_2">
                            {
                                fields => (
                                    <>
                                    <span className='ant-form-item' style={{ lineHeight: '24px', minWidth: '178px', display: 'inline-block' }}><b className="start_red">* </b>{translate ('Le_phi_phu_doi')}:</span>
                                    <span className='ant-form-item' style={{ lineHeight: '24px'}}>{translate('Tu')}</span>
                                    <Form.Item name="formality_id" initialValue={2} hidden={true}><InputNumber/></Form.Item>
                                    {idEdit && <Form.Item name="id" hidden={true}><Input/></Form.Item>}
                                    <Form.Item
                                        style={{ width: '10%'}}
                                        name="start_content"
                                        required rules={[{ required: true },{ type: 'number', min: 1}]}>
                                        <InputNumber min={1}/>
                                    </Form.Item>
                                    <span className='ant-form-item' style={{ lineHeight: '24px'}}>{translate('den')}</span>
                                    <Form.Item
                                        style={{ width: '10%'}}
                                        name="end_content"
                                        required rules={[{ required: true },{ type: 'number', min: 1}]}>
                                        <InputNumber min={1}/>
                                    </Form.Item>
                                    <span className='ant-form-item' style={{lineHeight: '24px'}}>{translate('noi_dung')},</span>
                                    <span className='ant-form-item' style={{lineHeight: '24px'}}>{translate('Le_phi')}:</span>
                                    <Form.Item name="fee_id" 
                                        rules={[{ required: true }]}
                                        style={{ width: '30%'}}>
                                        <Select
                                            showSearch
                                            placeholder={translate('Le_phi')}
                                            optionFilterProp="children"
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                            allowClear
                                            loading={loadingFees}
                                            >
                                            {
                                                feesList.filter(fee => fee.formality.id===2).map(fee => (
                                                    <Option key={fee.id} value={fee.id}>{fee.name}</Option>
                                                ))
                                            }
                                        </Select>
                                    </Form.Item>
                                    </>
                                )
                            }
                        </Form.List>
                        <Form.List name="fee_main_3">
                            {
                                fields => (
                                    <>
                                    <span className='ant-form-item' style={{ lineHeight: '24px', minWidth: '178px', display: 'inline-block' }}><b className="start_red">* </b>{translate ('Le_phi_chinh_dong_dien')}:</span>
                                    <span className='ant-form-item' style={{ lineHeight: '24px'}}>{translate('Tu')}</span>
                                    <Form.Item name="formality_id" initialValue={3} hidden={true}><InputNumber/></Form.Item>
                                    {idEdit && <Form.Item name="id" hidden={true}><Input/></Form.Item>}
                                    <Form.Item
                                        style={{ width: '10%'}}
                                        name="start_content"
                                        required rules={[{ required: true },{ type: 'number', min: 1}]}>
                                        <InputNumber min={1}/>
                                    </Form.Item>
                                    <span className='ant-form-item' style={{ lineHeight: '24px'}}>{translate('den')}</span>
                                    <Form.Item
                                        style={{ width: '10%'}}
                                        name="end_content"
                                        required rules={[{ required: true },{ type: 'number', min: 1}]}>
                                        <InputNumber min={1}/>
                                    </Form.Item>
                                    <span className='ant-form-item' style={{lineHeight: '24px'}}>{translate('noi_dung')},</span>
                                    <span className='ant-form-item' style={{lineHeight: '24px'}}>{translate('Le_phi')}:</span>
                                    <Form.Item name="fee_id" 
                                        rules={[{ required: true }]}
                                        style={{ width: '30%'}}>
                                        <Select
                                            showSearch
                                            placeholder={translate('Le_phi')}
                                            optionFilterProp="children"
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                            allowClear
                                            loading={loadingFees}
                                            >
                                            {
                                                feesList.filter(fee => fee.formality.id===3).map(fee => (
                                                    <Option key={fee.id} value={fee.id}>{fee.name}</Option>
                                                ))
                                            }
                                        </Select>
                                    </Form.Item>
                                    </>
                                )
                            }
                        </Form.List>
                        <Form.List name="fee_extra_3">
                            {
                                fields => (
                                    <>
                                    <span className='ant-form-item' style={{ lineHeight: '24px', minWidth: '178px', display: 'inline-block' }}><b className="start_red">* </b>{translate ('Le_phi_phu_dong_dien')}:</span>
                                    <span className='ant-form-item' style={{ lineHeight: '24px'}}>{translate('Tu')}</span>
                                    <Form.Item name="formality_id" initialValue={3} hidden={true}><InputNumber/></Form.Item>
                                    {idEdit && <Form.Item name="id" hidden={true}><Input/></Form.Item>}
                                    <Form.Item
                                        style={{ width: '10%'}}
                                        name="start_content"
                                        required rules={[{ required: true },{ type: 'number', min: 1}]}>
                                        <InputNumber min={1}/>
                                    </Form.Item>
                                    <span className='ant-form-item' style={{ lineHeight: '24px'}}>{translate('den')}</span>
                                    <Form.Item
                                        style={{ width: '10%'}}
                                        name="end_content"
                                        required rules={[{ required: true },{ type: 'number', min: 1}]}>
                                        <InputNumber min={1}/>
                                    </Form.Item>
                                    <span className='ant-form-item' style={{lineHeight: '24px'}}>{translate('noi_dung')},</span>
                                    <span className='ant-form-item' style={{lineHeight: '24px'}}>{translate('Le_phi')}:</span>
                                    <Form.Item name="fee_id" 
                                        rules={[{ required: true }]}
                                        style={{ width: '30%'}}>
                                        <Select
                                            showSearch
                                            placeholder={translate('Le_phi')}
                                            optionFilterProp="children"
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                            allowClear
                                            loading={loadingFees}
                                            >
                                            {
                                                feesList.filter(fee => fee.formality.id===3).map(fee => (
                                                    <Option key={fee.id} value={fee.id}>{fee.name}</Option>
                                                ))
                                            }
                                        </Select>
                                    </Form.Item>
                                    </>
                                )
                            }
                        </Form.List>
                        </div>
                    )}
                </Form.List>
                {/* <Form.Item name="currency_name" label={translate('Tien_te')}
                    style={{ width: '24%'}}>
                    <Select
                        showSearch
                        placeholder={translate('Tien_te')}
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        allowClear
                        >
                        {
                            currency.map((item) => (
                                <Option key={item.id} value={item.name}>{item.name}</Option>
                            ))
                        }
                    </Select>
                </Form.Item> */}
                {
                    idEdit &&
                    <Form.List name="files_edit">
                        {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, fieldKey, ...restField }) => (
                            <div key={key} className="files-list-upload" style={{display: 'flex'}}>
                                <Form.Item
                                    {...restField} style={{ width: '30%'}}
                                    name={[name, 'file_title']}
                                    fieldKey={[fieldKey, 'file_title']}
                                    >
                                    <Input/>
                                </Form.Item>
                                <Form.Item name={[name, 'file_url']}
                                    style={{width: '60%'}}
                                    fieldKey={[fieldKey, 'file_url']}>
                                    <Input disabled={true}/>
                                </Form.Item>
                                <Form.Item name={[name, 'file_url_json']}
                                    fieldKey={[fieldKey, 'file_url_json']} hidden={true}>
                                    <Input/>
                                </Form.Item>
                                <Form.Item style={{width: 'auto', textAlign: 'left'}}>
                                    <MinusCircleOutlined style={{height: '28px', display: 'flex', alignItems: 'center'}} onClick={() => remove(name)} />
                                </Form.Item>
                            </div>
                            ))}
                        </>
                        )}
                    </Form.List>
                }
                <Form.List name="files">
                    {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, fieldKey, ...restField }) => (
                        <div key={key} className="files-list-upload" style={{display: 'flex'}}>
                            {/* <Form.Item>
                                <span>Tài liệu {key+1}:</span>
                            </Form.Item> */}
                            <Form.Item
                                {...restField} style={{ width: '44%'}}
                                name={[name, 'file_title']}
                                fieldKey={[fieldKey, 'file_title']}
                                rules={[{ type: 'string', max: 255 }]}
                                >
                                <Input placeholder={translate('Tieu_de_tai_lieu')} />
                            </Form.Item>
                            <Form.Item
                                style={{ maxWidth: '70%'}}
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
                                {...restField}
                                name={[name, 'file_upload']}
                                fieldKey={[fieldKey, 'file_upload']}
                                >
                                <Upload {...propsUpload}>  
                                    <Button style={{ display: 'flex', alignItems: 'center', padding: '1px 8px'}} icon={<UploadOutlined />}>{translate('Chon_tai_lieu')}</Button>
                                </Upload>
                            </Form.Item>
                            <Form.Item style={{width: 'auto', textAlign: 'left'}}>
                                <MinusCircleOutlined style={{height: '28px', display: 'flex', alignItems: 'center'}} onClick={() => remove(name)} />
                            </Form.Item>
                            <Form.Item name={[name, 'file_url']}
                                fieldKey={[fieldKey, 'file_url']} hidden={true}>
                                <Input/>
                            </Form.Item>
                            <Form.Item name={[name, 'file_url_json']}
                                fieldKey={[fieldKey, 'file_url_json']} hidden={true}>
                                <Input/>
                            </Form.Item>
                        </div>
                        ))}
                        <Form.Item>
                            <Button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}} type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                {translate('Them_tai_lieu')}
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" onClick={handleUpload} 
                                disabled={fileList.length === 0} loading={uploading}>
                                {uploading ? translate('Dang_tai_len') : translate('Tai_len')}
                            </Button>
                        </Form.Item>
                    </>
                    )}
                </Form.List>
                <Form.Item name="content" label={translate('Noi_dung_chi_tiet')} getValueFromEvent={normContent}
                    style={{ width: '100%' }}>
                    <Editor
                          apiKey="9enpnae9wj4bx8ojcp34mb3379wrwntyb9mg07h47tzf92x3"
                          scriptLoading={{ async: true }}
                            init={{
                              selector: 'textarea#open-source-plugins',
                              plugins: 'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount textpattern noneditable help charmap quickbars emoticons',
                              menubar: 'file edit view insert format tools table help',
                              toolbar: 'outdent indent | bold italic underline | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | image | undo redo |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview | insertfile media link anchor codesample',
                              toolbar_sticky: true,
                              image_advtab: true,
                              importcss_append: true,
                              automatic_uploads: true,
                              images_upload_handler: async(blobInfo, success, failure) => {
                                const fileData = new FormData();
                                fileData.append('file', blobInfo.blob(), blobInfo.filename());
                                const res = await tournamentsListApi.upImgTour(fileData);
                                if(res.success) {
                                    message.success(translate('Tai_len_thanh_cong'));
                                    success(res.url)
                                } else {
                                    if(res.error.message === "File too large") {
                                        message.error(`${translate('Dung_luong_anh_khong_qua')} 5mb !`);
                                    } if(res.error.message === "Images Only!") {
                                        message.error(`${translate('Chi_tai_len_dinh_dang_anh')} .jpg, .png, .jpeg !`);
                                    } else {
                                        message.error(translate('Tai_len_that_bai'));
                                    }
                                }
                              },
                              height: 400,
                              image_caption: true,
                              quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
                              noneditable_noneditable_class: 'mceNonEditable',
                              toolbar_mode: 'sliding',
                              contextmenu: 'link image imagetools table',
                              fontsize_formats: '10px 11px 12px 13px 14px 15px 16px 17px 18px 19px 20px 21px 22px 23px 24px 25px 26px 27px 28px 29px 30px',
                              content_style: 'body { font-family:Arial,sans-serif; font-size:13px }',
                              setup: function (editor) {
                                  editor.on('change', function () {
                                      editor.save();
                                  });
                              }
                            }}
                          />
                </Form.Item>
                <Form.Item>
                    {
                        fileList.length>0 ?
                        <Button disabled={true} htmlType="submit" type="primary">{translate('Hay_tai_tai_lieu_len_truoc')}</Button>
                        :<Button htmlType="submit" type="primary">{translate('Luu_lai')}</Button>
                    }
                </Form.Item>
            </Form>
        </>
    );
}
export default React.memo(TournamentsListForm);
