import sharp from 'sharp';
import { writeFileSync } from 'node:fs';

const SRC = process.argv[2];
const W = Number(process.argv[3] || 1040);

const img = sharp(SRC).resize({ width: W, kernel: 'lanczos3' }).ensureAlpha();
const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;

// Build the ink mask. The asset is a blue mark on transparent-or-white ground,
// so treat "has alpha and is not near-white" as inside.
const inside = new Uint8Array(width * height);
let alphaSeen = 0;
for (let i = 0, p = 0; i < width * height; i++, p += channels) {
  const r = data[p], g = data[p + 1], b = data[p + 2], a = data[p + 3];
  if (a < 250) alphaSeen++;
  const nearWhite = r > 235 && g > 235 && b > 235;
  inside[i] = a > 128 && !nearWhite ? 1 : 0;
}
const at = (x, y) => (x < 0 || y < 0 || x >= width || y >= height ? 0 : inside[y * width + x]);

// ---- Marching squares: walk every boundary between inside and outside. ----
// Each cell corner sample gives a 4-bit case; we follow edges cell to cell.
const visited = new Set();
const contours = [];

function traceFrom(sx, sy) {
  const pts = [];
  let x = sx, y = sy, dir = null;
  for (let guard = 0; guard < width * height * 4; guard++) {
    const tl = at(x - 1, y - 1), tr = at(x, y - 1);
    const bl = at(x - 1, y), br = at(x, y);
    const code = (tl << 3) | (tr << 2) | (br << 1) | bl;
    if (code === 0 || code === 15) break;

    let nd;
    switch (code) {
      case 1: case 5: case 13: nd = 'L'; break;
      case 2: case 3: case 7:  nd = 'D'; break;
      case 4: case 12: case 14: nd = 'R'; break;
      case 8: case 10: case 11: nd = 'U'; break;
      case 6: nd = dir === 'L' ? 'D' : 'U'; break;   // saddle
      case 9: nd = dir === 'U' ? 'L' : 'R'; break;   // saddle
      default: nd = 'R';
    }

    const key = `${x},${y},${nd}`;
    if (visited.has(key)) break;
    visited.add(key);
    pts.push([x, y]);
    dir = nd;
    if (nd === 'L') x--; else if (nd === 'R') x++;
    else if (nd === 'U') y--; else y++;
    if (x === sx && y === sy) break;
  }
  return pts;
}

for (let y = 0; y <= height; y++) {
  for (let x = 0; x <= width; x++) {
    const tl = at(x - 1, y - 1), tr = at(x, y - 1);
    const bl = at(x - 1, y), br = at(x, y);
    const code = (tl << 3) | (tr << 2) | (br << 1) | bl;
    if (code === 0 || code === 15) continue;
    if (visited.has(`${x},${y},L`) || visited.has(`${x},${y},R`) ||
        visited.has(`${x},${y},U`) || visited.has(`${x},${y},D`)) continue;
    const c = traceFrom(x, y);
    if (c.length > 40) contours.push(c);
  }
}

// ---- Ramer-Douglas-Peucker simplification ----
function rdp(points, eps) {
  if (points.length < 3) return points;
  const [ax, ay] = points[0], [bx, by] = points[points.length - 1];
  let idx = -1, max = 0;
  const dx = bx - ax, dy = by - ay;
  const len = Math.hypot(dx, dy) || 1;
  for (let i = 1; i < points.length - 1; i++) {
    const [px, py] = points[i];
    const d = Math.abs((px - ax) * dy - (py - ay) * dx) / len;
    if (d > max) { max = d; idx = i; }
  }
  if (max <= eps) return [points[0], points[points.length - 1]];
  return [...rdp(points.slice(0, idx + 1), eps).slice(0, -1), ...rdp(points.slice(idx), eps)];
}

// ---- Fit a smooth cubic through the simplified points (Catmull-Rom -> Bezier)
function toPath(points, sx, sy, ox, oy, prec = 2) {
  const P = points.map(([x, y]) => [(x - ox) * sx, (y - oy) * sy]);
  const n = P.length;
  const f = (v) => Number(v.toFixed(prec));
  let d = `M${f(P[0][0])} ${f(P[0][1])}`;
  for (let i = 0; i < n; i++) {
    const p0 = P[(i - 1 + n) % n], p1 = P[i], p2 = P[(i + 1) % n], p3 = P[(i + 2) % n];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d + 'Z';
}

// Normalise to a 100-unit-wide viewBox around the mark's bounding box.
let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
for (const c of contours) for (const [x, y] of c) {
  if (x < minX) minX = x; if (x > maxX) maxX = x;
  if (y < minY) minY = y; if (y > maxY) maxY = y;
}
const bw = maxX - minX, bh = maxY - minY;
const VB_W = 100;
const scale = VB_W / bw;
const VB_H = Number((bh * scale).toFixed(2));

const eps = bw * 0.0016;
const paths = contours
  .map((c) => rdp(c, eps))
  .sort((a, b) => b.length - a.length)
  .map((c) => toPath(c, scale, scale, minX, minY));

console.log(`source ${width}x${height}  alpha px ${alphaSeen}`);
console.log(`contours ${contours.length}  points ${contours.map(c=>c.length).join(',')}`);
console.log(`simplified ${contours.map(c=>rdp(c,eps).length).join(',')}  eps ${eps.toFixed(2)}px`);
console.log(`bbox ${bw.toFixed(1)}x${bh.toFixed(1)}  ratio ${(bw/bh).toFixed(3)}  viewBox 0 0 ${VB_W} ${VB_H}`);

writeFileSync(process.argv[4] || './traced.json', JSON.stringify({
  viewBox: `0 0 ${VB_W} ${VB_H}`, width: VB_W, height: VB_H, d: paths.join(''),
}, null, 2));
