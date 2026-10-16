import { forwardRef } from 'react';
import { PathGeometry } from '../../utils/motionPathGeometry';

interface Props {
  geometry: PathGeometry;
}

export const CharacterMotionPath = forwardRef<SVGPathElement, Props>(
  ({ geometry }, ref) => {
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
          stroke="none"
        />
      </svg>
    );
  }
);

CharacterMotionPath.displayName = 'CharacterMotionPath';
