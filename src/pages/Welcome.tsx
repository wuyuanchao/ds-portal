import { PageContainer } from '@ant-design/pro-components';
import { Alert, Card, Typography } from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'umi';
import styles from './Welcome.less';

const CodePreview: React.FC = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

const Welcome: React.FC = () => {
  const intl = useIntl();

  return (
    <PageContainer>
      <Card>
        <Alert
          message={intl.formatMessage({
            id: 'pages.welcome.hello',
            defaultMessage: 'Hello! 欢迎使用',
          })}
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 24,
          }}
        />
        <Typography.Text strong>
          <FormattedMessage
            id="pages.hello.welcome"
            defaultMessage="注意这个是一个演示工程，请不要提交敏感数据！"
          />
        </Typography.Text>
        任何问题，欢迎到github进行讨论：
        <CodePreview>https://github.com/wuyuanchao/dropshopping.git</CodePreview>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
