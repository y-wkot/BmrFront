import React from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <div
      style={{
        width: "200px",
        height: "100vh",
        backgroundColor: "skyblue",
        padding: "10px",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      <h2>メニュー</h2>
      <ul>
        <li>
          <Link to="/">ホーム ※トップページに戻る</Link>
        </li>
        <li>
          <Link to="/calculate">基礎代謝計算ページ</Link>
        </li>
        <li>
          <Link to="/settings">設定 ※未実装</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
