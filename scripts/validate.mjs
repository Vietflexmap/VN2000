import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const failures = [];

function assert(condition, message) {
  if (!condition) failures.push(message);
}

const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
const duplicates = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
assert(duplicates.length === 0, `ID trùng: ${duplicates.join(', ')}`);

const localRefs = [...html.matchAll(/(?:href|src)="(\.\/[^"?#]+)"/g)].map((match) => match[1]);
for (const ref of localRefs) {
  assert(fs.existsSync(path.resolve(root, ref)), `Thiếu tài nguyên: ${ref}`);
}

assert(!html.includes('href="/map'), 'Còn đường dẫn tuyệt đối /map trong href');
assert(!html.includes("register('/map"), 'Còn scope Service Worker tuyệt đối /map');
assert(!html.includes('.google.com/vt/'), 'Còn endpoint tile Google không chính thức');
assert(!html.includes('setInterval(function(){ debugger;'), 'Còn anti-debugger trong bản phát hành');

const inlineScripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)].map((match) => match[1]);
inlineScripts.forEach((source, index) => {
  try {
    // Chỉ kiểm tra cú pháp; không thực thi mã trình duyệt.
    new Function(source);
  } catch (error) {
    failures.push(`JavaScript nội tuyến #${index + 1} lỗi cú pháp: ${error.message}`);
  }
});

const manifest = JSON.parse(fs.readFileSync(path.join(root, 'manifest.webmanifest'), 'utf8'));
assert(manifest.start_url === './', 'Manifest start_url phải tương đối cho GitHub Project Pages');
assert(manifest.scope === './', 'Manifest scope phải tương đối cho GitHub Project Pages');

for (const requiredText of [
  'Khu vực &amp; Múi chiếu VN2000',
  'Hiệu chỉnh theo mốc địa phương',
  'Lưới toạ độ VN2000',
  'Ảnh vệ tinh Sentinel-2 (WMS)',
  'Tem thông tin khi chụp ảnh'
]) {
  assert(html.includes(requiredText), `Thiếu mục Cài đặt: ${requiredText}`);
}

if (failures.length) {
  console.error(failures.map((item) => `✗ ${item}`).join('\n'));
  process.exit(1);
}

console.log(`✓ index.html hợp lệ: ${ids.length} ID duy nhất, ${localRefs.length} tài nguyên cục bộ, ${inlineScripts.length} script nội tuyến.`);
