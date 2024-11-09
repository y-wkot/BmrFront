import axios from "axios";
import React, { useState } from "react";

interface BmrRequest {
  gender: string;
  age: number;
  height: number;
  weight: number;
  exerciseIntensity: number;
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
  const [exerciseIntensity, setExerciseIntensity] = useState<number | "">("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const calculateBmr = async () => {
    // 全部に値があるか確認させる
    if (
      age === "" ||
      height === "" ||
      weight === "" ||
      exerciseIntensity === ""
    ) {
      console.error("All fields are required.");
      return;
    }

    const requestData: BmrRequest = {
      gender,
      age: Number(age),
      height: Number(height),
      weight: Number(weight),
      exerciseIntensity: Number(exerciseIntensity),
    };

    setLoading(true); // 計算中
    setError(false); // エラーをリセット

    try {
      const response = await axios.post<BmrResponse>(
        "https://bmrdocker.onrender.com/api/calculate",
        requestData
      );
      setBmr(response.data.bmr); // 結果を設定
    } catch (error) {
      console.error("BMR計算エラー:", error);
      setError(true); // 通信エラーの場合
    } finally {
      setLoading(false); // 計算終了
    }
  };

  return (
    <div className="container">
      <h1>☆試作品☆</h1>
      <h2>あなたの基礎代謝を計算します</h2>
      <h3>基礎代謝とは、一日に必ず消費するカロリーです！</h3>
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
      <div>
        <label>
          運動強度（倍率）:
          <input
            type="number"
            value={exerciseIntensity}
            placeholder="入力してください"
            onChange={(e) =>
              setExerciseIntensity(
                e.target.value === "" ? "" : Number(e.target.value)
              )
            }
          />
          <div>運動強度は、一覧表から近しい数値を入力してください</div>
          <img src="/images/kakeritu.jpg" alt="かけりつ一覧表"></img>
        </label>
      </div>
      <button onClick={calculateBmr} disabled={loading}>
        {loading ? "計算中…" : "計算結果を表示"}
      </button>
      {loading && <p>計算中…</p>}
      {error && (
        <p style={{ color: "red" }}>
          通信エラーが発生しました。再試行してください。
        </p>
      )}
      {bmr !== null && !error && (
        <div>
          <h2>あなたの基礎代謝: {bmr.toFixed(2)} kcalです！</h2>
          <h3>
            ☆一日に摂取した栄養素の合計値がこれを下回っていれば体重は減少していくことになります☆
          </h3>
        </div>
      )}
    </div>
  );
};

export default BmrCalculator;
