#!/usr/bin/env bash

set -euo pipefail


stow --dotfiles --target="$HOME" .
