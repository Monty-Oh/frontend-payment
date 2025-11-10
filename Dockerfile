# Node.js 20-alpine 버전을 기반으로 이미지를 생성합니다.
FROM node:20-alpine

# 작업 디렉토리를 /app으로 설정합니다.
WORKDIR /app

# package.json과 package-lock.json을 복사합니다.
COPY package*.json ./

# 종속성을 설치합니다.
RUN npm install

# 나머지 소스 코드를 복사합니다.
COPY . .

# 8081 포트를 외부에 노출합니다.
EXPOSE 8081

# npm start 명령어로 애플리케이션을 실행합니다.
CMD [ "npm", "run", "prod" ]
