import type { FC } from 'react';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import styles from '../style.less';
import { Button, Result } from 'antd';

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
      title={done ? null : `SKU${current ? '编辑' : '添加'}`}
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
          <ProFormText
            name="name"
            label="SKU名称"
            rules={[{ required: true, message: '请输入SKU名称' }]}
            placeholder="请输入"
          />
          <ProFormText
            name="link"
            label="SKU链接"
            rules={[{ required: true, message: '请输入SKU链接' }]}
            placeholder="请输入"
          />
          <ProFormText
            name="suppName"
            label="供应商"
            rules={[{ required: true, message: '请输入供应商名称' }]}
            placeholder="请输入"
          />
          <ProFormText
            name="purPrice"
            label="采购价"
            rules={[{ required: true, message: '请输入采购价' }]}
            placeholder="请输入"
          />
        </>
      ) : (
        <Result
          status="success"
          title="操作成功"
          subTitle="添加SKU信息成功"
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
