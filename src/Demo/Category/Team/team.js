import React, { useCallback } from 'react'
import { teamAdd, teamEdit, teamDelete, teamgetAll } from '../../../store/Category/team';
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import reactRouterDom, { useHistory } from 'react-router-dom';
import { Button, Form, Modal, Space, Table, Popconfirm, Tag, Input } from 'antd';
import Highlighter from 'react-highlight-words';
import { Pagination } from 'antd';
import { SearchOutlined, SyncOutlined, EditOutlined, DeleteOutlined, PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import TeamForm from './teamForm';
import './team.scss'

const Team = () => {
  // const { register,reset ,handleSubmit, setValue,formState:{errors}, } = useForm();

  const { teamlist, loadingteam } = useSelector(state => state.teamReducer)

  console.log(teamlist)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(teamgetAll())
  }, [dispatch])

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
          if( searchedColumn === dataIndex ){
            return     <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
          }else{
            if(dataIndex==='ecommerce'){
              return text?.Name
            }
            return text;
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
      dataIndex: 'Name',
      key: 'Name',
      width: '20%',
      ...getColumnSearchProps('Name'),
    },
    {
      title: 'Image',

      dataIndex: 'ImageUrl',
      key: 'Image',
      width: '10%',

      render: text => <img src={`${process.env.REACT_APP_API_URL}/${text}`} style={{ width: "100%", height: "40%" }} alt="" />
    },

    {
      title: 'Phone',
      dataIndex: 'Phone',
      key: 'Phone',
      width: '20%',
      sorter: (a, b) => a.Phone - b.Phone,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('Phone'),
    },
    {
      title: 'Email',
      dataIndex: 'Email',
      key: 'Email',
      width: '20%',
      ...getColumnSearchProps('Email'),
    },
    {
      title: 'Owner',
      dataIndex: 'Owner',
      key: 'Owner',
      width: '20%',
      ...getColumnSearchProps('Owner'),
      sorter: (a, b) => a.Owner.length - b.Owner.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'EcommerceId',
      dataIndex: 'ecommerce',
      key: 'ecommerce',
      width: '20%',
      ...getColumnSearchProps('ecommerce'),
    },
    {
      title: 'Description',
      dataIndex: 'Description',
      key: 'Description',
      width: '20%',
      ...getColumnSearchProps('Description'),
    },
    // {
    //   title: 'EcomerceId',
    //   dataIndex: 'EcomerceId',
    //   key: 'EcomerceId',
    //   width: '20%',
    //   ...getColumnSearchProps('EcomerceId'),
    // },
    {
      title: 'Status',
      dataIndex: 'Status',
      key: 'Status',
      width: '20%',
      ...getColumnSearchProps('Status'),
    },

    {
      key: 'Action',
      title: <SyncOutlined onClick={() => dispatch(teamgetAll())} />,
      align: 'center',
      width: '10%',
      render: (text, record, index) => (
        <Space size="middle">
          <EditOutlined style={{ color: "blue" }} onClick={() => handleEditForm(record)} />
          <Popconfirm
            placement="bottomRight"
            title={`Bạn muốn xóa ${record.Name} ?`}
            onConfirm={() => handleDelete(record.Id)}
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
    const add = {
      Name: data.name,
      Email: data.email,
      Phone: data.phone,
      Status: data.status,
      Description: data.description,
      image: data.image,
      Status:data.status,
      EcommerceId:data.ecommerceId
    }
    console.log(data.files);
    console.log(data)
    dispatch(teamAdd(add))
    setIsModalAdd(false)
    formAdd.resetFields();
  }
  const handleEditForm = (record) => {
    const editform = {
      id: record.Id,
      name: record.Name,
      email: record.Email,
      phone: record.Phone,
      status: record.Status,
      description: record.Description,
      image:`${process.env.REACT_APP_API_URL}/${record.ImageUrl} `  
    }
    formEdit.setFieldsValue(editform)
    setIsModalEdit(true)
  }
  const onFinishEdit = (data) => {
    const edit = {
      Id:data.id,
      Name: data.name,
      Email: data.email,
      Phone: data.phone,
      Status: data.status,
      Description: data.description,
      image: data.image,
    }
    dispatch(teamEdit(edit))
    setIsModalEdit(false)
    console.log(edit)
  }
  const handleDelete = (id) => {
    dispatch(teamDelete(id))
  }
  return (
    <div>
      <div className='addecommerce' >
        <Button type="primary" onClick={() =>
          setIsModalAdd(true)}>
          Thêm Team
        </Button>
      </div>
      <br />
      <Modal className='modal-add' title="Thêm Sàn" visible={isModalAdd} footer="" centered onCancel={() => setIsModalAdd(false)}>
        <TeamForm
          onFinish={onFinishAdd}
          form={formAdd} />
      </Modal>

      <Modal className='modal-edit' title="Sửa Sàn" visible={isModalEdit} onCancel={() => setIsModalEdit(false)} centered footer="">
        <TeamForm
          onFinish={onFinishEdit}
          form={formEdit}
          idEdit={true}
        />
      </Modal>

      <Table scroll={{ x: 900 }} 
      loading={loadingteam} 
      columns={columns}
       dataSource={teamlist}
       rowKey={record => record.id} bordered 
       pagination= {{defaultCurrent:30,defaultPageSize:10,hideOnSinglePage:true,pageSizeOptions:[10,30,50,100]}}
       />
     
    </div>
  )
}

export default Team;
