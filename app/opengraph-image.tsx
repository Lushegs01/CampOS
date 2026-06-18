import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Route segment config
export const alt = 'CampOS - One operating system for the whole campus';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #ffffff, #f8f9fa)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          border: '16px solid #0047BA',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '40px',
            background: 'rgba(0, 71, 186, 0.05)',
            padding: '40px',
            borderRadius: '100px',
            border: '2px solid rgba(0, 71, 186, 0.1)'
          }}
        >
          <svg width="120" height="120" viewBox="0 0 40 40" fill="none">
            <rect x="5" y="5" width="12" height="12" rx="2" stroke="#0047BA" strokeWidth="2.5" />
            <rect x="23" y="5" width="12" height="12" rx="2" stroke="#D79744" strokeWidth="2.5" />
            <rect x="5" y="23" width="12" height="12" rx="2" stroke="#D79744" strokeWidth="2.5" />
            <rect x="23" y="23" width="12" height="12" rx="6" fill="#0047BA" />
            <circle cx="11" cy="11" r="2.5" fill="#0047BA" />
            <circle cx="29" cy="11" r="2.5" fill="#D79744" />
            <circle cx="11" cy="29" r="2.5" fill="#D79744" />
          </svg>
        </div>
        <h1
          style={{
            fontSize: '84px',
            fontWeight: 900,
            color: '#0B0F19',
            letterSpacing: '-0.04em',
            margin: '0 0 20px 0',
            textAlign: 'center',
          }}
        >
          CampOS
        </h1>
        <p
          style={{
            fontSize: '42px',
            fontWeight: 500,
            color: '#475467',
            margin: 0,
            textAlign: 'center',
            letterSpacing: '-0.02em',
          }}
        >
          One operating system for the whole campus.
        </p>
      </div>
    ),
    {
      ...size,
    }
  );
}
