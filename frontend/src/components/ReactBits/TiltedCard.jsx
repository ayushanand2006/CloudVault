import { useRef, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import "./TiltedCard.css";

const TiltedCard = ({
  imageSrc,
  altText = "Tilted card",
  captionText = "",
  containerHeight = "300px",
  containerWidth = "100%",
  imageHeight = "100%",
  imageWidth = "100%",
  scaleOnHover = 1.1,
  rotateAmplitude = 15,
  showMobileWarning = true,
  showTooltip = true,
  displayOverlayContent = false,
  overlayContent = null,
  children
}) => {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const [{ rotateX, rotateY, scale }, api] = useSpring(() => ({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    config: { mass: 5, tension: 350, friction: 40 },
  }));

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateXValue = ((y - centerY) / centerY) * -rotateAmplitude;
    const rotateYValue = ((x - centerX) / centerX) * rotateAmplitude;

    api.start({
      rotateX: rotateXValue,
      rotateY: rotateYValue,
      scale: scaleOnHover,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    api.start({
      rotateX: 0,
      rotateY: 0,
      scale: 1,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div
      ref={containerRef}
      className="tilted-card-container"
      style={{
        height: containerHeight,
        width: containerWidth,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <animated.div
        className="tilted-card-inner"
        style={{
          transform: "perspective(1000px)",
          rotateX,
          rotateY,
          scale,
          width: imageWidth,
          height: imageHeight,
        }}
      >
        {children ? children : (
            <img
            src={imageSrc}
            alt={altText}
            className="tilted-card-image"
            />
        )}

        {displayOverlayContent && overlayContent && (
          <div className="tilted-card-overlay">
            {overlayContent}
          </div>
        )}
      </animated.div>

      {showTooltip && captionText && isHovered && (
        <div className="tilted-card-caption">
          {captionText}
        </div>
      )}
    </div>
  );
};

export default TiltedCard;
