import React, { forwardRef } from 'react';
import { PathGeometry } from '../../utils/motionPathGeometry';
import { CharacterToken } from '../../utils/splitCharacters';

interface Props {
  geometry: PathGeometry;
  debugMode: boolean;
  transitTokens: CharacterToken[];
  transitSectionLabel: string;
}

export const CharacterMotionPath = forwardRef<SVGPathElement, Props>(
  ({ geometry, debugMode, transitTokens, transitSectionLabel }, ref) => {
    return (
      <>
        <svg
          className="fixed inset-0 w-full h-full pointer-events-none z-50 overflow-visible"
          viewBox={`0 0 ${geometry.width} ${geometry.height}`}
          aria-hidden="true"
        >
          <path
            ref={ref}
            id="hud-motion-path"
            d={geometry.d}
            fill="none"
            stroke={debugMode ? 'rgba(17, 17, 17, 0.75)' : 'none'}
            strokeWidth={debugMode ? 1.5 : 0}
            strokeDasharray={debugMode ? '4 4' : undefined}
          />

          {debugMode && (
            <g className="hud-debug-layer">
              <line
                x1={geometry.startPoint.x}
                y1={geometry.startPoint.y}
                x2={geometry.bottomControl1.x}
                y2={geometry.bottomControl1.y}
                className="hud-debug-handle"
              />
              <line
                x1={geometry.railBottomPoint.x}
                y1={geometry.railBottomPoint.y}
                x2={geometry.bottomControl2.x}
                y2={geometry.bottomControl2.y}
                className="hud-debug-handle"
              />

              <line
                x1={geometry.railTopPoint.x}
                y1={geometry.railTopPoint.y}
                x2={geometry.topControl1.x}
                y2={geometry.topControl1.y}
                className="hud-debug-handle"
              />
              <line
                x1={geometry.endPoint.x}
                y1={geometry.endPoint.y}
                x2={geometry.topControl2.x}
                y2={geometry.topControl2.y}
                className="hud-debug-handle"
              />

              <circle
                cx={geometry.bottomControl1.x}
                cy={geometry.bottomControl1.y}
                r="3"
                fill="none"
                stroke="#111111"
              />
              <circle
                cx={geometry.bottomControl2.x}
                cy={geometry.bottomControl2.y}
                r="3"
                fill="none"
                stroke="#111111"
              />
              <circle
                cx={geometry.topControl1.x}
                cy={geometry.topControl1.y}
                r="3"
                fill="none"
                stroke="#111111"
              />
              <circle
                cx={geometry.topControl2.x}
                cy={geometry.topControl2.y}
                r="3"
                fill="none"
                stroke="#111111"
              />

              <circle
                cx={geometry.startPoint.x}
                cy={geometry.startPoint.y}
                r="4.5"
                className="hud-debug-point"
              />
              <text
                x={geometry.startPoint.x - 8}
                y={geometry.startPoint.y + 16}
                fill="#111111"
                fontSize="9"
                fontFamily="var(--font-mono)"
                textAnchor="end"
              >
                START (QUEUE)
              </text>

              <circle
                cx={geometry.railBottomPoint.x}
                cy={geometry.railBottomPoint.y}
                r="3"
                fill="#929292"
              />
              <circle
                cx={geometry.railTopPoint.x}
                cy={geometry.railTopPoint.y}
                r="3"
                fill="#929292"
              />

              <circle
                cx={geometry.endPoint.x}
                cy={geometry.endPoint.y}
                r="5"
                fill="#111111"
              />
              <text
                x={geometry.endPoint.x - 8}
                y={geometry.endPoint.y - 10}
                fill="#111111"
                fontSize="9"
                fontFamily="var(--font-mono)"
                textAnchor="end"
              >
                DOCK (ACTIVE HEADER)
              </text>
            </g>
          )}
        </svg>

        <div
          id="hud-transit-container"
          className="fixed inset-0 pointer-events-none z-50 overflow-visible"
          aria-hidden="true"
        >
          {transitTokens.map((token) => (
            <span
              key={token.id}
              data-transit-char={token.index}
              className="hud-char-transit text-2xl sm:text-3xl opacity-0"
              style={{
                transform: `translate3d(${geometry.startPoint.x}px, ${geometry.startPoint.y}px, 0px)`,
              }}
            >
              {token.displayChar}
            </span>
          ))}
        </div>
      </>
    );
  }
);

CharacterMotionPath.displayName = 'CharacterMotionPath';
