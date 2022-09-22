Làm site quản lý Todo

- Chức năng: 
1. Log in/ Log out / Register (Ok)
2. Edit personal info (API ????)
4. Delete account (OK)
5. add, delete, edit category and Task

- Yêu cầu:
API spec:  https://www.task-manager.api.mvn-training.com/spec/?fbclid=IwAR27nTQ0BjsyUS9BhIDXIV1uaTosX8j-vnaa0b6MENVUP5X3IN9hOwsUm1Y#/ 

CSS thì dùng Bootstrap (OK)

Khi đăng nhập => lưu JWT token vào localStorage, khi reload page vẫn giữ trạng thái đăng nhập, chỉ khi đăng xuất mới xóa JWT token (Ok)

Ở trạng thái danh sách category, task chỉ cần làm phân trang (dựa vào key meta và links)
    - Title
    - Category
    - CreatedAt
    - CompletedAt

Cho phép sửa trực tiếp title, status và category của title bằng ngay trên màn hình danh sách task
    - Title: Thay đổi bằng tag input
    - Status: thay đổi bằng tag checkbox
    - Category: hiển thị theo dạng combox box, cho phép search 

Cho phép search tasks

Search task và category cần có chức năng debounce, nâng cao hơn thì viết custom hook

Xử lý đặc biệt đối với trường hợp đổi mật khẩu vì khi đó hệ thống không chấp nhận token cũ
=> Sửa error interceptor của axios để clear thông tin đăng nhập của người dùng khi gặp mã 401 và message lỗi là This token is invalidated



- Yêu cầu React
    Dùng Redux hoặc React Context để store token