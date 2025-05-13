ARG NODE_VERSION=23.11-alpine3.21
ARG PNPM_VERSION=10.10.0

FROM node:${NODE_VERSION} AS base

RUN --mount=type=cache,target=/root/.npm \
    npm install -g pnpm@${PNPM_VERSION}

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

COPY tsconfig.json .

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.local/share/pnpm/store to speed up subsequent builds.
# Leverage a bind mounts to package.json and pnpm-lock.yaml to avoid having to copy them into
# into this layer.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
    --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

COPY src src

RUN pnpm run build


FROM node:${NODE_VERSION} AS final

WORKDIR /app

COPY package.json pnpm-lock.yaml  ./

COPY --from=base /app/build ./build

COPY --from=base /app/node_modules ./node_modules

CMD ["npm", "run", "start"]