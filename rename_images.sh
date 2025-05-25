#!/bin/bash

# Change to the works directory
cd "$(dirname "$0")/works" || exit 1

# Counter for the new filenames
counter=1

# Loop through all JPG files (case insensitive)
for file in *.[jJ][pP][gG] *.[jJ][pP][eE][gG]; do
    # Skip if no files found
    [ -e "$file" ] || continue
    
    # Get the file extension in lowercase
    ext="${file##*.}"
    ext=$(echo "$ext" | tr '[:upper:]' '[:lower:]')
    
    # Skip if the file is the script itself or already renamed
    if [ "$file" != "rename_images.sh" ] && [[ ! "$file" =~ ^[0-9]+\. ]]; then
        # Rename the file
        new_name="${counter}.${ext}"
        echo "Renaming $file to $new_name"
        mv -n -- "$file" "$new_name"
        ((counter++))
    fi
done

echo "Renaming complete. $((counter-1)) files were renamed."
