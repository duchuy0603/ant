import React, { useCallback } from 'react'
import { ecommercegetAll, ecommerceAdd, ecommerceEdit, ecommerceDelete } from '../../../store/Category/ecommerce';
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Modal, Space, Table, Popconfirm, Tag, Input, Radio, Divider } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, SyncOutlined, EditOutlined, DeleteOutlined, PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import EcommerceForm from './EcommerceForm';
import './ecommerce.scss'
const Ecommerce = () => {
  const { ecommercelist, loadingecom } = useSelector(state => state.ecommerceReducer)
  const dispatch = useDispatch();
 
  useEffect(() => {
    dispatch(ecommercegetAll())
  }, [])
  const [searchText, setsearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [idEdit, setIdEdit] = useState(0)
  const [idProduct, setidProduct] = useState([]);
  
 
  const token = localStorage.getItem('token')
  //modal
  const [isModalAdd, setIsModalAdd] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [formAdd] = Form.useForm();
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
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {

    confirm();
    setsearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);

  };
  const handleReset = clearFilters => {
    clearFilters();
    setsearchText('')
  };
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows); 
      setidProduct(selectedRowKeys)
     
    }, 
  
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
      title: 'Image',

      dataIndex: 'image_url',
      key: 'image_url',
      width: '12%',

      render: text => <img src={`${process.env.REACT_APP_API_URL}/${text}`} style={{ width: "100%", height: "40%" }} alt="" />
    },

    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      width: '20%',
      sorter: (a, b) => a.phone - b.phone,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('phone'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '20%',
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      width: '20%',
      ...getColumnSearchProps('address'),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Description',
      dataIndex: 'des',
      key: 'des',
      width: '20%',
      ...getColumnSearchProps('des'),
    },
    {
      key: 'Action',
      title: <SyncOutlined onClick={() => dispatch(ecommercegetAll())} />,
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
    const dataNews = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      des: data.des,
      image_url: data.image,
    }
    
    formAdd.resetFields();
    dispatch(ecommerceAdd(dataNews, token))
    
    setIsModalAdd(false)
    
  }
  const handleEditForm = (record) => {
    const editform = {
      id: record.id,
      name: record.name,
      email: record.email,
      phone: record.phone,
      address: record.address,
      des: record.des,
      image: record.image_url 
    }
    console.log(editform)
    setIdEdit(record.id);
    formEdit.setFieldsValue(editform)
    setIsModalEdit(true)
  }
  const onFinishEdit = (data) => {
    const edit = {
      id: data.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      des: data.des,
      image_url: data.image,
    }
    dispatch(ecommerceEdit(edit))
    setIsModalEdit(false)
    console.log(edit)
  }
  const handleDelete = (id) => {
    dispatch(ecommerceDelete(id))
  }
  return (
    <div>
      <div className='addecommerce' >
        <Button className='hidden-ecommerce' type="primary" onClick={() =>

          setIsModalAdd(true)}>

            
          Thêm Sàn
        </Button>
        <Popconfirm
            placement="bottomRight"
            title={`Bạn muốn xóa ${idProduct.length} sàn ?`}
            onConfirm={() => dispatch(ecommerceDelete(idProduct))}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button type="danger"  disabled={!idProduct.length} >
            xóa sàn
          </Button>
          </Popconfirm>
        
      </div>
      <br />
      <Modal className='modal-add' title="Thêm Sàn" visible={isModalAdd} footer="" centered onCancel={() => setIsModalAdd(false)}>
        <EcommerceForm
          onFinish={onFinishAdd}
          form={formAdd} 
        />
        
      </Modal>

      <Modal className='modal-edit' title="Sửa Sàn" visible={isModalEdit} onCancel={() => setIsModalEdit(false)} centered footer="">
        <EcommerceForm
          onFinish={onFinishEdit}
          form={formEdit}
          idEdit={idEdit}
        />
      </Modal>
  
      <Divider />
      <Table
        scroll={{ x: 900 }}
        rowSelection={{
          ...rowSelection,
        }}
        pagination={{ defaultCurrent: 30, defaultPageSize: 10, hideOnSinglePage: true, pageSizeOptions: [10, 30, 50, 100] }}
        loading={loadingecom} columns={columns} dataSource={ecommercelist} rowKey={record => record.id} bordered />
    </div>
  )
}
export default Ecommerce;
