import './App.css'
import { LanguageSwitcher} from '@my/ui'
import { useTranslation } from 'react-i18next';
import { Card, Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

function App() {
  const { t } = useTranslation();

    const onFinish = async (values: any) => {
  console.log(values); // ← ここで確認できる

  try {
    const res = await fetch(`${apiBaseUrl}/login/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.username,
        password: values.password,
      }),
    });

    const result = await res.json();

    if (result === true) {
      window.location.href = "/welcome.html"; // ← ここも修正
    } else {
      alert("ログイン失敗");
    }
  } catch (e) {
    console.error(e);
    alert("通信エラー");
  }
};

  return (
    <>
      <LanguageSwitcher />
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        width: "100vw",        // 横幅をブラウザ幅いっぱいに
        height: "100vh",       // 縦幅もブラウザ高さいっぱいに
        background: "#f0f2f5" 
      }}>
        <Card title={t("login")} style={{ width: 300 }}>
        <Form
          name="login_form"
          initialValues={{ remember: true }}
          onFinish={onFinish} 
        >
        <Form.Item
          name="username"
          rules={[{ required: true, message: t("userNoInputMessage") }]}
        >
          <Input 
            prefix={<UserOutlined />} 
            placeholder={t("username")} 
          />
        </Form.Item>
  
        <Form.Item
          name="password"
          rules={[{ required: true, message: t("passwordNoInputMessage") }]}
        >
          <Input.Password 
            prefix={<LockOutlined />} 
            placeholder={t("password")}
          />
        </Form.Item>
  
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>{t("rememberMe")}</Checkbox>
        </Form.Item>
  
        <Form.Item style={{ marginTop: 16 }}>
          <Button type="primary" htmlType="submit" block>
            {t("login")}
          </Button>
        </Form.Item>
      </Form>
    </Card>
      </div>
    </>
  )
}

export default App
