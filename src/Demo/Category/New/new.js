import React, { useCallback } from 'react'
import { newAdd, newEdit, newgetAll, newDelete } from '../../../store/Category/new';
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Form, Modal, Space, Table, Popconfirm, Tag, Input } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, SyncOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import './new.scss'
import NewForm from './newForm';
import { getUserFromLocalStorage } from '../../../helpers/common';

const Brand = () => {
  const { newlist, loadingnew } = useSelector(state => state.newReducer)
  const datauser=getUserFromLocalStorage();
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(newgetAll())
  }, [dispatch])
  
  const [searchText, setsearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  //modal
  const [isModalAdd, setIsModalAdd] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [idEdit,setIdEdit]=useState(0)
  const [formAdd] = Form.useForm();    //form
  const [formEdit] = Form.useForm();
  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 12 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',


        render: text =>{
          if( searchedColumn === dataIndex ){
            return     <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
          }else{
            if(dataIndex==='ecommerce'){
              return text?.name
            }
            return text;
          }
        }
  });
const checkImage=(img)=>{
if(img===null ){
return
}else{
  return process.env.REACT_APP_API_URL + img[0].url
}
}
  const handleSearch = (selectedKeys, confirm, dataIndex) => {

    confirm();
    setsearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);

  };
  const handleReset = clearFilters => {
    clearFilters();
    setsearchText('')
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      ...getColumnSearchProps('name'),
    },
    {
        title: 'Content',
        dataIndex: 'content',
        key: 'content',
        width: '20%',
        ...getColumnSearchProps('content'),
      },
    {
      title: 'Image',
      // dataIndex: <img src="ImageUrl" alt=""/>,
      dataIndex: 'image_url',
      key: 'image_url',
      width:'5%',
      render: text =>  <img src={checkImage(text) }  style={{width:"100%",height:"100%"}} alt=""/>
        
    },



    {
      title: 'Description',
      dataIndex: 'des',
      key: 'des',
      width: '20%',
      ...getColumnSearchProps('des'),
    },
{
  
    title: 'EcommerceId',
    dataIndex: 'ecommerce',
    key: 'ecommerce',
    width: '20%',
    sorter: (a, b) => a.ecommerce - b.ecommerce,
      sortDirections: ['descend', 'ascend'],
    ...getColumnSearchProps('ecommerce'),
  
},
    {
      key: 'Action',
      title: <SyncOutlined onClick={() => dispatch(newgetAll())} />,
      align: 'center',
      width: '10%',
      render: (text, record, index) => (
        <Space size="middle">
          <EditOutlined style={{ color: "blue" }} onClick={() => handleEditForm(record)} />
          <Popconfirm
            placement="bottomRight"
            title={`Bạn muốn xóa ${record.name} ?`}
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <DeleteOutlined style={{ color: "red" }} />
          </Popconfirm>
        </Space>
      ),

    },
  ];
  // actionform
  const onFinishAdd = (data) => {
const add={
  name:data.name,
content:data.content,
  des:data.description,
  ecommerce_id: data.ecommerceId,
  image_url:data.image
}
    dispatch(newAdd(add))
    setIsModalAdd(false)
    formAdd.resetFields()
    console.log(add)
  
   }

  const handleEditForm = useCallback((record) => {
    const editform = {
      id: record.id,
      name: record.name,
      content:record.content,
      description: record.des,
      ecommerceId: record.ecommerce?.id,
      image:record.image_url
    }
    formEdit.setFieldsValue(editform)
    setIdEdit(record.id);
    setIsModalEdit(true)

  }, [formEdit])
  const onFinishEdit = (data) => {
    const edit={
      id:data.id,
      name:data.name,
      content:data.content,
  des:data.description,
  ecommerce_id: data.ecommerceId,
  image_url:data.image
    }
    dispatch(newEdit(edit))
    setIsModalEdit(false)
    formAdd.resetFields()
    console.log(edit)
  }
  const handleDelete = (id) => {
    dispatch(newDelete(id))
  }
  return (
    <div>
      <div className='addecommerce' >
        <Button type="primary" onClick={() => setIsModalAdd(true)}>
          Thêm New
        </Button>
      </div>
      <br />
      <Modal className='modal-add' title="Thêm New" visible={isModalAdd} footer="" centered onCancel={() => setIsModalAdd(false)}>
        <NewForm
          onFinish={onFinishAdd}
          form={formAdd} />
      </Modal>

      <Modal className='modal-edit' title="Sửa New" visible={isModalEdit} onCancel={() => setIsModalEdit(false)} centered footer="">
        <NewForm
          onFinish={onFinishEdit}
          form={formEdit}
          idEdit={idEdit}
        />
      </Modal>

      <Table scroll={{ x: 900 }} 
       pagination= {{defaultCurrent:30,defaultPageSize:10,hideOnSinglePage:true,pageSizeOptions:[10,30,50,100]}}
      loading={loadingnew} columns={columns} dataSource={newlist} rowKey={record => record.id} bordered />

    </div>
  )
}

export default Brand;
