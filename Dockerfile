
# Dockerfile

FROM node:16-alpine

WORKDIR /task

COPY TaskManagementBackend/package.json TaskManagementBackend/package-lock.json ./

RUN npm install 

COPY TaskManagementBackend/ ./

EXPOSE 8196

CMD ["npm", "start"]
 
