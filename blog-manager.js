// Blog Post Management System
// This file contains all blog post data and helper functions

const blogPosts = [
    // {
    //     id: 'spiderverse-review',
    //     title: 'Review: Spider-Man: Into the Spider-Verse',
    //     date: 'April 15, 2024',
    //     category: 'Movie Review',
    //     readTime: '8 min read',
    //     excerpt: 'A visually groundbreaking film that redefines what animation can achieve. The blend of comic book aesthetics, heartfelt storytelling, and innovative animation techniques make this a must-watch for any animation fan.',
    //     image: 'https://via.placeholder.com/400x250/4f8cff/ffffff?text=Spider-Verse',
    //     tags: ['Spider-Man', 'Animation', 'Superhero', 'Comic Books', 'Innovation'],
    //     relatedPosts: ['animation-for-everyone', 'pixar-soul-review'],
    //     filename: 'blog/spiderverse-review.html'
    // },
    // {
    //     id: 'animation-for-everyone',
    //     title: 'Why Animation is for Everyone',
    //     date: 'March 22, 2024',
    //     category: 'Industry Thoughts',
    //     readTime: '6 min read',
    //     excerpt: 'Animation isn\'t just for kids—it\'s a powerful medium for all ages. In this post, I explore how animated films tackle complex themes and why they deserve more recognition in mainstream cinema.',
    //     image: 'https://via.placeholder.com/400x250/ffe066/ffffff?text=Animation+For+Everyone',
    //     tags: ['Animation', 'Film Theory', 'Cultural Impact', 'Art', 'Storytelling'],
    //     relatedPosts: ['spiderverse-review', 'pixar-soul-review'],
    //     filename: 'blog/animation-for-everyone.html'
    // },
];

// Helper function to get a blog post by ID
function getBlogPost(id) {
    return blogPosts.find(post => post.id === id);
}

// Helper function to get related posts
function getRelatedPosts(currentPostId, count = 2) {
    const currentPost = getBlogPost(currentPostId);
    if (!currentPost) return [];
    
    return currentPost.relatedPosts
        .slice(0, count)
        .map(id => getBlogPost(id))
        .filter(post => post); // Remove any undefined posts
}

// Helper function to generate blog post URL
function getBlogPostUrl(id) {
    const post = getBlogPost(id);
    return post ? post.filename : '#';
}

// Helper function to get all blog posts for the main blog page
function getAllBlogPosts() {
    return blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Function to generate blog post cards for the main blog page
function generateBlogCards() {
    const blogGrid = document.querySelector('.blog-grid');
    if (!blogGrid) return;

    const posts = getAllBlogPosts();
    
    blogGrid.innerHTML = posts.map(post => `
        <article class="blog-post-card">
            <div class="blog-post-image">
                <img src="${post.image}" alt="${post.title}">
            </div>
            <div class="blog-post-content">
                <h2 class="blog-post-title">${post.title}</h2>
                <div class="blog-post-meta">
                    <span class="blog-post-date">${post.date}</span>
                    <span class="blog-post-category">${post.category}</span>
                </div>
                <p class="blog-post-excerpt">
                    ${post.excerpt}
                </p>
                <a href="${post.filename}" class="read-more-btn">Read Full ${post.category.includes('Review') ? 'Review' : 'Article'}</a>
            </div>
        </article>
    `).join('');
}

// Function to generate related posts section
function generateRelatedPosts(currentPostId) {
    const relatedPostsSection = document.querySelector('.related-posts-grid');
    if (!relatedPostsSection) return;

    const relatedPosts = getRelatedPosts(currentPostId);
    
    relatedPostsSection.innerHTML = relatedPosts.map(post => `
        <a href="${post.filename}" class="related-post-card">
            <h3>${post.title}</h3>
            <p>${post.excerpt.substring(0, 100)}...</p>
        </a>
    `).join('');
}

// Function to update navigation links based on current page
function updateNavigation() {
    const currentPath = window.location.pathname;
    const isBlogPost = currentPath.includes('/blog/');
    
    if (isBlogPost) {
        // Update navigation links for blog posts
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            if (link.getAttribute('href').includes('index.html')) {
                link.setAttribute('href', link.getAttribute('href').replace('index.html', '../index.html'));
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Generate blog cards if we're on the main blog page
    if (window.location.pathname.includes('blog.html')) {
        generateBlogCards();
    }
    
    // Update navigation
    updateNavigation();
    
    // Generate related posts if we're on a blog post page
    const currentPath = window.location.pathname;
    if (currentPath.includes('/blog/')) {
        const postId = currentPath.split('/').pop().replace('.html', '');
        generateRelatedPosts(postId);
    }
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        blogPosts,
        getBlogPost,
        getRelatedPosts,
        getBlogPostUrl,
        getAllBlogPosts
    };
} 