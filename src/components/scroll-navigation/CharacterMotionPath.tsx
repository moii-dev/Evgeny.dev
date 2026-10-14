import React, { forwardRef } from 'react';
import { PathGeometry } from '../../utils/motionPathGeometry';

interface Props {
  geometry: PathGeometry;
  debugMode: boolean;
}

export const CharacterMotionPath = forwardRef<SVGPathElement, Props>(
  ({ geometry, debugMode }, ref) => {
    return (
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
          strokeDasharray={debugMode ? '3 3' : undefined}
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
              cx={geometry.startPoint.x}
              cy={geometry.startPoint.y}
              r="3.5"
              className="hud-debug-point"
            />
            <circle
              cx={geometry.endPoint.x}
              cy={geometry.endPoint.y}
              r="3.5"
              className="hud-debug-point"
            />
          </g>
        )}
      </svg>
    );
  }
);

CharacterMotionPath.displayName = 'CharacterMotionPath';
