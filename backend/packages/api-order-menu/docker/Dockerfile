FROM  node:18-alpine as builder

# Set the working directory inside the container
WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn run build

FROM --platform=linux/X86_64 node:18-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./package.json
COPY --from=builder /usr/src/app/dist ./dist

COPY docker/start.sh /start.sh
RUN chmod +x /start.sh

# Expose the port the app runs on
EXPOSE 7803

# Command to run the application
CMD [ "/start.sh" ]
