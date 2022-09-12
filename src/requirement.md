Làm site quản lý Todo

- Chức năng: 
1. Log in/ Log out / Register (DONE)
2. Edit personal info (Done)
4. Delete account (Done)
5. add, delete, edit category and Task

- Yêu cầu:
API spec:  https://mvn-task-manager.work/api/ 

CSS thì dùng Bootstrap (DONE)

Khi đăng nhập => lưu JWT token vào localStorage, khi reload page vẫn giữ trạng thái đăng nhập, chỉ khi đăng xuất mới xóa JWT token (Done)

Ở trạng thái danh sách category, task chỉ cần làm phân trang (dựa vào key meta và links)

Search task và category cần có chức năng debounce, nâng cao hơn thì viết custom hook