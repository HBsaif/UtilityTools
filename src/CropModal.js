import React, { useState, useRef } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

function CropModal({ image, onCrop, onClose }) {
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState(null);
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const imageRef = useRef(null);

  const aspectRatios = {
    '1:1': 1,
    '4:3': 4 / 3,
    '16:9': 16 / 9,
    'freeform': null,
  };

  function onImageLoad(e) {
    const { width, height } = e.currentTarget;
    const newCrop = centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 90,
        },
        aspectRatios[aspectRatio],
        width,
        height
      ),
      width,
      height
    );
    setCrop(newCrop);
  }

  const handleCrop = () => {
    if (!completedCrop || !imageRef.current) {
      return;
    }

    const img = imageRef.current;
    const canvas = document.createElement('canvas');
    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;
    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      img,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height
    );

    onCrop(canvas.toDataURL('image/png'));
  };

  const handleAspectRatioChange = (e) => {
    const newAspectRatio = e.target.value;
    setAspectRatio(newAspectRatio);
    if (imageRef.current) {
      const { width, height } = imageRef.current;
      const newCrop = centerCrop(
        makeAspectCrop(
          {
            unit: '%',
            width: 90,
          },
          aspectRatios[newAspectRatio],
          width,
          height
        ),
        width,
        height
      );
      setCrop(newCrop);
    }
  };

  return (
    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Crop Image</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="aspectRatioSelect" className="form-label">Aspect Ratio</label>
              <select id="aspectRatioSelect" className="form-select" value={aspectRatio} onChange={handleAspectRatioChange}>
                <option value="1:1">1:1</option>
                <option value="4:3">4:3</option>
                <option value="16:9">16:9</option>
                <option value="freeform">Freeform</option>
              </select>
            </div>
            <ReactCrop crop={crop} onChange={(c) => setCrop(c)} onComplete={(c) => setCompletedCrop(c)} aspect={aspectRatios[aspectRatio]}>
              <img ref={imageRef} src={image} alt="Crop" style={{ maxWidth: '100%' }} onLoad={onImageLoad} />
            </ReactCrop>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
            <button type="button" className="btn btn-primary" onClick={handleCrop}>Apply Crop</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CropModal;
