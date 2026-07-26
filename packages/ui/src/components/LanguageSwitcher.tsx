import { useTranslation } from 'react-i18next';
import {Button, Space} from 'antd';

export function LanguageSwitcher() {
    const { i18n } = useTranslation();
    return (
        <div style={{float: 'right', margin: '16px'}}>
            <Space>
                <Button onClick={() => i18n.changeLanguage('jp')}>日本語</Button>
                <Button onClick={() => i18n.changeLanguage('en')}>English</Button>
                <Button onClick={() => i18n.changeLanguage('cn')}>简体中文</Button>
            </Space>
        </div>
    )
}