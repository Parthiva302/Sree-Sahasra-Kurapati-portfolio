import re

# 1. Update style.css
with open('style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Replace padding: 100px 0; with padding: 60px 0;
css = css.replace('padding: 100px 0;', 'padding: 60px 0;')
css = css.replace('padding: 100px 0 160px;', 'padding: 60px 0 100px;')

# Add .education-section
if '.education-section' not in css:
    css += '\n\n.education-section {\n  padding: 60px 0;\n  position: relative;\n  z-index: 1;\n}\n'

with open('style.css', 'w', encoding='utf-8') as f:
    f.write(css)

# 2. Update index.html
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Remove the two education cards from about section
html = re.sub(r'<div class="about-detail-card glass-card">.*?<h3>NIE, Mysore</h3>.*?</div>\s*</div>', '', html, flags=re.IGNORECASE | re.DOTALL)
html = re.sub(r'<div class="about-detail-card glass-card">.*?<h3>Unacademy, Vijayawada</h3>.*?</div>\s*</div>', '', html, flags=re.IGNORECASE | re.DOTALL)

# Insert Education Section before Experience Section
education_html = '''
    <!-- Education Timeline Section -->
    <section class="education-section" id="education">
      <div class="section-header">
        <span class="section-tag">Academics</span>
        <h2 class="section-title">Education</h2>
      </div>

      <div style="width: 90%; max-width: 1200px; margin: 0 auto;">
        <div class="timeline-container">
          <div class="timeline-line-wrapper">
            <svg class="timeline-svg" width="6" height="100%">
              <line class="timeline-svg-bg" x1="3" y1="0" x2="3" y2="100%" />
              <line class="timeline-svg-line" x1="3" y1="0" x2="3" y2="0" id="glowingTimelineLineEdu" />
            </svg>
          </div>

          <div class="timeline-items">
            <!-- Item 1 -->
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-date">Oct 2022 - Present</div>
              <div class="timeline-card glass-card card-spotlight">
                <div class="timeline-card-header">
                  <h3>The National Institute of Engineering, Mysore</h3>
                  <span class="role-badge">B.E in CSE</span>
                </div>
                <div class="role-responsibilities">
                  <p class="role-resp-title">Highlights:</p>
                  <ul class="role-desc-list">
                    <li>Current CGPA: 9.80</li>
                    <li>Passionate about AI, startups, and software engineering.</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <!-- Item 2 -->
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-date">June 2020 - May 2022</div>
              <div class="timeline-card glass-card card-spotlight">
                <div class="timeline-card-header">
                  <h3>Unacademy, Vijayawada</h3>
                  <span class="role-badge">Class 11 & 12</span>
                </div>
                <div class="role-responsibilities">
                  <p class="role-resp-title">Highlights:</p>
                  <ul class="role-desc-list">
                    <li>Board Percentage: 97.4%</li>
                    <li>Strong foundation in Mathematics and Sciences.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Experience Timeline Section -->'''

html = html.replace('<!-- Experience Timeline Section -->', education_html)

# Add Education to Navbar
navbar_edu = '''<a href="#education" class="nav-link">Education</a>
        <a href="#experience" class="nav-link">Experience</a>'''
html = html.replace('<a href="#experience" class="nav-link">Experience</a>', navbar_edu, 1)

# Add Education to Footer
footer_edu = '''<a href="#education" class="nav-link" style="color: var(--text-secondary); text-decoration: none; transition: color 0.3s ease;" onmouseover="this.style.color='var(--text-primary)'" onmouseout="this.style.color='var(--text-secondary)'">Education</a>
        <a href="#experience" class="nav-link" style="color: var(--text-secondary); text-decoration: none; transition: color 0.3s ease;" onmouseover="this.style.color='var(--text-primary)'" onmouseout="this.style.color='var(--text-secondary)'">Experience</a>'''
html = html.replace('<a href="#experience" class="nav-link" style="color: var(--text-secondary); text-decoration: none; transition: color 0.3s ease;" onmouseover="this.style.color=\'var(--text-primary)\'" onmouseout="this.style.color=\'var(--text-secondary)\'">Experience</a>', footer_edu, 1)


with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print('Updated spacing and added Education section successfully.')
