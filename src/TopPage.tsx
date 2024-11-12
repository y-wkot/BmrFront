import React from "react";
import { useNavigate } from "react-router-dom";
import "./TopPage.css";

const TopPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="top-page">
      <h1>
        基礎代謝計算・体重管理サイトへようこそ。現在ゲストモードのみの利用が可能です。
      </h1>
      <h2>ゲストモードにてご利用ください</h2>
      <button onClick={() => navigate("/")}>ログインする ※未実装です※</button>
      <br />
      <button onClick={() => navigate("/calculate")}>ゲストモードで利用</button>
    </div>
  );
};

export default TopPage;
