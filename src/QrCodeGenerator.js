import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

function QrCodeGenerator() {
  const [text, setText] = useState('');

  const handleDownload = () => {
    const qrCodeCanvas = document.getElementById('qrCodeCanvas');
    const borderedCanvas = document.createElement('canvas');
    const context = borderedCanvas.getContext('2d');

    const borderSize = 10; // Adjust border size as needed
    borderedCanvas.width = qrCodeCanvas.width + 2 * borderSize;
    borderedCanvas.height = qrCodeCanvas.height + 2 * borderSize;

    // Draw white background for the border
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, borderedCanvas.width, borderedCanvas.height);

    // Draw the QR code onto the new canvas with padding
    context.drawImage(qrCodeCanvas, borderSize, borderSize);

    // Add the border (optional, as the white background already acts as a border)
    context.strokeStyle = '#ccc';
    context.lineWidth = 2;
    context.strokeRect(0, 0, borderedCanvas.width, borderedCanvas.height);

    const pngUrl = borderedCanvas.toDataURL('image/png');
    let downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = 'qrcode.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="card tool-container">
      <div className="card-body">
        <h5 className="card-title">QR Code Generator</h5>
        <div className="mb-3">
          <input type="text" className="form-control" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text to generate QR code" />
        </div>
        {text && (
          <div>
            <div className="text-center" style={{ border: '2px solid #ccc', padding: '10px', display: 'inline-block' }}>
              <QRCodeCanvas id="qrCodeCanvas" value={text} size={256} level="H" />
            </div>
            
            <button className="btn btn-custom mt-3" onClick={handleDownload}>Download QR Code</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default QrCodeGenerator;