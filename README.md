# GymFlow — Gym Management & Workout Tracking

GymFlow là nền tảng MVP quản lý phòng gym và theo dõi luyện tập, sử dụng React + Vite + Tailwind CSS, Spring Boot Java 21 và MySQL 8.

## 1. Công nghệ

- Frontend: React, Vite, Tailwind CSS, React Router, Axios, Recharts
- Backend: Java 21, Spring Boot 3, Spring Data JPA, Validation, Actuator
- Database: MySQL 8.4
- DevOps: Docker, Docker Compose, GitHub Actions

## 2. Tính năng có sẵn trong base

- Dashboard UI với dữ liệu minh họa.
- Trang hội viên kết nối API thật: danh sách, tìm kiếm, tạo, cập nhật trạng thái/xóa qua API.
- API kiểm tra: `GET /api/hello`
- API hội viên: `GET/POST /api/members`, `GET/PUT/DELETE /api/members/{id}`, `PATCH /api/members/{id}/status`
- Trang lịch tập và tiến độ hiện dùng dữ liệu mẫu, sẵn sàng để nhóm phát triển API.
- Docker Compose cho frontend, backend và MySQL.
- GitHub Actions build/test backend, lint/build frontend và build Docker images.

> Đây là base project để nhóm phát triển tiếp, chưa phải hệ thống hoàn chỉnh. Đăng nhập/JWT, gói tập, lịch tập, nhật ký và báo cáo thực tế chưa được triển khai đầy đủ. Không đưa lên môi trường công khai trước khi bổ sung xác thực và phân quyền.

## 3. Chạy bằng Docker Compose

Yêu cầu: Docker Engine và Docker Compose v2.

```bash
cp .env.example .env
docker compose up --build -d
docker compose ps
```

Trên Windows PowerShell, có thể sao chép file bằng:

```powershell
Copy-Item .env.example .env
docker compose up --build -d
docker compose ps
```

Mở:

- Frontend: http://localhost:8081
- Backend: http://localhost:8080
- Health check: http://localhost:8080/actuator/health
- API hello: http://localhost:8080/api/hello

Frontend Nginx proxy `/api` sang backend. Vì vậy trình duyệt gọi API qua cùng origin của frontend.

Xem log:

```bash
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f mysql
```

Dừng hệ thống:

```bash
docker compose down
```

Dừng và xóa cả dữ liệu database (cẩn thận):

```bash
docker compose down -v
```

## 4. Chạy local không Docker

### Backend

Cần Java 21 và Gradle 8+.

```bash
cd backend
gradle bootRun
```

Backend mặc định dùng MySQL tại `localhost:3306`. Nếu bạn dùng Compose, cổng MySQL host mặc định là `3307`; cấu hình biến môi trường `SPRING_DATASOURCE_URL` tương ứng khi chạy backend local.

### Frontend

Cần Node.js 22+.

```bash
cd frontend
npm install
npm run dev
```

Mở http://localhost:5173. Khi chạy Vite local, đặt `VITE_API_BASE_URL=http://localhost:8080/api` trong file `frontend/.env.local` nếu muốn gọi backend trực tiếp; sau đó cần điều chỉnh cách ghép URL trong service theo base URL đã chọn. Mặc định base URL hiện tại là `/api` và phù hợp với Docker/Nginx proxy.

## 5. API hội viên

### Tạo hội viên

```bash
curl -X POST http://localhost:8080/api/members   -H "Content-Type: application/json"   -d '{"fullName":"Nguyen Van A","email":"a@example.com","phone":"0900000000"}'
```

### Lấy danh sách

```bash
curl http://localhost:8080/api/members
```

### Tìm kiếm

```bash
curl "http://localhost:8080/api/members?search=Nguyen"
```

## 6. Cấu trúc dự án

```text
gymflow/
├── backend/
│   ├── src/main/java/com/gymflow/
│   │   ├── config/
│   │   ├── health/
│   │   └── member/
│   ├── src/test/
│   ├── Dockerfile
│   └── build.gradle
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── routes/
│   ├── Dockerfile
│   └── package.json
├── compose.yaml
├── .env.example
├── .github/workflows/ci.yml
└── README.md
```

## 7. Git workflow gợi ý

```bash
git init
git add .
git commit -m "chore: initialize GymFlow base"
git branch -M main
git checkout -b dev
git remote add origin <YOUR_GITHUB_REPOSITORY_URL>
git push -u origin main
git push -u origin dev
```

Mỗi thành viên làm trên nhánh riêng, ví dụ `feature/auth`, `feature/membership`, `feature/workout`, `feature/frontend-dashboard`. Mở Pull Request vào `dev`; chỉ merge sang `main` sau khi kiểm thử.

## 8. Việc nên làm tiếp theo

1. Hoàn thiện đăng nhập, JWT, BCrypt và phân quyền ADMIN/TRAINER/MEMBER.
2. Bổ sung DTO và service layer; không trả trực tiếp entity từ API khi mở rộng.
3. Phát triển gói tập và đăng ký gói.
4. Phát triển lịch tập, bài tập, nhật ký và cân nặng.
5. Nối dashboard/tiến độ với API thật, bỏ dữ liệu demo.
6. Bổ sung unit/integration tests và test quyền truy cập.
7. Đổi mật khẩu mặc định trong `.env` trước khi deploy.

## 9. Lưu ý bảo mật

Các giá trị trong `.env.example` chỉ dành cho máy local. Base hiện chưa có xác thực JWT; các API hội viên hiện không được bảo vệ và chỉ nên dùng trong môi trường phát triển. Trước khi triển khai Internet, cần bổ sung Spring Security, JWT, kiểm tra quyền và cấu hình secret an toàn.
