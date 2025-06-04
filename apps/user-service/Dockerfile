# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# ⬇️ Copy Prisma files before generate
COPY apps/user-service/prisma ./apps/user-service/prisma

# ⬇️ Now it's safe to run Prisma generate
RUN npx prisma generate --schema=apps/user-service/prisma/schema.prisma


# ⬇️ Now copy the full source code
COPY . .

# Build only the user-service
RUN npx nx build user-service

# Stage 2: Run
FROM node:20-alpine

WORKDIR /app

# Copy build output
COPY --from=builder /app/dist/apps/user-service ./dist

# Copy generated Prisma client
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Copy Prisma schema (optional, for debugging or later client regeneration)
COPY --from=builder /app/apps/user-service/prisma ./prisma


# Copy shared libs if needed
COPY --from=builder /app/libs ./libs

# Copy proto files
COPY --from=builder /app/proto ./proto

# Copy package.json and install only production deps
COPY --from=builder /app/package.json ./package.json
RUN npm install --omit=dev

EXPOSE 9001

CMD ["node", "dist/main.js"]
