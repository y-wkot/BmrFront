import axios from "axios"; // HTTPリクエスト用axiosライブラリ
import React, { useEffect, useState } from "react"; // useState、useEffect
import "./BmrCalculator.css";

// 計算リクエストの型定義
interface BmrRequest {
  gender: string;
  age: number;
  height: number;
  weight: number;
  exerciseIntensity: number;
}

// レスポンスの型定義
interface BmrResponse {
  bmr: number; // kcalなので数値
}

// 計算用Reactコンポーネント
const BmrCalculator: React.FC = () => {
  const [gender, setGender] = useState<string>("man");
  const [age, setAge] = useState<number | "">("");
  const [height, setHeight] = useState<number | "">("");
  const [weight, setWeight] = useState<number | "">("");
  const [bmr, setBmr] = useState<number | null>(null);
  const [exerciseIntensity, setExerciseIntensity] = useState<number | "">("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  // アクセス数を保持するステート
  const [accessCount, setAccessCount] = useState<number>(0);

  // useEffectを使ってページが読み込まれるたびにアクセス数を取得
  useEffect(() => {
    const fetchAccessCount = async () => {
      try {
        const response = await axios.get<number>(
          `${import.meta.env.VITE_API_BASE_URL}/access-count`
        );
        setAccessCount(response.data); // 取得したアクセス数をstateに設定
      } catch (error) {
        console.error("アクセス数の取得に失敗しました", error);
      }
    };
    fetchAccessCount();
  }, []);

  // 計算の関数
  const calculateBmr = async () => {
    // 全部に値があるか確認させる
    if (
      age === "" ||
      height === "" ||
      weight === "" ||
      exerciseIntensity === ""
    ) {
      console.error("All fields are required.");
      return; // 未入力で処理を中断させる
    }

    const requestData: BmrRequest = {
      gender,
      age: Number(age),
      height: Number(height),
      weight: Number(weight),
      exerciseIntensity: Number(exerciseIntensity),
    };
    setLoading(true); // ロード中をtrue
    setError(false); // エラーをリセット

    try {
      // サーバーにPOSTリクエストの送信
      const response = await axios.post<BmrResponse>(
        `${import.meta.env.VITE_API_BASE_URL}/calculate`, // APIのURL(ローカル・Renderどちらでもいいようにしている)
        requestData // データ送信
      );
      setBmr(response.data.bmr); // 結果を設定
    } catch (error) {
      console.error("BMR計算エラー:", error);
      setError(true); // 通信エラーの場合
    } finally {
      setLoading(false); // 計算終了、ロード状態をfalseに
    }
  };

  // コンポーネントのレンダリング
  return (
    <div className="container calculator-page">
      <header>
        <h1>☆理想の身体を目指しましょう☆</h1>
        <h2>あなたの基礎代謝を計算します</h2>
        <h3>基礎代謝とは、一日に必ず消費するカロリーです！</h3>
      </header>
      <main>
        <div className="form-group">
          <label>
            性別:
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="man">男</option>
              <option value="woman">女</option>
            </select>
          </label>
        </div>

        {/* 各項目の入力フィールド */}
        <InputField label="年齢" value={age} setValue={setAge} />
        <InputField label="身長 (cm)" value={height} setValue={setHeight} />
        <InputField label="体重 (kg)" value={weight} setValue={setWeight} />
        <InputField
          label="運動強度（倍率）"
          value={exerciseIntensity}
          setValue={setExerciseIntensity}
          helper="運動強度は、一覧表から近しい数値を入力してください" // 補助メッセージ
        />

        <img
          src="/images/kakeritu.jpg"
          alt="かけりつ一覧表"
          className="exercise-intensity-chart"
        />

        <button onClick={calculateBmr} disabled={loading}>
          {loading ? "計算中…" : "計算結果を表示"}
        </button>

        {/* 結果表示エリア */}
        {loading && <p>計算中…</p>}
        {error && (
          <p style={{ color: "red" }}>
            通信エラーが発生しました。再試行してください。
          </p>
        )}
        {bmr !== null && !error && (
          <section className="result">
            <h2>あなたの基礎代謝: {bmr.toFixed(2)} kcalです！</h2>{" "}
            {/*小数点二桁*/}
            <h3>
              ☆一日に摂取した栄養素の合計値がこれを下回っていれば体重は減少していくことになります☆
            </h3>
            <p>
              ※ハリスベネディクト方程式という100年程前から存在する計算式を使用していますが、
              <br />
              運動強度が考慮されていませんので、大まかな倍率を掛けるようにしています。
            </p>
          </section>
        )}
      </main>
      <footer>
        <p>
          累計アクセス数: <span id="access-count">{accessCount}</span>
        </p>
      </footer>
    </div>
  );
};

// 各入力フィールドのコンポーネント
const InputField = ({
  label,
  value,
  setValue,
  helper,
}: {
  label: string;
  value: number | ""; // 空文字対策
  setValue: React.Dispatch<React.SetStateAction<number | "">>; // 値更新の関数
  helper?: string; // helperプロパティが指定されているときにsmall要素が表示。?を付けるとエラーが出なくなる(オプショナル)
}) => (
  <div className="form-group">
    <label>
      {label}:
      <input
        type="number"
        value={value}
        placeholder="入力してください"
        onChange={(e) =>
          setValue(e.target.value === "" ? "" : Number(e.target.value))
        }
      />
    </label>
    {helper && <small>{helper}</small>}
  </div>
);

export default BmrCalculator;
