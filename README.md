# frontend-payment

간단한 결제 테스트용 프론트엔드 프로젝트입니다.  
Node.js 기반 Express 서버와 HTMX를 사용하여 동적으로 페이지를 렌더링합니다.

---

## 📦 프로젝트 구성

- **Express**: 백엔드 웹 프레임워크
- **HTMX**: 클라이언트 측 동적 HTML 처리
- **Morgan**: HTTP 요청 로깅
- **Cookie-Parser**: 쿠키 파싱 미들웨어

---

## 🚀 실행 방법

### 1. 저장소 클론

```bash
git clone https://github.com/your-username/frontend-payment.git
cd frontend-payment
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 서버 실행

```bash
npm start
```

### 4. 접속

브라우저에서 다음 주소로 접속합니다:

```
http://localhost:3000
```

---

## 📁 주요 디렉터리 구조

```
frontend-payment/
├── bin/
│   └── www               # 서버 실행 엔트리포인트
├── public/               # 정적 파일 (CSS, JS 등)
├── routes/               # 라우팅 모듈
├── views/                # HTML 템플릿 (HTMX 포함)
├── app.js                # Express 앱 설정
├── package.json
└── README.md
```

---

## ✅ 참고 사항

- HTML은 주로 HTMX 기반의 partial 요청을 통해 렌더링됩니다.
- Express `views` 디렉토리 하위에서 각 결제 탭별로 폼을 관리할 수 있습니다.

---

## 📬 문의

프로젝트 관련 이슈나 문의는 GitHub Issues 에서 남겨주세요.
