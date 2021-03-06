import { DeleteOutlined, EditOutlined, SyncOutlined, SearchOutlined, AppstoreAddOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Space, Table, Popconfirm } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import Highlighter from 'react-highlight-words';
import FilterDropdown from '../../_components/FilterDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { newThemes } from '../../_components/otherData';

const NewThemesComponent = () => {
    const [searchText, setSearchText] = useState('');      //table
    const [searchedColumn, setSearchedColumn] = useState('');

    const [addModalShow, setAddModalShow] = useState(false);    //modal
    const [editModalShow, setEditModalShow] = useState(false); 
    
    const [formAdd] = Form.useForm();    //form
    const [formEdit] = Form.useForm();

    // const {loadingCategoryDance, categoryDanceList} = useSelector(state => state.categoryDanceReducer);  //data
    const dispatch = useDispatch();

    useEffect(() => {
    //   dispatch(getAllCategoryDance())
    }, [dispatch])

    //Table
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <FilterDropdown dataIndex={dataIndex} setSelectedKeys={setSelectedKeys}
            selectedKeys={selectedKeys} confirm={confirm} clearFilters={clearFilters}
            handleSearch={handleSearch} handleReset={handleReset}
          />
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : '#555555' }} />,
        onFilter: (value, record) => 
          record[dataIndex]
            ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
            : '',
        render: (text, record, index) => {
          if(searchedColumn === dataIndex && searchText) {
            return <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                  />
          } else {
            return text
          }
        },
    });
    
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    
    const handleReset = clearFilters => {
        clearFilters();
        setSearchText('');
    };

    const columns = [
        {
          key: 'name',
          title: 'T??n Ch??? ?????',
          dataIndex: 'name',
          ...getColumnSearchProps('name'),
        },
        {
          key: 'action',
          align: "center",
        //   title: <SyncOutlined onClick={() => dispatch(getAllCategoryDance())}/>,
          title: <SyncOutlined/>,
          width: '10%',
          render: (text, record, index) => (
            <Space size="middle">
              <EditOutlined onClick={() => handleEditForm(record)}/>
              <Popconfirm
                placement="topRight"
                title={`B???n mu???n x??a ${record.name} ?`}
                onConfirm={() => handleDelete(record.id)}
                okText="X??a"
                cancelText="H???y"
              >
                <DeleteOutlined/>
              </Popconfirm>
            </Space>
          ),
        },
    ];

    const validateMessages = {
      required: 'Kh??ng ???????c ????? tr???ng !',
      types: {
          string: '${label} kh??ng h???p l??? !',
      },
      string: {
          max: '${label} t???i ??a 255 k?? t??? !',
      },
    };
    //End Table
  
    //Data
    const onFinishAdd = useCallback((values) => {
      const newData = {
        name: values.name,
      };
    //   dispatch(createCategoryDance(newData));
      setAddModalShow(false);
      formAdd.resetFields();
    }, [formAdd, dispatch]);

    const handleEditForm = useCallback((record) => {
      const editFormValue = {
        id: record.id,                                          // l?? ch??a x??? l??
        name: record.name,
      }
      formEdit.setFieldsValue(editFormValue);
      setEditModalShow(true);
    }, [formEdit]);

    const onFinishEdit = useCallback((values) => {
      const dataEdited = {
        id: values.id,
        name: values.name,
      }
    //   dispatch(editCategoryDance(dataEdited));
      setEditModalShow(false);
    }, [dispatch]);

    const handleDelete = useCallback((id) => {
    //   dispatch(deleteCategoryDance(id));
    }, [dispatch]);
    //End Data
    
    return (
        <div className="table-cus-component new-theme-component">
            <div className="add-modal">
              <Button type="primary" onClick={() => setAddModalShow(true)}>
                <AppstoreAddOutlined /> Th??m ch??? ?????
              </Button>

              <Modal
                wrapClassName="modal-cus modal-new-theme"
                title="Th??m ch??? ?????"
                centered
                footer={null}
                onCancel={() => setAddModalShow(false)}
                visible={addModalShow}
              >
                <Form
                  name="new-theme-form-add"
                //   onFinish={onFinishAdd}
                  form={formAdd}
                  validateMessages={validateMessages}
                >
                    <Form.Item name="name" label="Ch??? ?????" style={{width: '100%'}}
                        required rules={[{ required: true }, { type: 'string', max: 255 }]}
                       >
                        <Input placeholder="V?? d???: Tin t???c"/>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" type="primary">L??u l???i</Button>
                    </Form.Item>
                </Form>
              </Modal>

              <Modal
                wrapClassName="modal-cus modal-new-theme"
                title="S???a ch??? ?????"
                centered
                footer={null}
                onCancel={() => setEditModalShow(false)}
                visible={editModalShow}
              >
                <Form
                  name="new-theme-form-edit"
                //   onFinish={onFinishEdit}
                  form={formEdit}
                  validateMessages={validateMessages}
                >
                    <Form.Item name="id" hidden={true}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="name" label="Ch??? ?????"  style={{width: '100%'}}
                        required rules={[{ required: true }, { type: 'string', max: 255 }]}
                       >
                        <Input placeholder="V?? d???: Tin t???c"/>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" type="primary">L??u l???i</Button>
                    </Form.Item>
                </Form>
              </Modal>

            </div>
            <div className="table-data">
              {/* <Table scroll={{ x: 600 }} loading={loadingCategoryDance} rowKey={record => record.id} columns={columns} dataSource={categoryDanceList} bordered/> */}
              <Table scroll={{ x: 600 }} rowKey={record => record.id} columns={columns} dataSource={newThemes} bordered/>
            </div>
        </div>
    );
}
export default React.memo(NewThemesComponent);