// 当网页加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 保持导航栏固定，不随滚动变化
    const header = document.querySelector('header');
    header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    header.style.background = '#fff';
    
    // 检测元素是否在视口内，并添加动画
    window.addEventListener('scroll', function() {
        checkElementsInViewport();
    });
    
    // 检测元素是否在视口内并添加动画效果
    function checkElementsInViewport() {
        // 选择要监听的元素
        const elementsToAnimate = document.querySelectorAll('.business-text, .business-map, .project-card');
        
        elementsToAnimate.forEach(element => {
            // 检查元素是否在视口内
            const rect = element.getBoundingClientRect();
            const isInViewport = (
                rect.top <= (window.innerHeight * 0.9) && 
                rect.bottom >= 0
            );
            
            // 如果元素在视口内，添加可见类
            if (isInViewport) {
                // 对于全球业务部分，确保文字和地图同时出现，但有轻微的延迟差异
                if (element.classList.contains('business-text')) {
                    document.querySelector('.business-text').classList.add('visible');
                    // 延迟一点显示地图，制造顺序感
                    setTimeout(() => {
                        document.querySelector('.business-map').classList.add('visible');
                    }, 150);
                } else if (!element.classList.contains('business-map')) {
                    // 对于其他元素（非地图），正常添加可见类
                    element.classList.add('visible');
                }
            }
        });
    }
    
    // 页面加载后立即检查一次
    setTimeout(checkElementsInViewport, 100);

    // 处理Privacy Policy弹窗功能
    const privacyModal = document.getElementById('privacyModal');
    const privacyLink = document.getElementById('privacyPolicyLink');
    const closeModal = document.querySelector('.close-modal');
    
    if (privacyLink && privacyModal) {
        // 点击Privacy Policy链接时打开弹窗
        privacyLink.addEventListener('click', function(e) {
            e.preventDefault(); // 阻止默认链接行为
            privacyModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // 防止背景滚动
            
            // 在弹窗打开时添加ESC键关闭功能
            document.addEventListener('keydown', escKeyClose);
        });
        
        // 点击关闭按钮关闭弹窗
        if (closeModal) {
            closeModal.addEventListener('click', closePrivacyModal);
        }
        
        // 点击弹窗外部区域关闭弹窗
        privacyModal.addEventListener('click', function(e) {
            if (e.target === privacyModal) {
                closePrivacyModal();
            }
        });
    }
    
    // 关闭弹窗的函数
    function closePrivacyModal() {
        privacyModal.style.display = 'none';
        document.body.style.overflow = ''; // 恢复背景滚动
        
        // 移除ESC键关闭事件监听
        document.removeEventListener('keydown', escKeyClose);
    }
    
    // ESC键关闭弹窗
    function escKeyClose(e) {
        if (e.key === 'Escape' || e.keyCode === 27) {
            closePrivacyModal();
        }
    }

    // 为导航项添加动画效果
    const navItems = document.querySelectorAll('nav ul li a');
    navItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(10px)';
        item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        item.style.transitionDelay = `${0.1 + index * 0.05}s`;
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 100);
    });
    
    // 为导航项添加鼠标移动效果
    navItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const siblings = Array.from(document.querySelectorAll('nav ul li a')).filter(navItem => navItem !== item);
            siblings.forEach(sibling => {
                sibling.style.opacity = '0.7';
            });
        });
        
        item.addEventListener('mouseleave', function() {
            const siblings = Array.from(document.querySelectorAll('nav ul li a'));
            siblings.forEach(sibling => {
                sibling.style.opacity = '1';
            });
        });
    });

    // 为封面文字区域添加交互效果
    const heroText = document.querySelector('.hero-text');
    if (heroText) {
        // 等待初始动画完成后再添加鼠标移动效果
        setTimeout(() => {
            // 检测鼠标移动来创建微妙的视差效果
            document.addEventListener('mousemove', function(e) {
                if (window.innerWidth > 768) { // 仅在大屏幕上应用此效果
                    const moveX = (e.clientX - window.innerWidth / 2) * 0.005;
                    const moveY = (e.clientY - window.innerHeight / 2) * 0.005;
                    
                    // 使用CSS变量存储原始的transform值，然后添加鼠标移动效果
                    heroText.style.transform = `translateX(0) translateY(${moveY}px) translateX(${moveX}px)`;
                }
            });
            
            // 添加鼠标离开效果
            document.addEventListener('mouseleave', function() {
                if (window.innerWidth > 768) {
                    heroText.style.transform = 'translateX(0)';
                }
            });
        }, 1500); // 等待1.5秒，让初始动画完成
    }

    // 为导航项添加活动状态检测
    function setActiveNavItem() {
        // 获取当前页面URL路径
        const currentPath = window.location.pathname;
        const navItems = document.querySelectorAll('nav ul li a');
        
        // 遍历所有导航项，检查是否匹配当前URL
        navItems.forEach(item => {
            const href = item.getAttribute('href');
            // 检查当前页面是否为首页
            if (
                currentPath === '/' || 
                currentPath === '/index.html' || 
                currentPath.endsWith('/index.html')
            ) {
                // 首页情况
                if (href === 'index.html') {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            } else if (currentPath.includes(href) && href !== 'index.html') {
                // 其他页面的情况
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
    
    // 初始设置当前活动导航项
    setActiveNavItem();

    // 为小屏幕设备添加移动端导航菜单功能
    const mobileBreakpoint = 768; // 移动设备断点
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    
    // 添加移动菜单切换功能
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            document.body.classList.toggle('nav-open');
        });
    }

    function setupMobileNav() {
        if (window.innerWidth <= mobileBreakpoint) {
            const navList = document.querySelector('nav ul');
            const navItems = document.querySelectorAll('nav ul li a');
            
            // 为每个导航项添加点击事件，点击后关闭导航菜单
            navItems.forEach(item => {
                item.addEventListener('click', function() {
                    if (document.body.classList.contains('nav-open')) {
                        document.body.classList.remove('nav-open');
                    }
                });
            });
            
            // 点击页面其他区域关闭菜单
            document.addEventListener('click', function(event) {
                if (document.body.classList.contains('nav-open') && 
                    !event.target.closest('nav') && 
                    !event.target.closest('.mobile-menu-toggle')) {
                    document.body.classList.remove('nav-open');
                }
            });
        }
    }

    // 初始设置
    setupMobileNav();

    // 当窗口大小改变时重新设置
    window.addEventListener('resize', setupMobileNav);

    // 为项目卡片添加交互效果
    const projectCards = document.querySelectorAll('.project-card');
    
    if (projectCards.length > 0) {
        // 添加鼠标移动效果以创建微妙的视差
        projectCards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                if (window.innerWidth > 992) { // 仅在大屏幕上应用此效果
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left; // 鼠标在卡片内的X位置
                    const y = e.clientY - rect.top;  // 鼠标在卡片内的Y位置
                    
                    // 计算鼠标位置相对于卡片中心的偏移
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const deltaX = (x - centerX) / centerX;
                    const deltaY = (y - centerY) / centerY;
                    
                    // 根据鼠标位置应用微妙的倾斜效果
                    card.style.transform = `perspective(800px) rotateY(${deltaX * 3}deg) rotateX(${-deltaY * 3}deg) translateY(-8px)`;
                }
            });
            
            // 鼠标离开时恢复原状
            card.addEventListener('mouseleave', function() {
                card.style.transform = '';
                // 确保悬停效果在CSS中应用
                setTimeout(() => {
                    card.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                }, 100);
            });
        });
        
        // 确保在页面滚动时检查卡片是否在视口内
        window.addEventListener('scroll', function() {
            checkElementsInViewport();
        });
    }

    // 处理联系表单提交
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // 阻止表单默认提交行为
            
            // 获取表单数据
            const formData = new FormData(contactForm);
            const formValues = {};
            
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            // 在实际项目中，这里应该有AJAX请求发送数据到服务器
            console.log('Form data:', formValues);
            
            // 模拟表单提交成功
            showFormSuccess();
        });
        
        // 为输入字段添加焦点效果
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            // 添加输入动画
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
            
            // 如果已经有值，保持焦点样式
            if (input.value) {
                input.parentElement.classList.add('focused');
            }
        });
    }
    
    // 显示表单提交成功的消息
    function showFormSuccess() {
        const form = document.querySelector('.contact-form');
        
        // 创建成功消息元素
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success';
        successMessage.innerHTML = `
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3>Thank you for your message!</h3>
            <p>We will get back to you as soon as possible.</p>
        `;
        
        // 隐藏表单并显示成功消息
        form.style.opacity = '0';
        setTimeout(() => {
            form.style.display = 'none';
            form.parentElement.appendChild(successMessage);
            
            // 显示成功消息的动画
            setTimeout(() => {
                successMessage.style.opacity = '1';
                successMessage.style.transform = 'translateY(0)';
            }, 50);
        }, 300);
    }

    // 团队成员详情弹窗功能
    function setupTeamMemberDetails() {
        // 获取所有探索按钮和团队成员图片
        const exploreButtons = document.querySelectorAll('.explore-btn');
        const memberImages = document.querySelectorAll('.team-member .member-image img');
        
        // 为每个探索按钮添加点击事件
        exploreButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const memberId = this.getAttribute('data-member');
                showMemberDetail(memberId);
            });
        });
        
        // 为每个团队成员图片添加点击事件
        memberImages.forEach((img, index) => {
            // 只为前5位成员添加点击事件
            if (index < 5) {
                img.addEventListener('click', function() {
                    const memberId = index + 1;
                    showMemberDetail(memberId);
                });
            }
        });
        
        // 为所有关闭按钮添加点击事件
        const closeButtons = document.querySelectorAll('.detail-close');
        closeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const detailModal = this.closest('.member-detail');
                hideModal(detailModal);
            });
        });
        
        // 点击模态窗口外部区域关闭弹窗
        const detailModals = document.querySelectorAll('.member-detail');
        detailModals.forEach(modal => {
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    hideModal(this);
                }
            });
        });
        
        // 添加ESC键关闭模态窗口功能
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' || e.keyCode === 27) {
                const activeModal = document.querySelector('.member-detail.active');
                if (activeModal) {
                    hideModal(activeModal);
                }
            }
        });
        
        // 显示成员详情弹窗
        function showMemberDetail(memberId) {
            const detailModal = document.getElementById(`member-detail-${memberId}`);
            if (!detailModal) return;
            
            document.body.style.overflow = 'hidden'; // 防止背景滚动
            detailModal.classList.add('active');
            
            // 添加弹窗内容动画
            setTimeout(() => {
                const detailContainer = detailModal.querySelector('.detail-container');
                if (detailContainer) {
                    detailContainer.style.transform = 'translateY(0)';
                    detailContainer.style.opacity = '1';
                }
            }, 50);
        }
        
        // 隐藏模态窗口
        function hideModal(modal) {
            const detailContainer = modal.querySelector('.detail-container');
            if (detailContainer) {
                detailContainer.style.transform = 'translateY(30px)';
                detailContainer.style.opacity = '0';
            }
            
            // 延迟一点再完全隐藏模态窗口，让过渡动画有时间执行
            setTimeout(() => {
                modal.classList.remove('active');
                document.body.style.overflow = ''; // 恢复背景滚动
            }, 300);
        }
    }
    
    // 调用函数设置团队成员详情功能
    if (document.querySelector('.team-member')) {
        setupTeamMemberDetails();
    }
}); 