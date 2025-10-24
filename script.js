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
    
    // 滚动时添加阴影
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
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

// 滚动动画 - 增强版
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // 添加延迟效果，让元素逐个出现
            setTimeout(() => {
                entry.target.classList.add('fade-in');
                entry.target.style.opacity = '1';
            }, index * 100);
        }
    });
}, observerOptions);

// 观察所有需要动画的元素
const animatedElements = document.querySelectorAll('.service-card, .case-card, .blog-card, .about-intro, .about-education, .about-experience, .timeline-point, .step');
animatedElements.forEach(el => {
    el.style.opacity = '0';
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
    backToTop.setAttribute('aria-label', '返回顶部');
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 55px;
        height: 55px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    `;
    
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    backToTop.addEventListener('mouseenter', () => {
        backToTop.style.transform = 'scale(1.1) translateY(-3px)';
        backToTop.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.5)';
    });
    
    backToTop.addEventListener('mouseleave', () => {
        backToTop.style.transform = 'scale(1) translateY(0)';
        backToTop.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
    });
};

createBackToTop();

// 数字滚动动画效果
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// 为数字添加动画（如果页面中有数字统计）
const numberElements = document.querySelectorAll('[data-count]');
if (numberElements.length > 0) {
    const numberObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                animateCounter(entry.target, target);
                entry.target.classList.add('counted');
            }
        });
    }, { threshold: 0.5 });
    
    numberElements.forEach(el => numberObserver.observe(el));
}

// 加载二维码图片
function loadQRCodes() {
    const qrCodes = [
        { id: 'wechat-qr', src: 'wechat-qr.png', alt: '微信二维码' },
        { id: 'work-qr', src: 'work-qr.png', alt: '企业微信二维码' }
    ];
    
    qrCodes.forEach(qr => {
        const container = document.getElementById(qr.id);
        if (container) {
            const img = new Image();
            img.src = qr.src;
            img.alt = qr.alt;
            
            img.onload = function() {
                // 图片加载成功，替换占位符内容
                container.innerHTML = '';
                container.appendChild(img);
                container.style.background = 'white';
            };
            
            img.onerror = function() {
                // 图片加载失败，保持占位符显示
                console.log(`未找到${qr.alt}图片: ${qr.src}`);
            };
        }
    });
}

// 页面加载完成后加载二维码
window.addEventListener('load', () => {
    loadQRCodes();
});
