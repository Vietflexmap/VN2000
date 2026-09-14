# Nguồn dữ liệu và dịch vụ

Cập nhật kiểm tra: 2026-09-14.

| Thành phần | Nguồn | Vai trò | Ghi chú vận hành |
|---|---|---|---|
| Bản đồ sáng | CARTO + OpenStreetMap | Nền mặc định | Giữ attribution hiển thị trên bản đồ. |
| Bản đồ đường phố | OpenStreetMap Standard | Nền đường phố | Dùng tương tác thông thường; không tải hàng loạt hoặc tạo gói offline. |
| Ảnh vệ tinh | Esri World Imagery | Nền ảnh | Chỉ dùng qua tile service công khai và giữ attribution. |
| Địa hình | OpenTopoMap + OpenStreetMap | Nền địa hình | Không vượt mức zoom do nhà cung cấp công bố. |
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
