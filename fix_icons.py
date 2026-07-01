import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

replacements = {
    'download': 'fa-solid fa-download',
    'menu': 'fa-solid fa-bars',
    'arrow-down-to-line': 'fa-solid fa-download',
    'mail': 'fa-solid fa-envelope',
    'github': 'fa-brands fa-github',
    'linkedin': 'fa-brands fa-linkedin',
    'arrow-right': 'fa-solid fa-arrow-right',
    'send': 'fa-solid fa-paper-plane',
    'arrow-up': 'fa-solid fa-arrow-up',
    'external-link': 'fa-solid fa-up-right-from-square',
    'map-pin': 'fa-solid fa-location-dot',
    'graduation-cap': 'fa-solid fa-graduation-cap',
    'target': 'fa-solid fa-bullseye',
    'heart': 'fa-solid fa-heart',
    'rocket': 'fa-solid fa-rocket',
    'code': 'fa-solid fa-code',
    'terminal': 'fa-solid fa-terminal',
    'wrench': 'fa-solid fa-screwdriver-wrench',
    'briefcase': 'fa-solid fa-briefcase',
    'award': 'fa-solid fa-award',
    'medal': 'fa-solid fa-medal',
    'star': 'fa-solid fa-star',
    'trophy': 'fa-solid fa-trophy'
}

def replace_lucide(match):
    icon_name = match.group(1)
    if icon_name in replacements:
        return f'<i class="{replacements[icon_name]}"></i>'
    # Fallback to a solid square or standard star if not found
    return f'<i class="fa-solid fa-star"></i>'

# Replace all <i data-lucide="..."></i>
content = re.sub(r'<i data-lucide="([^"]+)"></i>', replace_lucide, content)

# Remove lucide script and replace with FontAwesome
content = content.replace(
    '<script src="https://unpkg.com/lucide@latest"></script>',
    '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">'
)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
print('Replacement complete.')
