import { Chessboard } from "react-chessboard";
import { useNavigate } from "react-router-dom";

export function MinChessboard({
  size = 400,
  fen = "",
  id = "",
  isHighLighted = false,
  isFull = false,
  viewOnly = true,
  setFen = () => {},
  onDrop = () => {},
}: {
  size?: number;
  fen?: string;
  id?: string;
  isHighLighted?: boolean;
  isFull?: boolean;
  viewOnly?: boolean;
  setFen?: (fen: string) => void;
  onDrop?: (from: string, to: string) => void;
}) {
  const navigate = useNavigate();
  return (
    <div
      className={`m-2 border border-gray-300 p-2 cursor-pointer hover:border-gray-500 ${isHighLighted ? "border-red-500" : ""}`}
      onClick={() => {
        if (!isFull) {
          navigate(`/game/${id}`);
        }
      }}
      style={{
        width: size + "px",
        height: size + "px",
      }}
    >
      <Chessboard id="basicboard" position={fen} onPieceDrop={onDrop} />
    </div>
  );
}
