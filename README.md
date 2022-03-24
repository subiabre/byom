# byom
Music streaming for localheads.

1. [Install](#install)
2. [Deploy](#deploy)
3. [Usage](#usage)


## Install
To install byom locally you'll need to have [docker](https://docs.docker.com/engine/install/) installed on your machine. Alternatively, to build a development environment, you'll also want to have [node](https://nodejs.org/en/download/) and [npm](https://docs.npmjs.com/cli/v8/configuring-npm/install) to run the web interface.

### 1. Clone or download:
```shell
git clone https://github.com/subiabre/byom.git
...
cd byom
```

### 2. Setup the environment:
Before starting, you'd want to fine tune the values in the `.env` file for your system. You can skip this step and proceed with the default values and it should be fine, but if you encounter problems, try getting back to this step and then proceed to the build.

Each variable has detailed information above it. If you are unsure about a variable, you can leave the default values.

### 3. Build the environment:
The following content is for developers. If you are not interested in the development of byom, you can skip to the "[Deploy](#deploy)" section.

In the folder for this project:
```shell
# Build a dev environment
docker-compose up -d --build
```

### 4. Install dependencies:
For the API, access the docker instance and install:
```shell
# Access using docker-compose service name
docker-compose exec php bash
# Access using the named container
docker exec -it byom-php bash

# Install the dependencies
composer install
```

For the web client:
```shell
cd web
npm install
```

### 5. Serve the web client:
Note that the API server is already listening at `http://localhost:8401/api`. But you still need to launch the web client separately.
```shell
cd web
npm run dev

# To make the web client accesssible from other devices
npm run dev -- --host
```
Now both your API and the web client are live at localhost ports `8401` and `3000`, respectively. This environment is very similar to a dist environment and you can already use it as such.

> Note that the port for the development web client differs from the port in a dist environment, which will usually be `8403`.

## Deploy
To deploy byom on your network:
```shell
docker-compose -f docker-compose.prod.yml up -d --build
```

Now byom is visible at `http://localhost:8403` for your own machine, and at `http://<byom_host_machine_ip>:8403` for the rest of devices in your network. In the future I'll probably put something so that both the byom local and network addresses get printed after the deploy.

## Usage
Once your environment is up, byom still needs to know where is your music.

```shell
# Enter the docker instance
docker exec -it byom-php bash

# Start the database
bin/console doctrine:database:create
bin/console doctrine:schema:create

# Start an importing process
bin/console music:source:local /local/path/to/your/music
```

Whatever path you specified in the [setup](#2-setup-the-environment) step as `LOCAL_STORAGE_PATH` will be accessible inside the container at the `/local` path. Check the example below to understand this.

Say you have your music at `/home/user/Music` with the following structure:
```
Music/
    Artist1/...
    Artist2/...
    ...
```

Then, inside the container, what would be `/home/user/Music/Artist1` is at `/local/Artist1`. Neat, right?
