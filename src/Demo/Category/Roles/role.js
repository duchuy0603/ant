import React, { useCallback } from 'react'
import { roleAdd, roleEdit, roleDelete, rolegetAll } from '../../../store/Category/roles';
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Modal, Space, Table, Popconfirm, Tag, Input } from 'antd';
import Highlighter from 'react-highlight-words';
import { Pagination } from 'antd';
import { SearchOutlined, SyncOutlined, EditOutlined, DeleteOutlined, PlusOutlined,LoadingOutlined } from '@ant-design/icons';
import RoleForm from './rolesForm';
import './roles.scss'

const Roles = () => {

  
  const { rolelist, loadingrole } = useSelector(state => state.roleReducer)
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(rolegetAll())
  }, [dispatch])
  console.log(rolelist);
  
  const [searchText, setsearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
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


    render: text =>{
      if(searchedColumn === dataIndex ){
        return    <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[searchText]}
        autoEscape
        textToHighlight={text ? text.toString() : ''}
      />
      }else{
      if(dataIndex==="ecommerce"){
        return text?.name
      }
      return text
      }
    }
      
   
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

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      ...getColumnSearchProps('name'),
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
      title: <SyncOutlined onClick={() => dispatch(rolegetAll())} />,
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
  const onFinishAdd = (value) => {
  
    const dataAdd ={
      name: value.name,
      des: value.des,
      ecommerce_id:value.ecommerce_id
    }
    dispatch(roleAdd(dataAdd))
   
    setIsModalAdd(false)
    formAdd.resetFields()
   }

   const handleEditForm = (record) => {
    const editform = {    
      id:record.id,
       name:record.name,
      des:record.des,
      ecommerce_id:record.ecommerce.id
      
    }
    
    formEdit.setFieldsValue(editform)
    setIsModalEdit(true)
  }

  const onFinishEdit = (value) => {
    const dataEdit ={
    id:value.id,
      name: value.name,
      des: value.des,
      ecommerce_id:value.ecommerce_id
    }
   
    dispatch(roleEdit(dataEdit))
    setIsModalEdit(false)
    
    console.log(dataEdit)
 
  }
  const handleDelete = (id) => {
    dispatch(roleDelete(id))
  }
  return (
    <div>
      <div className='addecommerce' >
        <Button type="primary" onClick={() => 
         
          setIsModalAdd(true)}>
          Thêm quyền
        </Button>
      </div>
      <br />
      <Modal className='modal-add' title="Thêm Quyền" visible={isModalAdd} footer="" centered onCancel={() => setIsModalAdd(false)}>
        <RoleForm
          onFinish={onFinishAdd}
          form={formAdd} />
      </Modal>

      <Modal className='modal-edit' title="Sửa Quyền" visible={isModalEdit} onCancel={() => setIsModalEdit(false)} centered footer="">
        <RoleForm
          onFinish={onFinishEdit}
          form={formEdit}
          idEdit={true}
          id={handleEditForm}
       
        />
      </Modal>

      <Table scroll={{ x: 900 }} 
      loading={loadingrole}
       columns={columns} 
       dataSource={rolelist}
        rowKey={record => record.id} 
        pagination= {{defaultCurrent:30,defaultPageSize:10,hideOnSinglePage:true,pageSizeOptions:[10,30,50,100]}}
        bordered />

    </div>
  )
}

export default Roles;
