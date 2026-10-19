import { ImageResponse } from 'next/og';
import { profile } from '@/data/profile';

export const dynamic = 'force-static';

export function GET() {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        padding: '72px 80px',
        background: '#FAFAF8',
        color: '#17191C',
        fontFamily: 'sans-serif',
        borderTop: '8px solid #247A65',
      }}
    >
      <div
        style={{
          display: 'flex',
          fontSize: 21,
          letterSpacing: 3,
          color: '#247A65',
        }}
      >
        {profile.descriptor}
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          fontSize: 64,
          lineHeight: 1.15,
          letterSpacing: -3,
        }}
      >
        <div style={{ display: 'flex' }}>Engineering AI-powered</div>
        <div style={{ display: 'flex' }}>applications for</div>
        <div style={{ display: 'flex', color: '#247A65' }}>
          real-world problems.
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          borderTop: '1px solid #E6E8E5',
          paddingTop: 24,
          fontSize: 24,
        }}
      >
        <div style={{ display: 'flex' }}>{profile.name}</div>
        <div style={{ display: 'flex', color: '#667085', fontSize: 20 }}>
          AI Software Engineer
        </div>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
