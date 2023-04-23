import type { FC } from 'react';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import styles from '../style.less';
import { Button, Result, Form, Input } from 'antd';

type OperationModalProps = {
  done: boolean;
  visible: boolean;
  current: Partial<API.InquiryItem> | undefined;
  onDone: () => void;
  onSubmit: (values: API.InquiryItem) => void;
};

const OperationModal: FC<OperationModalProps> = (props) => {
  const { done, visible, current, onDone, onSubmit, children } = props;
  if (!visible) {
    return null;
  }
  return (
    <ModalForm<API.InquiryItem>
      visible={visible}
      title={done ? null : `商品${current ? '编辑' : '添加'}`}
      className={styles.standardListForm}
      width={640}
      onFinish={async (values) => {
        onSubmit(values);
      }}
      initialValues={current}
      submitter={{
        render: (_, dom) => (done ? null : dom),
      }}
      trigger={<>{children}</>}
      modalProps={{
        onCancel: () => onDone(),
        destroyOnClose: true,
        bodyStyle: done ? { padding: '72px 0' } : {},
      }}
    >
      {!done ? (
        <>
          <ProFormText name="enquiryOrderId" label="订单号" disabled={true} />
          <ProFormText
            name="goodsName"
            label="商品名称"
            rules={[{ required: true, message: '请输入商品名称' }]}
            placeholder="请输入"
          />
          <ProFormText
            name="link"
            label="商品链接"
            rules={[{ required: true, message: '请输入商品链接' }]}
            placeholder="请输入"
          />
          <ProFormTextArea
            name="subDescription"
            label="备注"
            rules={[{ message: '请输入至少五个字符的产品描述！', min: 5 }]}
            placeholder="请输入至少五个字符"
          />
        </>
      ) : (
        <Result
          status="success"
          title="操作成功"
          subTitle="添加商品信息成功"
          extra={
            <Button type="primary" onClick={onDone}>
              知道了
            </Button>
          }
          className={styles.formResult}
        />
      )}
    </ModalForm>
  );
};

export default OperationModal;
