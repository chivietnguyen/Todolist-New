Làm site quản lý Todo

- Chức năng: 
1. Log in/ Log out / Register (Ok)
2. Edit personal info
4. Delete account
5. add, delete, edit category and Task

- Yêu cầu:
API spec:  https://www.task-manager.api.mvn-training.com/spec/?fbclid=IwAR0PgrnMrmV_ZgSq7BNfy-avq3UIfv7RA_11VKhQz101u94UfUPRgxmB-M4#/ 

CSS thì dùng Bootstrap

Khi đăng nhập => lưu JWT token vào localStorage, khi reload page vẫn giữ trạng thái đăng nhập, chỉ khi đăng xuất mới xóa JWT token (Ok)

Ở trạng thái danh sách category, task chỉ cần làm phân trang (dựa vào key meta và links)

Search task và category cần có chức năng debounce, nâng cao hơn thì viết custom hook