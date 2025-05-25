# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Build only the cart-service
RUN npx nx build cart-service

# Stage 2: Run
FROM node:20-alpine

WORKDIR /app

# Copy cart-service build output
COPY --from=builder /app/dist/apps/cart-service ./dist

# Copy shared lib source (optional but works with tsconfig paths)
COPY --from=builder /app/libs ./libs

COPY --from=builder /app/package.json ./package.json

RUN npm install --omit=dev

EXPOSE 9005

CMD ["node", "dist/main.js"]
