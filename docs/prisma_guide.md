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

## Generating Prisma Client

To generate the Prisma client based on your schema definition, run the following command:
    ```bash
    npx prisma generate
    ```
This command generates the Prisma client based on the schema definition defined in your project. The generated client provides a programmatic interface for interacting with the database from your application code.

## Prisma Studio

To explore and interact with your database visually, you can use Prisma Studio by running the following command:
    ```bash
    npx prisma studio
    ```
Prisma Studio launches a web-based graphical user interface (GUI) that allows you to view and manipulate data in your database. It provides a convenient way to inspect your data model, create, read, update, and delete records, and perform other database management tasks.

For more information and advanced usage, refer to the [Prisma Documentation](https://www.prisma.io/docs).