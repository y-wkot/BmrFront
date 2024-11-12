import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // サイドバーの開閉状態を切り替える関数 toggle
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
      <div className="toggle-button" onClick={toggleSidebar}>
        {isOpen ? (
          "メニューを隠す"
        ) : (
          <span className="vertical-text">メニューを開く</span>
        )}
      </div>
      {/* <h2>メニュー</h2> */}
      <ul className="list-items">
        <li>
          <Link to="/">トップへ戻る</Link>
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
