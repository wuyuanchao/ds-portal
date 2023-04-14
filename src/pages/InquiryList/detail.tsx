import { useParams } from 'umi';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import {
  FooterToolbar,
  ModalForm,
  PageContainer,
  ProDescriptions,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import {
  Button,
  List,
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
import styles from './style.less';
import OperationModal from './components/OperationModal';
import React, { useState } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';

type InquiryItem = {
  id: string;
  name: string;
  link: string;
  tag?: string;
  goodsSn?: string;
};

const ListContent = ({ data: { name, link, tag, goodsSn } }: { data: InquiryItem }) => (
  <div className={styles.listContent}>
    <div className={styles.listContentItem}>
      <p>{name}</p>
    </div>
    <div className={styles.listContentItem}>
      <p>{link}</p>
    </div>
    <div className={styles.listContentItem}>{tag}</div>
  </div>
);

const DetailPage: FC = () => {
  const [done, setDone] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [current, setCurrent] = useState<Partial<InquiryItem> | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requiredMark, setRequiredMarkType] = useState('RTS');
  const [form] = Form.useForm();
  const tagColorMap = { RTS: 'green', Similar: 'blue', WFP: 'red' };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const showEditModal = (item: InquiryItem) => {
    setVisible(true);
    setCurrent(item);
  };

  const handleDone = () => {
    setDone(false);
    setVisible(false);
    setCurrent({});
  };

  const handleSubmit = (values: InquiryItem) => {
    setDone(true);
    const method = values?.id ? 'update' : 'add';
    //postRun(method, values);
  };

  const params = useParams();
  console.log(params);

  const inqueryDetail: API.InquiryDetail =
    params.name == 'Key-product'
      ? {
          id: '1',
          name: 'Key-product',
          contact: '客户A 联系电话：13867623527',
          createdAt: '2023-04-03',
          items: [
            {
              id: '1',
              name: 'E5401-Suction Cup Whetstone',
              link: 'https://www.clickpickme.co/products/suction-cup-whetstone-1',
              goodsSn: 'YISH723S',
              tag: 'RTS',
            },
          ],
        }
      : {
          id: '2',
          name: 'Precheck',
          contact: '客户B QQ：456321',
          createdAt: '2023-04-01',
          items: [
            {
              id: '2',
              name: 'Tank With Built-In Bra',
              link: 'https://www.brayou.co/products/tank-with-built-in-bra-50-off-limited-time-only',
            },
            {
              id: '3',
              name: "Men's Ethnic Style Linen Long-Sleeved T-Shirt",
              link: 'https://www.koolmate.co/products/men-s-ethnic-style-linen-long-sleeved-t-shirt-50-off-limited-time-only',
            },
          ],
        };
  console.log(inqueryDetail);

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    pageSize: 5,
    total: inqueryDetail.items.length,
  };

  const MoreBtn: React.FC<{
    item: InquiryItem;
  }> = ({ item }) => (
    <Dropdown
      overlay={
        <Menu>
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

  const columns = [
    {
      title: '商品名称',
      dataIndex: 'name',
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
      dataIndex: 'tag',
      render(text, record) {
        return (
          <Tag color={tagColorMap[text]} key={record.id}>
            {text}
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
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <PageContainer>
        <Card bordered={false}>
          <Descriptions title={'单号：' + inqueryDetail.name}>
            <Descriptions.Item label="客户信息">{inqueryDetail.contact}</Descriptions.Item>
            <Descriptions.Item label="创建时间">{inqueryDetail.createdAt}</Descriptions.Item>
          </Descriptions>
          <Divider style={{ marginBottom: 32 }} />

          <Table rowKey="id" dataSource={inqueryDetail.items} columns={columns} />
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
        <Form
          form={form}
          layout="vertical"
          initialValues={{ requiredMarkValue: requiredMark }}
          onValuesChange={({ requiredMarkValue }) => {
            setRequiredMarkType(requiredMarkValue);
          }}
          requiredMark={true}
        >
          <Form.Item
            label="标记"
            name="requiredMarkValue"
            required
            tooltip={{ title: '选择一种关联标记', icon: <InfoCircleOutlined /> }}
          >
            <Radio.Group>
              <Radio.Button value="RTS">RTS</Radio.Button>
              <Radio.Button value="Similar">Similar</Radio.Button>
              <Radio.Button value="WFP">WFP</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="商品SN" required={requiredMark != 'WFP'}>
            <Input placeholder="填写商品库中的商品SN" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DetailPage;
