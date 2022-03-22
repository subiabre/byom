FROM php:8.0-fpm

RUN apt update && apt install -y \
    zlib1g-dev g++ git libicu-dev zip libzip-dev zip

RUN docker-php-ext-install \
    intl opcache pdo pdo_mysql

RUN pecl install apcu \
    && docker-php-ext-enable apcu \
    && docker-php-ext-configure zip \
    && docker-php-ext-install zip

WORKDIR /app

COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

COPY app/api/composer.json app/api/composer.lock /app/
RUN composer install --prefer-dist --no-scripts --no-dev --no-autoloader && rm -rf /root/.composer
RUN composer dump-autoload --no-scripts --no-dev --optimize
