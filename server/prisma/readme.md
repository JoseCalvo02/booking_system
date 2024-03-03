# Prisma Installation and Update Guide

This guide outlines the steps to install and update Prisma in your project.

## Installation

1. Installed Prisma as a development dependency using npm:
    ```bash
    npm install prisma --save-dev
    ```

2. Initialized Prisma in your project by running the following command:
    ```bash
    npx prisma init
    ```

## Updating Prisma Schema

To update your Prisma schema based on changes made directly in the database, follow these steps:

1. Pull the changes from the database into your Prisma schema:
    ```bash
    npx prisma db pull
    ```

For more information and advanced usage, refer to the [Prisma Documentation](https://www.prisma.io/docs).