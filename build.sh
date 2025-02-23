#!/usr/bin/env bash

set -e

VERSION=$1

if [[ "$VERSION" =~ ^v[0-9]+(\.[0-9]+){2}$ ]]; then
    echo "Generating protobuf bindgins for version $VERSION"
else
    echo "Invalid version format '$VERSION'. Only vX.Y.Z format is valid (e.g. v0.64.0)"
    exit 1
fi

mkdir -p substrait-build

pushd substrait-build

rm -rf substrait

git clone --branch "$VERSION" --depth 1 https://github.com/substrait-io/substrait temp

mv temp/proto/substrait substrait

rm -rf temp

popd

npx buf generate substrait-build

rm -rf substrait-build
