import React from "react";
import { useNavigate } from "react-router-dom";

const Settings: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>設定ページ</h1>
      <p>ここで各種設定ができます。</p>

      <p>現在機能は未実装ですので、下記ボタンよりお戻りください</p>
      <button onClick={() => navigate("/calculate")}>戻る</button>
    </div>
  );
};

export default Settings;
