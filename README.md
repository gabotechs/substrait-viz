# Substrait Visualizer

> [!WARNING]  
> Under construction!

Visualize substrait plans in your browser with a flow diagram

# Install

Currently, the only way of installing the project is by building from source, for that
you'll need:

- Node JS and npm
- A Golang compiler

1. Clone the repository

```shell
git clone git@github.com:gabotechs/substrait-viz.git
cd substrait-viz
```

2. Install the npm packages

```shell
npm install
```

3. Build the project

```shell
npm run build
```

4. Install the CLI

```shell
cd packages/cli
go install
```
