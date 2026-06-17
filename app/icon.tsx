import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

export const size = {
  width: 192,
  height: 192,
};
export const contentType = 'image/png';

export default function Icon() {
  // Read the logo.png from the public folder
  const logoPath = join(process.cwd(), 'public', 'logo.png');
  const logoData = readFileSync(logoPath).toString('base64');
  const imgSrc = `data:image/png;base64,${logoData}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#002D80', // deep blue background
          borderRadius: '44px', // rounded rectangle
          overflow: 'hidden',
          border: '4px solid #0047BA', // premium border
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img 
            src={imgSrc} 
            style={{ 
              width: '120px', 
              height: '120px', 
              objectFit: 'contain' 
            }} 
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
