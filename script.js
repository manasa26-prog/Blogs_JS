let blogs = JSON.parse(localStorage.getItem('blogs')) || [
    {
        title: 'How to Stay Productive While Working from Home',
        content: 'With the rise of remote work, staying productive at home has become a challenge for many. To maintain focus, create a dedicated workspace, establish a routine, and minimize distractions. Set clear goals for the day, take regular breaks, and use productivity tools to help you stay on track. This way, you can enjoy the flexibility of working from home while still being efficient.',
        views: 0
    },
    {
        title: 'The Best Books to Read for Personal Growth',
        content: 'Personal growth is a lifelong journey, and books are a great way to enhance your knowledge and skills. Some top recommendations for personal development include "Atomic Habits" by James Clear, "The Power of Now" by Eckhart Tolle, and "Dare to Lead" by Brené Brown. These books cover topics like habit formation, mindfulness, and leadership, all of which are essential for growth.',
        views: 0
    },
    {
        title: 'Top 5 Fitness Tips for Beginners',
        content: 'Starting a fitness journey can be intimidating, but with the right tips, you can make it enjoyable and sustainable. First, begin with small, achievable goals. Second, focus on building a routine that includes both cardio and strength training. Third, don’t forget to rest and recover! Fourth, fuel your body with nutritious food. Lastly, stay consistent, and don’t compare your progress to others — fitness is a personal journey.',
        views: 0
    }
];

let currentBlogIndex = null;

function saveToLocalStorage() {
    localStorage.setItem('blogs', JSON.stringify(blogs));
}

function renderBlogList() {
    const blogListHtml = blogs.map((blog, index) => {
        return `
            <div class="blog-block">
                <h2>${blog.title}</h2>
                <p>${blog.content.substring(0, 100)}...</p>
                <p>Number of views: ${blog.views}</p>
                <div class="blog-operations">
                    <button class="open-blog-btn" data-index="${index}">Open</button>
                    <button class="edit-blog-btn" data-index="${index}">Edit</button>
                    <button class="delete-blog-btn" data-index="${index}">Delete</button>
                </div>
            </div>
        `;
    }).join('');
    document.getElementById('blog-list').innerHTML = blogListHtml;
}

function handleAddBlogButtonClick() {
    currentBlogIndex = null;
    document.getElementById('modal-title').innerText = 'Add New Blog';
    document.getElementById('title').value = '';
    document.getElementById('content').value = '';
    document.getElementById('blog-modal').style.display = 'block';
}

function handleSaveBlogButtonClick(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    
    if (currentBlogIndex === null) {
        blogs.push({ title, content, views: 0 });
    } else {
        blogs[currentBlogIndex].title = title;
        blogs[currentBlogIndex].content = content;
    }
    
    saveToLocalStorage();
    renderBlogList();
    document.getElementById('blog-modal').style.display = 'none';
}

function handleOpenBlogButtonClick(index) {
    const blogContentModal = document.getElementById('blog-content-modal');
    const blogContent = document.getElementById('blog-content');
    
    blogContent.innerHTML = blogs[index].content;
    blogContentModal.style.display = 'block';
    blogs[index].views++;
    
    saveToLocalStorage();
    renderBlogList();
}

function handleCloseBlogContentButtonClick() {
    document.getElementById('blog-content-modal').style.display = 'none';
}

function handleEditBlogButtonClick(index) {
    currentBlogIndex = index;
    document.getElementById('modal-title').innerText = 'Edit Blog';
    document.getElementById('title').value = blogs[index].title;
    document.getElementById('content').value = blogs[index].content;
    document.getElementById('blog-modal').style.display = 'block';
}

function handleDeleteBlogButtonClick(index) {
    blogs.splice(index, 1);
    saveToLocalStorage();
    renderBlogList();
}

document.addEventListener('DOMContentLoaded', function() {
    renderBlogList();
    
    document.getElementById('add-blog-btn').addEventListener('click', handleAddBlogButtonClick);
    document.getElementById('save-blog-btn').addEventListener('click', handleSaveBlogButtonClick);
    document.getElementById('close-blog-content-btn').addEventListener('click', handleCloseBlogContentButtonClick);
    
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('open-blog-btn')) {
            handleOpenBlogButtonClick(parseInt(event.target.dataset.index));
        } else if (event.target.classList.contains('edit-blog-btn')) {
            handleEditBlogButtonClick(parseInt(event.target.dataset.index));
        } else if (event.target.classList.contains('delete-blog-btn')) {
            handleDeleteBlogButtonClick(parseInt(event.target.dataset.index));
        }
    });
});
