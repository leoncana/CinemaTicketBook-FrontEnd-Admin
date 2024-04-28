# Use the same Node.js version as your local development environment
FROM node:20

WORKDIR /app

COPY package*.json ./

# If using a .env file, uncomment the next line to copy it into the image
# COPY .env ./

RUN npm install

COPY . .

# Add this line if you think environment variables are missing
# ENV MY_ENV_VAR=value
ENV PORT 3001
RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]
