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
  const centerY = Math.round(height / 2);

  const railX = isMobile ? width - 20 : width - 26;
  const startX = isMobile ? width - 48 : width - 64;
  const startY = centerY + 132;
  const endX = isMobile ? width - 48 : width - 64;
  const endY = centerY - 120;

  const railBottomY = centerY + 80;
  const railTopY = centerY - 80;

  const startPoint: Point = { x: startX, y: startY };
  const bottomControl1: Point = { x: railX - 8, y: startY };
  const bottomControl2: Point = { x: railX, y: centerY + 104 };
  const railBottomPoint: Point = { x: railX, y: railBottomY };

  const railTopPoint: Point = { x: railX, y: railTopY };
  const topControl1: Point = { x: railX, y: centerY - 104 };
  const topControl2: Point = { x: railX - 8, y: endY };
  const endPoint: Point = { x: endX, y: endY };

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
