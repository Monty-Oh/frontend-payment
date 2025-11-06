FROM node:18-alpine

WORKDIR /app


COPY package*.json ./
RUN npm ci --only=production

# 소스 코드 복사
COPY . .

CMD ["npm", "start"]
