import os
import re

def update_html_files():
    includes_dir = 'includes/'

    # Regex pattern to find the include block and its content
    include_pattern = re.compile(r'(\s*)<!-- include:\s*(\S+)\s*-->(.*?)<!-- endinclude -->', re.DOTALL)

    # List all HTML files in the current directory
    for filename in os.listdir('.'):
        if filename.endswith('.html'):
            with open(filename, 'r') as file:
                content = file.read()

            content_updated = content
            matches = list(include_pattern.finditer(content))
            
            # Skip files without include blocks
            if not matches:
                continue

            for match in matches:
                indentation = match.group(1)  # Capture the leading whitespace/indentation
                include_file = match.group(2)
                include_file_path = os.path.join(includes_dir, include_file)

                if os.path.exists(include_file_path):
                    with open(include_file_path, 'r') as inc_file:
                        include_content = inc_file.read().strip()

                    # Add "active" class to the matching href
                    include_content = re.sub(
                        rf'(<a\s+[^>]*href=["\']{filename}["\'][^>]*)(?<!class=["\']active["\'])',
                        r'\1 class="active"',
                        include_content
                    )

                    # Adjust each line's indentation to match the surrounding code
                    indented_include_content = ''.join(
                        indentation + line + '' for line in include_content.splitlines()
                    )

                    # Replace the include block with properly indented content
                    include_block = f'{indentation}<!-- include: {include_file} -->{indented_include_content}{indentation}<!-- endinclude -->'
                    content_updated = content_updated.replace(match.group(0), include_block)

                    print(f'Updated: {filename} with content from includes/{include_file}')
                else:
                    print(f'Error: {include_file} not found in {includes_dir} for {filename}')

            # Write the updated content back to the file
            with open(filename, 'w') as file:
                file.write(content_updated)

if __name__ == '__main__':
    update_html_files()
