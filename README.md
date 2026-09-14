# GISVN – WebGIS VN2000 hiện trường

Ứng dụng WebGIS thuần HTML/CSS/JavaScript, tối ưu cho GitHub Pages và điện thoại ngoài thực địa. Không cần backend để mở bản đồ, quy đổi tọa độ, quản lý mốc, đo đạc hoặc đọc file cục bộ.

## Nhóm chức năng

- **Tọa độ:** WGS84 ↔ VN2000, tâm ngắm, GPS, sao chép/chia sẻ, cao độ tham khảo.
- **Mốc:** thêm, tìm, đổi tên, sắp theo khoảng cách, dẫn hướng, xuất KML/DXF, ghi vết GPX.
- **Đo:** khoảng cách, diện tích, bảng góc thửa, rào ảo, đi bộ quanh thửa, đo dốc.
- **Dữ liệu:** KML, KMZ, DXF, GPX, nhiều lớp, tìm đối tượng, nhập Google Drive, ghép ảnh giấy hai điểm.
- **Tuyến:** lý trình, cắm cọc, phát sinh cọc, trắc dọc/ngang, đào đắp sơ bộ và mô phỏng.
- **Hiện trường:** chụp ảnh có tem tọa độ, chế độ ngoài trời, lưới VN2000 và PWA.

## Cửa sổ Cài đặt

Có đầy đủ lựa chọn tỉnh/thành–kinh tuyến trục, múi 3°/6° và hệ số `k₀`, ngưỡng cảnh báo GPS, kinh tuyến tùy chỉnh, hiệu chỉnh Helmert 2D theo mốc địa phương, màu tâm ngắm, lưới, chế độ ngoài trời, đơn vị diện tích, Sentinel-2 WMS, sao lưu/khôi phục JSON, PWA và cấu hình tem ảnh.

## Chạy cục bộ

```bash
python3 -m http.server 8080
```

Mở `http://localhost:8080`. Không mở trực tiếp bằng `file://` nếu cần GPS, camera, giọng nói hoặc Service Worker.

## Kiểm tra

```bash
npm test
```

Kiểm tra tự động phát hiện ID HTML trùng, tài nguyên thiếu, đường dẫn không tương thích GitHub Project Pages, endpoint tile Google không chính thức, anti-debugger và lỗi cú pháp JavaScript nội tuyến.

## GitHub Pages

Workflow `.github/workflows/pages.yml` kiểm tra rồi phát hành mỗi lần push vào `main`. Trong **Settings → Pages**, chọn **Source: GitHub Actions** nếu repository chưa được cấu hình.

Địa chỉ dự kiến: `https://vietflexmap.github.io/VN2000/`.

## Giới hạn cần hiểu đúng

- Giao diện và dữ liệu cục bộ có thể mở lại khi mất mạng; nền bản đồ, tìm kiếm, tuyến, cao độ và Sentinel-2 vẫn cần Internet.
- KML được parse trên main thread; KMZ chỉ giải nén trong Web Worker; DXF dùng parser ASCII giới hạn. File nhập bị chặn ở 60 MB và KML sau giải nén bị chặn ở 150 MB.
- Quy đổi hiện dùng phép chiếu Transverse Mercator trên ellipsoid WGS-84 và hiệu chỉnh mốc 2D tùy chọn. Kết quả phải được đối chiếu mốc khống chế trước khi dùng cho hồ sơ pháp lý hoặc thi công.
- Dịch vụ Nominatim/OSRM công cộng phù hợp thử nghiệm và nhóm người dùng nhỏ, không phải backend có SLA.

Xem [DATA_SOURCES.md](./DATA_SOURCES.md) để biết nguồn, attribution và điều kiện vận hành.
