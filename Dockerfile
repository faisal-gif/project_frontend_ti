# Gunakan Node.js versi LTS
FROM node:18-alpine

# Buat direktori kerja
WORKDIR /app

# Copy package.json dan install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy semua source code
COPY . .

# Build Next.js
RUN npm run build

# Expose port Next.js
EXPOSE 3000

# Jalankan Next.js
CMD ["npm", "run", "dev"]
