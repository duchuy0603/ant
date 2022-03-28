import React, { useCallback } from 'react'
import { productAdd,productEdit,productDelete,productgetAll } from './src/store/Category/product';
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Modal, Space, Table, Popconfirm, Tag, Input,Select } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, SyncOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import './product.scss'
import ProductForm from './src/Demo/Category/Product/productForm';


const Product = () => {
  const { productlist, loadingproduct } = useSelector(state => state.productReducer)
  console.log(productlist)

  
  const { Option } = Select;
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(productgetAll())
  }, [dispatch,idEdit])
  
  const [searchText, setsearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  //modal
  const [isModalAdd, setIsModalAdd] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [idEdit, setIdEdit] = useState(0)
  const [formAdd] = Form.useForm();    //form
  const [formEdit] = Form.useForm();
  const checkImage=(img)=>{
    if(img===null){
      return 
    }else
    return process.env.REACT_APP_API_URL+img[0].url
  }
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
      if(searchedColumn === dataIndex  ){
     
        return <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[searchText]}
        autoEscape
        textToHighlight={text ? text.toString() : ''}
      />
      }  else{
        if(dataIndex==="store"){
          return text?.name
        }
        if(dataIndex==="category"){
          return text?.name
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
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Image',
      dataIndex: 'image_url',
      key: 'image_url',
      width:'20%',
      render: text =>{
 
      return(  <img src={checkImage(text)}  style={{width:"100%",height:"100%"}} alt=""/>
      )
      }
    },
   
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: '20%',
      sorter: (a, b) => a.price - b.price,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('price'),
    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
      width: '20%',
      ...getColumnSearchProps('content'),
    },
    {
      title: 'Description',
      dataIndex: 'des',
      key: 'des',
      width: '20%',
      ...getColumnSearchProps('des'),
    },
      {
      title: 'Category',
      dataIndex:'category',
      key: 'category',
      width: '20%',
      sorter: (a, b) => a.category - b.category,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('category'),
    },
    {
      title: 'Store',
      dataIndex: 'store',
      key: 'store',
      width: '20%',
      sorter: (a, b) => a.store - b.store,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('store'),
    },
    {
      title: 'ParentId',
      dataIndex: 'parent_id',
      key: 'parent_id',
      width: '20%',
      sorter: (a, b) => a.parent_id - b.parent_id,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('parent_id'),
    },
    {
      key: 'Action',
      title: <SyncOutlined onClick={() => dispatch(productgetAll())} />,
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
  price:data.price,
  des:data.des,
  content:data.content,
  store_id:data.store_id,
  category_id:data.category_id,
  parent_id:data.parent_id,
  image_url:data.image
}

    dispatch(productAdd(add))
    formAdd.resetFields()
    setIsModalAdd(false)
    

  //   const newdata = {
  //     Name: data.name,
  //     Email: data.email,
  //     Phone: data.phone,
  //     Address: data.address,
  //     Description: data.description,
  //     // ImageUrl:data.files[0]

  //   }
  //   console.log(data)
  //   dispatch(ecommerceAdd(newdata))
   
  //   setIsModalAdd(false)
  //   formAdd.resetFields()
   }

  const handleEditForm = (record) => {
    const editform = {
      id:record.id,
      name:record.name,
      price:record.price,
      des:record.des,
      content:record.content,
      store_id:record.store.id,
      category_id:record.category.id,
      parent_id:record.parent_id,
      image:record.image_url 
      
    
    }
    formEdit.setFieldsValue(editform)
    setIsModalEdit(true)

  }
  const onFinishEdit = (data) => {
    const edit={
      id:data.id,
      name:data.name,
      price:data.price,
      des:data.des,
      store_id:data.store_id,
      category_id:data.category_id,
      parent_id:data.parent_id,
      image_url:data.image
    }
    dispatch(productEdit(edit))
    setIsModalEdit(false)
    formAdd.resetFields()
  
  }
  const handleDelete = (id) => {
    dispatch(productDelete(id))
  }
  return (
    <div>
      <div className='addecommerce' >
        <Button type="primary" onClick={() => setIsModalAdd(true)}>
          Thêm Product
        </Button>
      </div>
      <br />
      <Modal className='modal-add' title="Thêm Product" visible={isModalAdd} footer="" centered onCancel={() => setIsModalAdd(false)}>
        <ProductForm
          onFinish={onFinishAdd}
          form={formAdd} />
      </Modal>

      <Modal className='modal-edit' title="Sửa Product" visible={isModalEdit} onCancel={() => setIsModalEdit(false)} centered footer="">
        <ProductForm
          onFinish={onFinishEdit}
          form={formEdit}
          idEdit={true}
          
        />
      </Modal>

      <Table scroll={{ x: 900 }} 
       pagination= {{defaultCurrent:30,defaultPageSize:10,hideOnSinglePage:true,pageSizeOptions:[10,30,50,100]}}
      loading={loadingproduct} columns={columns} dataSource={productlist} rowKey={record => record.id} bordered />

    </div>
  )
}

export default Product;
