# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Build only the recommendation-service
RUN npx nx build recommendation-service

# Stage 2: Run
FROM node:20-alpine

WORKDIR /app

# Copy recommendation-service build output
COPY --from=builder /app/dist/apps/recommendation-service ./dist

# Copy shared lib source (optional but works with tsconfig paths)
COPY --from=builder /app/libs ./libs

COPY --from=builder /app/package.json ./package.json

RUN npm install --omit=dev

EXPOSE 9003

CMD ["node", "dist/main.js"]
