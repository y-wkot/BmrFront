import axios from "axios";
import React, { useState } from "react";

interface BmrRequest {
  gender: string;
  age: number;
  height: number;
  weight: number;
}

interface BmrResponse {
  bmr: number;
}

const BmrCalculator: React.FC = () => {
  const [gender, setGender] = useState<string>("man");
  const [age, setAge] = useState<number | "">("");
  const [height, setHeight] = useState<number | "">("");
  const [weight, setWeight] = useState<number | "">("");
  const [bmr, setBmr] = useState<number | null>(null);

  const calculateBmr = async () => {
    // 全部に値があるか確認させる
    if (age === "" || height === "" || weight === "") {
      console.error("All fields are required.");
      return;
    }

    const requestData: BmrRequest = {
      gender,
      age: Number(age),
      height: Number(height),
      weight: Number(weight),
    };

    try {
      const response = await axios.post<BmrResponse>(
        "http://localhost:8080/api/calculate",
        requestData
      );
      setBmr(response.data.bmr);
    } catch (error) {
      console.error("Error calculating BMR:", error);
    }
  };

  return (
    <div>
      <h1>あなたの基礎代謝を計算します</h1>
      <h2>基礎代謝とは、一日に必ず消費するカロリーです</h2>
      <div>
        <label>
          性別:
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="man">男</option>
            <option value="woman">女</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          年齢:
          <input
            type="number"
            value={age}
            placeholder="入力してください"
            onChange={
              (e) => setAge(e.target.value === "" ? "" : Number(e.target.value)) // 三項演算子で空欄なら空欄を設定、違えばvalueにNumberを代入
            }
          />
        </label>
      </div>
      <div>
        <label>
          身長 (cm):
          <input
            type="number"
            value={height}
            placeholder="入力してください"
            onChange={(e) =>
              setHeight(e.target.value === "" ? "" : Number(e.target.value))
            }
          />
        </label>
      </div>
      <div>
        <label>
          体重 (kg):
          <input
            type="number"
            value={weight}
            placeholder="入力してください"
            onChange={(e) =>
              setWeight(e.target.value === "" ? "" : Number(e.target.value))
            }
          />
        </label>
      </div>
      <button onClick={calculateBmr}>計算結果を表示</button>
      {bmr !== null && (
        <div>
          <h2>あなたの基礎代謝: {bmr.toFixed(2)} kcalです！</h2>
        </div>
      )}
    </div>
  );
};

export default BmrCalculator;
