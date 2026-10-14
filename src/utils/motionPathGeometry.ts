export interface Point {
  x: number;
  y: number;
}

export interface PathGeometry {
  width: number;
  height: number;
  isMobile: boolean;
  startPoint: Point;
  bottomControl1: Point;
  bottomControl2: Point;
  railBottomPoint: Point;
  railTopPoint: Point;
  topControl1: Point;
  topControl2: Point;
  endPoint: Point;
  d: string;
}

export function computePathGeometry(width: number, height: number): PathGeometry {
  const isMobile = width < 768;

  if (isMobile) {
    const railX = width - 24;
    const startPoint: Point = { x: Math.max(20, width - 110), y: height - 54 };
    const bottomControl1: Point = { x: width - 56, y: height - 54 };
    const bottomControl2: Point = { x: railX, y: height - 96 };
    const railBottomPoint: Point = { x: railX, y: height - 136 };

    const railTopPoint: Point = { x: railX, y: 136 };
    const topControl1: Point = { x: railX, y: 96 };
    const topControl2: Point = { x: width - 56, y: 64 };
    const endPoint: Point = { x: Math.max(40, width - 130), y: 64 };

    const d = `M ${startPoint.x} ${startPoint.y} C ${bottomControl1.x} ${bottomControl1.y}, ${bottomControl2.x} ${bottomControl2.y}, ${railBottomPoint.x} ${railBottomPoint.y} L ${railTopPoint.x} ${railTopPoint.y} C ${topControl1.x} ${topControl1.y}, ${topControl2.x} ${topControl2.y}, ${endPoint.x} ${endPoint.y}`;

    return {
      width,
      height,
      isMobile,
      startPoint,
      bottomControl1,
      bottomControl2,
      railBottomPoint,
      railTopPoint,
      topControl1,
      topControl2,
      endPoint,
      d,
    };
  }

  const railX = width - 52;
  const startPoint: Point = { x: width - 176, y: height - 76 };
  const bottomControl1: Point = { x: width - 96, y: height - 76 };
  const bottomControl2: Point = { x: railX, y: height - 130 };
  const railBottomPoint: Point = { x: railX, y: height - 186 };

  const railTopPoint: Point = { x: railX, y: 186 };
  const topControl1: Point = { x: railX, y: 130 };
  const topControl2: Point = { x: width - 96, y: 84 };
  const endPoint: Point = { x: width - 200, y: 84 };

  const d = `M ${startPoint.x} ${startPoint.y} C ${bottomControl1.x} ${bottomControl1.y}, ${bottomControl2.x} ${bottomControl2.y}, ${railBottomPoint.x} ${railBottomPoint.y} L ${railTopPoint.x} ${railTopPoint.y} C ${topControl1.x} ${topControl1.y}, ${topControl2.x} ${topControl2.y}, ${endPoint.x} ${endPoint.y}`;

  return {
    width,
    height,
    isMobile,
    startPoint,
    bottomControl1,
    bottomControl2,
    railBottomPoint,
    railTopPoint,
    topControl1,
    topControl2,
    endPoint,
    d,
  };
}
