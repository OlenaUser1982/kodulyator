#!/bin/bash

# Define source files and directories
src_files=("dist/" "style.css")

# Define target directory
target_dir="../iloc/wp-content/plugins/kodulyator/assets/"

# Loop through the source files and directories
for src in "${src_files[@]}"; do
  # Use cp -r to ensure directories get copied recursively
  cp -r "$src" "$target_dir"
done

echo "Files copied successfully."