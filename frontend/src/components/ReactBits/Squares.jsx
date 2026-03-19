import { useRef, useEffect, useState } from "react";
import "./Squares.css";

const Squares = ({
  direction = "right",
  speed = 1,
  borderColor = "#999",
  squareSize = 40,
  hoverFillColor = "#222",
}) => {
  const canvasRef = useRef(null);
  const requestRef = useRef();
  const numSquaresX = useRef();
  const numSquaresY = useRef();
  const gridOffset = useRef({ x: 0, y: 0 });
  const [hoveredSquare, setHoveredSquare] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      numSquaresX.current = Math.ceil(canvas.width / squareSize) + 1;
      numSquaresY.current = Math.ceil(canvas.height / squareSize) + 1;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;

      ctx.lineWidth = 0.5;
      ctx.strokeStyle = borderColor;

      for (let x = startX; x < canvas.width + squareSize; x += squareSize) {
        for (let y = startY; y < canvas.height + squareSize; y += squareSize) {
          const squareX = x - (gridOffset.current.x % squareSize);
          const squareY = y - (gridOffset.current.y % squareSize);

          if (
            hoveredSquare &&
            Math.floor(squareX / squareSize) === hoveredSquare.x &&
            Math.floor(squareY / squareSize) === hoveredSquare.y
          ) {
            ctx.fillStyle = hoverFillColor;
            ctx.fillRect(squareX, squareY, squareSize, squareSize);
          }

          ctx.strokeRect(squareX, squareY, squareSize, squareSize);
        }
      }

      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.sqrt(Math.pow(canvas.width, 2) + Math.pow(canvas.height, 2)) / 2
      );
      gradient.addColorStop(0, "rgba(255, 255, 255, 0)");
      gradient.addColorStop(1, "var(--bg-deep)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const updateOffset = () => {
      if (direction === "right") gridOffset.current.x -= speed;
      else if (direction === "left") gridOffset.current.x += speed;
      else if (direction === "up") gridOffset.current.y += speed;
      else if (direction === "down") gridOffset.current.y -= speed;
      else if (direction === "diagonal") {
        gridOffset.current.x -= speed;
        gridOffset.current.y -= speed;
      }

      drawGrid();
      requestRef.current = requestAnimationFrame(updateOffset);
    };

    requestRef.current = requestAnimationFrame(updateOffset);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(requestRef.current);
    };
  }, [direction, speed, borderColor, squareSize, hoverFillColor, hoveredSquare]);

  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / squareSize);
    const y = Math.floor((e.clientY - rect.top) / squareSize);
    setHoveredSquare({ x, y });
  };

  const handleMouseLeave = () => {
    setHoveredSquare(null);
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="squares-canvas"
    />
  );
};

export default Squares;
