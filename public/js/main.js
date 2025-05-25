// Main JavaScript file for MixedByIker

document.addEventListener('DOMContentLoaded', () => {
  // Sample projects data - replace with your actual projects
  const projects = [
    {
      title: 'Project 1',
      description: 'A brief description of project 1',
      technologies: ['HTML', 'CSS', 'JavaScript']
    },
    {
      title: 'Project 2',
      description: 'A brief description of project 2',
      technologies: ['React', 'Node.js', 'MongoDB']
    },
    {
      title: 'Project 3',
      description: 'A brief description of project 3',
      technologies: ['Vue.js', 'Firebase']
    }
  ];

  // Function to load projects
  function loadProjects() {
    const projectsContainer = document.getElementById('projects-container');
    
    if (projectsContainer) {
      projectsContainer.innerHTML = projects.map(project => `
        <div class="project-card">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="technologies">
            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
          </div>
        </div>
      `).join('');
    }
  }

  // Add click event to CTA button
  const ctaButton = document.getElementById('cta-button');
  if (ctaButton) {
    ctaButton.addEventListener('click', () => {
      alert('Thanks for your interest! Contact form coming soon.');
    });
  }

  // Initialize the page
  loadProjects();
});

// Add any utility functions here
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
