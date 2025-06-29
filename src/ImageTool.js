import React, { useState } from 'react';
import CropModal from './CropModal';
import TransformModal from './TransformModal';

function ImageTool() {
  const [image, setImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [resizeOption, setResizeOption] = useState('size');
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(300);
  const [percentage, setPercentage] = useState(50);
  const [socialMediaPlatform, setSocialMediaPlatform] = useState('instagramPost');
  const [lockAspectRatio, setLockAspectRatio] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [exportFormat, setExportFormat] = useState('png');
  const [targetFileSize, setTargetFileSize] = useState(null);
  const [showCropModal, setShowCropModal] = useState(false);
  const [showTransformModal, setShowTransformModal] = useState(false);

  const socialMediaPresets = {
    instagramPost: { width: 1080, height: 1080 },
    facebookProfile: { width: 170, height: 170 },
    twitterHeader: { width: 1500, height: 500 },
    linkedInCover: { width: 1128, height: 191 },
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
        setProcessedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const applyResize = () => {
    if (!processedImage) return;

    const img = new Image();
    img.src = processedImage;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      let targetWidth = img.width;
      let targetHeight = img.height;

      switch (resizeOption) {
        case 'size':
          targetWidth = width;
          targetHeight = height;
          break;
        case 'percentage':
          targetWidth = img.width * (percentage / 100);
          targetHeight = img.height * (percentage / 100);
          break;
        case 'socialMedia':
          const preset = socialMediaPresets[socialMediaPlatform];
          targetWidth = preset.width;
          targetHeight = preset.height;
          break;
        default:
          break;
      }

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      if (lockAspectRatio) {
        const aspectRatio = img.width / img.height;
        let drawWidth = canvas.width;
        let drawHeight = canvas.height;

        if (canvas.width / canvas.height > aspectRatio) {
          drawWidth = canvas.height * aspectRatio;
        } else {
          drawHeight = canvas.width / aspectRatio;
        }
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, (canvas.width - drawWidth) / 2, (canvas.height - drawHeight) / 2, drawWidth, drawHeight);
      } else {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }

      let quality = 1.0;
      let dataUrl = canvas.toDataURL(`image/${exportFormat}`, quality);

      if (targetFileSize && (exportFormat === 'jpeg' || exportFormat === 'webp')) {
        const targetSizeInBytes = targetFileSize * 1024;
        while (dataUrl.length > targetSizeInBytes && quality > 0.1) {
          quality -= 0.1;
          dataUrl = canvas.toDataURL(`image/${exportFormat}`, quality);
        }
      }

      setProcessedImage(dataUrl);
    };
  };

  const downloadImage = () => {
    if (processedImage) {
      const link = document.createElement('a');
      link.href = processedImage;
      link.download = `processed_image.${exportFormat}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleCrop = (croppedImage) => {
    setProcessedImage(croppedImage);
    setShowCropModal(false);
  };

  const handleTransform = (transformedImage) => {
    setProcessedImage(transformedImage);
    setShowTransformModal(false);
  };

  return (
    <div className="card tool-container">
      <div className="card-body">
        <h5 className="card-title">Image Tool</h5>
        <div className="mb-3">
          <label htmlFor="imageUpload" className="form-label">Upload Image</label>
          <input type="file" className="form-control" id="imageUpload" accept="image/*" onChange={handleImageUpload} />
        </div>

        {image && (
          <div className="mt-3 text-center">
            <h6>Processed Image:</h6>
            <img src={processedImage} alt="Processed" style={{ border: '1px solid #ddd', maxWidth: '100%' }} className="img-thumbnail mb-3" />
          </div>
        )}

        <div className="mb-3">
          <button className="btn btn-outline-primary me-2" onClick={() => setShowCropModal(true)} disabled={!image}>Crop</button>
          <button className="btn btn-outline-primary" onClick={() => setShowTransformModal(true)} disabled={!image}>Transform</button>
        </div>

        <div className="btn-group mb-3">
          <button className={`btn btn-outline-primary ${resizeOption === 'size' ? 'active' : ''}`} onClick={() => setResizeOption('size')}>By Size</button>
          <button className={`btn btn-outline-primary ${resizeOption === 'percentage' ? 'active' : ''}`} onClick={() => setResizeOption('percentage')}>By Percentage</button>
          <button className={`btn btn-outline-primary ${resizeOption === 'socialMedia' ? 'active' : ''}`} onClick={() => setResizeOption('socialMedia')}>Social Media</button>
        </div>

        {resizeOption === 'size' && (
          <div className="row g-3 mb-3">
            <div className="col">
              <label htmlFor="widthInput" className="form-label">Width (px)</label>
              <input type="number" className="form-control" id="widthInput" value={width} onChange={(e) => setWidth(parseInt(e.target.value, 10))} />
            </div>
            <div className="col">
              <label htmlFor="heightInput" className="form-label">Height (px)</label>
              <input type="number" className="form-control" id="heightInput" value={height} onChange={(e) => setHeight(parseInt(e.target.value, 10))} />
            </div>
          </div>
        )}

        {resizeOption === 'percentage' && (
          <div className="mb-3">
            <label htmlFor="percentageInput" className="form-label">Percentage (%)</label>
            <input type="number" className="form-control" id="percentageInput" value={percentage} onChange={(e) => setPercentage(parseInt(e.target.value, 10))} />
          </div>
        )}

        {resizeOption === 'socialMedia' && (
          <div className="mb-3">
            <label htmlFor="socialMediaSelect" className="form-label">Platform</label>
            <select className="form-select" id="socialMediaSelect" value={socialMediaPlatform} onChange={(e) => setSocialMediaPlatform(e.target.value)}>
              <option value="instagramPost">Instagram Post (1080x1080)</option>
              <option value="facebookProfile">Facebook Profile (170x170)</option>
              <option value="twitterHeader">Twitter Header (1500x500)</option>
              <option value="linkedInCover">LinkedIn Cover (1128x191)</option>
            </select>
          </div>
        )}

        <div className="form-check mb-3">
          <input className="form-check-input" type="checkbox" id="lockAspectRatio" checked={lockAspectRatio} onChange={() => setLockAspectRatio(!lockAspectRatio)} />
          <label className="form-check-label" htmlFor="lockAspectRatio">Lock Aspect Ratio</label>
        </div>

        <div className="mb-3">
          <label htmlFor="backgroundColorInput" className="form-label">Background Color</label>
          <input type="color" className="form-control form-control-color" id="backgroundColorInput" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} />
        </div>

        <div className="row g-3 mb-3">
          <div className="col">
            <label htmlFor="exportFormatSelect" className="form-label">Export Format</label>
            <select className="form-select" id="exportFormatSelect" value={exportFormat} onChange={(e) => setExportFormat(e.target.value)}>
              <option value="png">PNG</option>
              <option value="jpeg">JPG</option>
              <option value="webp">WEBP</option>
            </select>
          </div>
          <div className="col">
            <label htmlFor="targetFileSizeInput" className="form-label">Target File Size (KB)</label>
            <input type="number" className="form-control" id="targetFileSizeInput" value={targetFileSize} onChange={(e) => setTargetFileSize(parseInt(e.target.value, 10))} disabled={exportFormat === 'png'} />
          </div>
        </div>

        <button className="btn btn-custom" onClick={applyResize} disabled={!processedImage}>Apply Resize</button>

        {processedImage && (
          <div className="mt-3 text-center">
            <button className="btn btn-custom" onClick={downloadImage}>Download Processed Image</button>
          </div>
        )}

        {showCropModal && <CropModal image={processedImage} onCrop={handleCrop} onClose={() => setShowCropModal(false)} />}
        {showTransformModal && <TransformModal image={processedImage} onTransform={handleTransform} onClose={() => setShowTransformModal(false)} />}
      </div>
    </div>
  );
}

export default ImageTool;