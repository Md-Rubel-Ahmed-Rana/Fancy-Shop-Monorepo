# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Build only the auth-service
RUN npx nx build auth-service

# Stage 2: Run
FROM node:20-alpine

WORKDIR /app

# Copy auth-service build output
COPY --from=builder /app/dist/apps/auth-service ./dist

# Copy shared lib source
COPY --from=builder /app/libs ./libs

# Copy proto files
COPY --from=builder /app/proto ./proto

COPY --from=builder /app/package.json ./package.json

RUN npm install --omit=dev

EXPOSE 9010

CMD ["node", "dist/main.js"]
