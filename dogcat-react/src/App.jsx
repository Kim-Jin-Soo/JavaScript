import { useState, useRef, useEffect } from "react";
import * as tmImage from "@teachablemachine/image";
import "./App.css";

const MODEL_URL = import.meta.env.BASE_URL + "dogcat-model/";

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [predictions, setPredictions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const webcamContainerRef = useRef(null);
  const modelRef = useRef(null);
  const webcamRef = useRef(null);
  const animationRef = useRef(null);

  const init = async () => {
    setIsLoading(true);

    try {
      const modelURL = MODEL_URL + "model.json";
      const metadataURL = MODEL_URL + "metadata.json";

      // 1) 모델 로드
      modelRef.current = await tmImage.load(modelURL, metadataURL);

      // 2) 웹캠 설정 (너비, 높이, flip)
      const width = 300;
      const height = 300;
      const flip = true; // 거울처럼 보이게 (셀카 카메라 느낌)
      webcamRef.current = new tmImage.Webcam(width, height, flip);

      // 카메라 권한 요청 + 스트림 시작
      await webcamRef.current.setup();
      await webcamRef.current.play();

      // 3) DOM에 웹캠 캔버스 추가
      if (webcamContainerRef.current) {
        webcamContainerRef.current.innerHTML = ""; // 기존 캔버스 제거(중복 방지)
        webcamContainerRef.current.appendChild(webcamRef.current.canvas);
      }

      // 4) 초기 상태 셋업
      setIsStarted(true);
      setIsLoading(false);

      // 5) 루프 시작
      loop();
    } catch (error) {
      console.error("초기화 오류:", error);
      setIsLoading(false);
    }
  };

  const loop = () => {
    if (webcamRef.current) {
      webcamRef.current.update();
      predict();
    }
    animationRef.current = window.requestAnimationFrame(loop);
  };

  const predict = async () => {
    if (modelRef.current && webcamRef.current) {
      const prediction = await modelRef.current.predict(
        webcamRef.current.canvas
      );
      setPredictions(prediction);
    }
  };

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        window.cancelAnimationFrame(animationRef.current);
      }
      if (webcamRef.current) {
        webcamRef.current.stop();
      }
    };
  }, []);

  return (
    <div className="app">
      <h1>Teachable Machine Image Model</h1>

      {!isStarted && (
        <button onClick={init} disabled={isLoading}>
          {isLoading ? "로딩 중..." : "Start"}
        </button>
      )}

      <div ref={webcamContainerRef} className="webcam-container" />

      <div className="label-container">
        {predictions.map((pred, index) => (
          <div key={index} className="prediction">
            {pred.className}: {(pred.probability * 100).toFixed(1)}%
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
