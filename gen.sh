#!/usr/bin/env bash

set -e

VERSION=$1
BUILD_DIR=temp-build

if [[ "$VERSION" =~ ^v[0-9]+(\.[0-9]+){2}$ ]]; then
    echo "Generating protobuf bindgins for version $VERSION"
else
    echo "Invalid version format '$VERSION'. Only vX.Y.Z format is valid (e.g. v0.64.0)"
    exit 1
fi

mkdir -p $BUILD_DIR

pushd $BUILD_DIR

rm -rf substrait

git clone --branch "$VERSION" --depth 1 https://github.com/substrait-io/substrait temp

mv temp/proto/substrait substrait

rm -rf temp

popd

npx buf generate $BUILD_DIR

rm -rf $BUILD_DIR
