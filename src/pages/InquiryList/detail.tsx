import {
  getById,
  handleAddInquiryItem,
  handleDeleteInquiryItem,
  handleBindRelation,
} from '@/services/ant-design-pro/inquiry';

import { useParams } from 'umi';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import {
  Button,
  Card,
  Descriptions,
  Divider,
  Dropdown,
  Menu,
  Table,
  Modal,
  Form,
  Radio,
  Input,
  Tag,
} from 'antd';
import OperationModal from './components/OperationModal';
import React, { useEffect, useState } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import moment from 'moment';

type InquiryItem = {
  id: string;
  name: string;
  link: string;
  tag?: string;
  goodsSn?: string;
};

const DetailPage: FC = () => {
  const [done, setDone] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [current, setCurrent] = useState<Partial<API.InquiryDetail> | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const tagEnumMap = {
    '0': { text: '', color: '' },
    '1': { text: 'RTS', color: 'green' },
    '2': { text: 'Similar', color: 'blue' },
    '3': { text: 'WFP', color: 'red' },
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleDone = () => {
    setDone(false);
    setVisible(false);
  };

  const handleSubmit = (values: InquiryItem) => {
    handleAddInquiryItem(values).then((x) => {
      console.log(x);
      setDone(true);
    });
  };

  const params = useParams();

  useEffect(() => {
    console.log(params);
    getById(params.name).then((x) => setCurrent(x));
  }, [done]);

  const MoreBtn: React.FC<{
    item: InquiryItem;
  }> = ({ item }) => {
    const handleClick = ({ _, key }) => {
      if (key == 'delete') {
        handleDeleteInquiryItem(item);
        setDone(true);
      } else if (key == 'edit') {
        alert('暂不支持。。。');
      }
    };

    return (
      <Dropdown
        overlay={
          <Menu onClick={handleClick}>
            <Menu.Item key="edit">编辑</Menu.Item>
            <Menu.Item key="delete">删除</Menu.Item>
          </Menu>
        }
      >
        <a>
          更多 <DownOutlined />
        </a>
      </Dropdown>
    );
  };

  const columns = [
    {
      title: '商品名称',
      dataIndex: 'goodsName',
    },
    {
      title: '商品链接',
      dataIndex: 'link',
    },
    {
      title: '关联供货SN',
      dataIndex: 'goodsSn',
    },
    {
      title: '关联标记',
      dataIndex: 'relationType',
      render(text, record) {
        if (text == 0) {
          return;
        }
        return (
          <Tag color={tagEnumMap[text].color} key={record.recId}>
            {tagEnumMap[text].text}
          </Tag>
        );
      },
    },
    {
      title: 'Actions',
      width: '150px',
      render(text, record) {
        return (
          <>
            <a
              key="edit"
              onClick={(e) => {
                e.preventDefault();
                console.log(record);
                form.setFieldsValue(record);
                showModal();
              }}
            >
              关联商品
            </a>
            <Divider type="vertical" />
            <MoreBtn key="more" item={record} />
          </>
        );
      },
    },
  ];

  const handleOk = () => {
    setDone(true);
    handleBindRelation(form.getFieldsValue()).then((x) => {
      console.log(x);
      setDone(false);
    });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <PageContainer>
        <Card bordered={false}>
          <Descriptions title={'单号：' + current?.enquiryOrderSn}>
            <Descriptions.Item label="客户信息">{current?.customerInfo}</Descriptions.Item>
            <Descriptions.Item label="创建时间">
              {moment(current?.gmtCreated * 1000).format('YYYY-MM-DD HH:mm:ss')}
            </Descriptions.Item>
          </Descriptions>
          <Divider style={{ marginBottom: 32 }} />

          <Table rowKey="recId" dataSource={current?.orderGoodsList} columns={columns} />
        </Card>
      </PageContainer>
      <Button
        type="dashed"
        onClick={() => {
          setVisible(true);
        }}
        style={{ width: '100%', marginBottom: 8 }}
      >
        <PlusOutlined />
        添加
      </Button>
      <OperationModal
        done={done}
        visible={visible}
        current={current}
        onDone={handleDone}
        onSubmit={handleSubmit}
      />
      <Modal title="关联商品" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical" requiredMark={true}>
          <Form.Item name="recId" style={{ display: 'none' }}>
            <Input hidden />
          </Form.Item>
          <Form.Item
            label="标记"
            name="relationType"
            required
            tooltip={{ title: '选择一种关联标记', icon: <InfoCircleOutlined /> }}
          >
            <Radio.Group>
              <Radio.Button value={1} defaultChecked={true}>
                RTS
              </Radio.Button>
              <Radio.Button value={2}>Similar</Radio.Button>
              <Radio.Button value={3}>WFP</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="商品SN" required name="goodsSn">
            <Input placeholder="填写商品库中的商品SN" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DetailPage;
