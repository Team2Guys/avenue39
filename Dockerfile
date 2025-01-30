# Example Dockerfile
FROM node:20-alpine

WORKDIR /usr/src/app


COPY package*.json ./

COPY prisma ./prisma

# Install dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Run the Prisma generate command
RUN npx prisma generate

# Expose port and define command
EXPOSE 3300
CMD ["npm", "start:prod"]


