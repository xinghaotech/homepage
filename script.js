// 移动端导航菜单切换
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// 点击导航链接后关闭菜单
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// 导航栏滚动效果
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    }
    
    lastScroll = currentScroll;
});

// 导航高亮效果
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// 案例筛选功能
const caseFilters = document.querySelectorAll('.case-filters .filter-btn');
const caseCards = document.querySelectorAll('.case-card');

caseFilters.forEach(filter => {
    filter.addEventListener('click', () => {
        // 移除所有active类
        caseFilters.forEach(btn => btn.classList.remove('active'));
        // 添加active类到当前按钮
        filter.classList.add('active');
        
        const filterValue = filter.getAttribute('data-filter');
        
        caseCards.forEach(card => {
            if (filterValue === 'all') {
                card.style.display = 'block';
                card.classList.add('fade-in');
            } else {
                const categories = card.getAttribute('data-category').split(' ');
                if (categories.includes(filterValue)) {
                    card.style.display = 'block';
                    card.classList.add('fade-in');
                } else {
                    card.style.display = 'none';
                }
            }
        });
    });
});

// 博客筛选功能
const blogFilters = document.querySelectorAll('.blog-filters .filter-btn');
const blogCards = document.querySelectorAll('.blog-card');

blogFilters.forEach(filter => {
    filter.addEventListener('click', () => {
        blogFilters.forEach(btn => btn.classList.remove('active'));
        filter.classList.add('active');
        
        const filterValue = filter.getAttribute('data-filter');
        
        blogCards.forEach(card => {
            if (filterValue === 'all') {
                card.style.display = 'block';
                card.classList.add('fade-in');
            } else {
                const category = card.getAttribute('data-category');
                if (category === filterValue) {
                    card.style.display = 'block';
                    card.classList.add('fade-in');
                } else {
                    card.style.display = 'none';
                }
            }
        });
    });
});

// 表单提交处理
const consultForm = document.getElementById('consultForm');

consultForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // 获取表单数据
    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value
    };
    
    // 这里可以添加实际的表单提交逻辑，例如发送到后端API
    console.log('表单数据:', formData);
    
    // 显示成功消息
    alert('感谢您的咨询！我们会尽快与您联系。');
    
    // 重置表单
    consultForm.reset();
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 60;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// 滚动动画
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// 观察所有需要动画的元素
document.querySelectorAll('.service-card, .case-card, .blog-card, .about-intro, .about-education, .about-experience').forEach(el => {
    observer.observe(el);
});

// 添加页面加载完成后的动画
window.addEventListener('load', () => {
    document.querySelector('.hero-content').classList.add('fade-in');
});

// 返回顶部按钮（可选功能）
const createBackToTop = () => {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #2563eb;
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s, transform 0.3s;
        z-index: 1000;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    `;
    
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.style.opacity = '1';
        } else {
            backToTop.style.opacity = '0';
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    backToTop.addEventListener('mouseenter', () => {
        backToTop.style.transform = 'scale(1.1)';
    });
    
    backToTop.addEventListener('mouseleave', () => {
        backToTop.style.transform = 'scale(1)';
    });
};

createBackToTop();
