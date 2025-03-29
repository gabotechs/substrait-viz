> [!WARNING]  
> Under construction!


<p align="center">
    <img height="96" src="./packages/SubstraitVizCli/public/logo.svg" alt="logo">
    <img height="96" src="https://github.com/user-attachments/assets/7ad419c1-df44-4496-8941-70219c6d39fe" alt="title">
</p>

<h3 align="center">
    Visualize Substrait plans in your browser with a flow diagram
</h3>

<p align="center">
    <img width="676" src="https://github.com/user-attachments/assets/c8959819-7f1d-4a9e-a87f-329f7ba5ac1b" alt="Demo">
</p>

# Install

Using homebrew tap:

```shell
brew install gabotechs/taps/substrait-viz
```

Or with npm:

```shell
npm install -g substrait-viz
```

# Usage

If the Substrait plan does not contain any reference to protobuf messages declared
in other specifications besides the Substrait one, it's as simple as passing the
file containing the Substrait payload in either JSON or binary format:

```shell
substrait-viz my-substrait-file.json
```

```shell
substrait-viz my-substrait-file.bin
```

If the Substrait plan contains reference to protobuf messages declared in external
protobuf specifications, you'll need to build a descriptor set from those specifications
and pass it as an argument.

```shell
substrait-viz my-substrait-file.json --descriptor my-custom-messages.binpb
```

# Examples

This repo contains several plans that can be used for trying out the tool, for example all
tcph plans in `packages/SubstraitViz/src/.test_data/`:

```shell
substrait-viz packages/SubstraitViz/src/.test_data/tpch-plan01.json
```
