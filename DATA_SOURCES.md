# Nguồn dữ liệu và dịch vụ

Cập nhật kiểm tra: 2026-09-14.

| Thành phần | Nguồn | Vai trò | Ghi chú vận hành |
|---|---|---|---|
| Lõi bản đồ | [Vietflex 1.0.0](https://github.com/Vietflexmap/VN/tree/6144d565fcf236727577ab3c4471bbe49f86892f) | Engine tương tác, control và attribution | Ghim đúng commit `6144d565…`; bản cục bộ được đóng gói cùng PWA. |
| Roadmap | Vietflex Legacy Google Tiles | Nền mặc định | Yêu cầu ngôn ngữ `vi`, khu vực `VN`; attribution hiển thị `Vietflex | Google Maps`. |
| Satellite/Hybrid | Vietflex Legacy Google Tiles | Ảnh vệ tinh và ảnh kèm nhãn | Không tải hàng loạt hoặc tạo gói tile offline. |
| Terrain | Vietflex Legacy Google Tiles | Nền địa hình tham khảo | Không dùng thay DEM hoặc số liệu cao độ khảo sát. |
| Tìm kiếm/reverse | Nominatim công cộng | Địa chỉ và tìm địa danh | Chỉ gọi khi người dùng yêu cầu; phải đổi nhà cung cấp/tự host khi lưu lượng tăng. |
| Tuyến đường | OSRM demo | Tuyến ô tô tham khảo | Không có SLA; không dùng làm dịch vụ điều hướng thương mại. |
| Cao độ | Open-Meteo Elevation API | Cao độ sơ bộ | Không thay cho DEM/trắc địa công trình. |
| Sentinel-2 | Sentinel Hub WMS | Lớp ảnh tùy chọn | Người quản trị/người dùng tự cung cấp Instance ID hợp lệ. |
| Google Drive | Google Drive API/Picker | Nhập file tùy chọn | API key phải giới hạn HTTP referrer; OAuth dùng scope `drive.file`. |

## Nguyên tắc

- Tọa độ KML/GPX được đọc là WGS84 (kinh độ, vĩ độ).
- DXF không mang CRS đáng tin cậy; ứng dụng yêu cầu người dùng xác nhận tỉnh, kinh tuyến trục và múi chiếu trước khi nhập.
- Dữ liệu VN2000 cần kiểm tra bằng mốc khống chế đáng tin cậy. Không suy diễn datum hoặc tự sửa CRS âm thầm.
- GitHub Pages chỉ phục vụ file tĩnh. Tile và API bên thứ ba vẫn được gọi trực tiếp từ trình duyệt và có thể thay đổi giới hạn sử dụng.
- Chế độ `useLegacyGoogleTiles: true` gọi endpoint `google.com/vt`, không phải Map Tiles API chính thức được Google công bố cho bên thứ ba. Đây là cấu hình do dự án chủ động lựa chọn; khi dùng thương mại cần thay bằng `googleApiKey` chính thức, bật billing và giới hạn khóa theo tên miền.
