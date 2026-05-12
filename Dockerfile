# --- Stage 1: Base (Common to all) ---
FROM node:20-alpine AS base
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY prisma ./prisma/
RUN npx prisma generate

# --- Stage 2: Development (For local/dev) ---
FROM base AS development
COPY . .
CMD ["npm", "run", "start:dev"]

# --- Stage 3: Build (For prod) ---
FROM base AS build-step
COPY . .
RUN npm run build

# --- Stage 4: Production (The slim final image) ---
FROM node:20-alpine AS production
WORKDIR /app
COPY --from=build-step /app/dist ./dist
COPY --from=build-step /app/node_modules ./node_modules
COPY --from=base /app/prisma ./prisma
# Only production env vars here
CMD ["node", "dist/main"]