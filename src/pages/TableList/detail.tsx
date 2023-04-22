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
    params.goodsId == 'Key-product'
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
          name: 'SN19802',
          contact: '这是一个商品名称',
          createdAt: '客户B QQ：456321',
          items: [
            {
              skuId: 2,
              skuName: '这是sku的名称',
              suppSkuId: '供应商sku的id',
              link: 'https://www.brayou.co/products/tank-with-built-in-bra-50-off-limited-time-only',
              suppName: '义乌小商品供应商',
              purPrice: '27.89',
              color: '红色',
              size: '均码',
              length: '2',
              width: '3',
              height: '5',
              weight: '0.35',
              volumeWeight: '0.35',
              id: '2',
            },
            {
              skuId: 3,
              skuName: '这是sku的名称',
              suppSkuId: '供应商sku的id',
              link: 'https://www.brayou.co/products/tank-with-built-in-bra-50-off-limited-time-only',
              suppName: '义乌百货供应商',
              purPrice: '23.29',
              color: '白色',
              size: '均码',
              length: '2',
              width: '3',
              height: '5',
              weight: '0.35',
              volumeWeight: '0.35',
              id: '3',
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
        操作 <DownOutlined />
      </a>
    </Dropdown>
  );

  const columns = [
    {
      title: 'SKU ID',
      dataIndex: 'skuId',
    },
    {
      title: 'SKU名称',
      dataIndex: 'skuName',
    },
    {
      title: '供方SKU ID',
      dataIndex: 'suppSkuId',
    },
    {
      title: '商品链接',
      dataIndex: 'link',
    },
    {
      title: '供应商名称',
      dataIndex: 'suppName',
    },
    {
      title: '采购价(元)',
      dataIndex: 'purPrice',
    },
    {
      title: '颜色',
      dataIndex: 'color',
    },
    {
      title: '尺码',
      dataIndex: 'size',
    },
    {
      title: '长(cm)',
      dataIndex: 'length',
    },
    {
      title: '宽(cm)',
      dataIndex: 'width',
    },
    {
      title: '高(cm)',
      dataIndex: 'height',
    },
    {
      title: '重量(kg)',
      dataIndex: 'weight',
    },
    {
      title: '体积重(kg)',
      dataIndex: 'volumeWeight',
    },
    {
      title: 'Actions',
      width: '150px',
      render(text, record) {
        return (
          <>
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
          <Descriptions title={'商品SN：' + inqueryDetail.name}>
            <Descriptions.Item label="商品名称">{inqueryDetail.contact}</Descriptions.Item>
            <Descriptions.Item label="备注信息">{inqueryDetail.createdAt}</Descriptions.Item>
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
    </div>
  );
};

export default DetailPage;
