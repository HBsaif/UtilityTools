import React, { useState, useEffect } from 'react';

function TransformModal({ image, onTransform, onClose }) {
  const [rotation, setRotation] = useState(0);
  const [scaleX, setScaleX] = useState(1);
  const [scaleY, setScaleY] = useState(1);
  const [transformedImage, setTransformedImage] = useState(image);

  useEffect(() => {
    const img = new Image();
    img.src = image;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      const rad = (rotation * Math.PI) / 180;
      const absRad = Math.abs(rad);
      const sin = Math.sin(absRad);
      const cos = Math.cos(absRad);
      const newWidth = Math.abs(img.width * cos) + Math.abs(img.height * sin);
      const newHeight = Math.abs(img.width * sin) + Math.abs(img.height * cos);

      canvas.width = newWidth;
      canvas.height = newHeight;

      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(rad);
      ctx.scale(scaleX, scaleY);
      ctx.drawImage(img, -img.width / 2, -img.height / 2, img.width, img.height);
      ctx.restore();

      setTransformedImage(canvas.toDataURL('image/png'));
    };
  }, [image, rotation, scaleX, scaleY]);

  const handleRotate = (angle) => {
    setRotation((prevRotation) => prevRotation + angle);
  };

  const handleFlip = (direction) => {
    if (direction === 'horizontal') {
      setScaleX((prevScaleX) => prevScaleX * -1);
    } else {
      setScaleY((prevScaleY) => prevScaleY * -1);
    }
  };

  const handleApply = () => {
    onTransform(transformedImage);
  };

  return (
    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Transform Image</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="text-center mb-3">
              <img src={transformedImage} alt="Transformed" style={{ maxWidth: '100%' }} />
            </div>
            <div className="d-flex justify-content-center">
              <button className="btn btn-outline-primary me-2" onClick={() => handleRotate(-90)}>Rotate Left</button>
              <button className="btn btn-outline-primary me-2" onClick={() => handleRotate(90)}>Rotate Right</button>
              <button className="btn btn-outline-primary me-2" onClick={() => handleFlip('horizontal')}>Mirror</button>
              <button className="btn btn-outline-primary" onClick={() => handleFlip('vertical')}>Flip</button>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
            <button type="button" className="btn btn-primary" onClick={handleApply}>Apply Transform</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransformModal;
