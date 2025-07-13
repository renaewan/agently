// Design Animation Controller - Advanced text-to-design transformations
// Uses anime.js for smooth, professional animations

class DesignAnimationController {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.isActive = false;
    this.currentDesignIndex = 0;
    this.morphingComponent = null;
    
    // Design configurations for morphing
    this.designs = [
      {
        type: 'hero',
        prompt: 'Create a landing page hero section',
        width: 500,
        height: 300,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        elements: [
          { type: 'nav', content: 'Home | About | Services | Contact', style: 'nav-bar' },
          { type: 'title', content: 'Welcome to Our Platform', style: 'hero-title' },
          { type: 'subtitle', content: 'Transform your ideas into reality', style: 'hero-subtitle' },
          { type: 'button', content: 'Get Started', style: 'cta-button' }
        ]
      },
      {
        type: 'dashboard',
        prompt: 'Design a analytics dashboard',
        width: 600,
        height: 400,
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        elements: [
          { type: 'header', content: 'Analytics Dashboard', style: 'dashboard-header' },
          { type: 'metric', content: '12,543', style: 'metric-large' },
          { type: 'label', content: 'Total Users', style: 'metric-label' },
          { type: 'chart', content: '📊', style: 'chart-visualization' },
          { type: 'metric-row', content: '↗ 23% increase', style: 'metric-growth' }
        ]
      },
      {
        type: 'ecommerce',
        prompt: 'Build a product showcase',
        width: 450,
        height: 350,
        background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        elements: [
          { type: 'product-image', content: '🖼️', style: 'product-image' },
          { type: 'product-title', content: 'Premium Headphones', style: 'product-title' },
          { type: 'price', content: '$299.99', style: 'product-price' },
          { type: 'rating', content: '⭐⭐⭐⭐⭐', style: 'product-rating' },
          { type: 'button', content: 'Add to Cart', style: 'add-to-cart-btn' }
        ]
      },
      {
        type: 'portfolio',
        prompt: 'Create a portfolio gallery',
        width: 550,
        height: 380,
        background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        elements: [
          { type: 'gallery-header', content: 'My Portfolio', style: 'portfolio-header' },
          { type: 'gallery-grid', content: '🎨 🖼️ 📱', style: 'gallery-items' },
          { type: 'project-title', content: 'Web Design Projects', style: 'project-title' },
          { type: 'view-more', content: 'View All Projects', style: 'view-more-link' }
        ]
      },
      {
        type: 'contact',
        prompt: 'Design a contact form',
        width: 400,
        height: 320,
        background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        elements: [
          { type: 'form-header', content: 'Get In Touch', style: 'form-header' },
          { type: 'input', content: 'Your Name', style: 'form-input' },
          { type: 'input', content: 'Email Address', style: 'form-input' },
          { type: 'textarea', content: 'Your Message', style: 'form-textarea' },
          { type: 'submit', content: 'Send Message', style: 'form-submit' }
        ]
      }
    ];
    
    this.prompts = this.designs.map(design => design.prompt);
  }

  createMorphingComponent() {
    if (this.morphingComponent) {
      this.morphingComponent.remove();
    }

    const component = document.createElement('div');
    component.className = 'morphing-component';
    component.style.cssText = `
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) scale(0.8);
      background: white;
      border-radius: 12px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
      overflow: hidden;
      opacity: 0;
      transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 10;
      pointer-events: auto;
    `;

    this.container.appendChild(component);
    this.morphingComponent = component;
    return component;
  }

  async morphToDesign(designIndex) {
    const design = this.designs[designIndex];
    const component = this.morphingComponent;

    // Phase 1: Shrink and fade current content
    if (component.children.length > 0) {
      if (window.anime) {
        anime({
          targets: component.children,
          scale: 0,
          opacity: 0,
          duration: 300,
          easing: 'easeInQuad',
          complete: () => {
            component.innerHTML = '';
          }
        });
      } else {
        Array.from(component.children).forEach(child => {
          child.style.transform = 'scale(0)';
          child.style.opacity = '0';
        });
        setTimeout(() => component.innerHTML = '', 300);
      }
    }

    // Phase 2: Morph container size and background
    await new Promise(resolve => {
      setTimeout(() => {
        component.style.width = design.width + 'px';
        component.style.height = design.height + 'px';
        component.style.background = design.background;
        component.style.transform = 'translate(-50%, -50%) scale(1)';
        resolve();
      }, 150);
    });

    // Phase 3: Create new content
    await new Promise(resolve => {
      setTimeout(() => {
        this.createDesignElements(component, design);
        resolve();
      }, 300);
    });

    // Phase 4: Animate new content in
    this.animateElementsIn(component);
  }

  createDesignElements(container, design) {
    const elementStyles = {
      'nav-bar': 'padding: 8px 0; text-align: center; font-size: 12px; color: rgba(255,255,255,0.9); border-bottom: 1px solid rgba(255,255,255,0.2);',
      'hero-title': 'font-size: 28px; font-weight: bold; color: white; text-align: center; margin: 20px 0 10px;',
      'hero-subtitle': 'font-size: 16px; color: rgba(255,255,255,0.8); text-align: center; margin-bottom: 25px;',
      'cta-button': 'background: white; color: #333; padding: 12px 24px; border-radius: 6px; font-weight: bold; margin: 0 auto; display: block; text-align: center; max-width: 120px;',
      'dashboard-header': 'font-size: 24px; font-weight: bold; color: white; text-align: center; margin: 15px 0;',
      'metric-large': 'font-size: 36px; font-weight: bold; color: white; text-align: center; margin: 10px 0;',
      'metric-label': 'font-size: 14px; color: rgba(255,255,255,0.8); text-align: center; margin-bottom: 20px;',
      'chart-visualization': 'font-size: 48px; text-align: center; margin: 15px 0;',
      'metric-growth': 'font-size: 14px; color: #4ade80; text-align: center; font-weight: bold;',
      'product-image': 'font-size: 80px; text-align: center; margin: 20px 0;',
      'product-title': 'font-size: 20px; font-weight: bold; color: white; text-align: center; margin: 10px 0;',
      'product-price': 'font-size: 24px; font-weight: bold; color: #fbbf24; text-align: center; margin: 8px 0;',
      'product-rating': 'font-size: 18px; text-align: center; margin: 8px 0;',
      'add-to-cart-btn': 'background: white; color: #333; padding: 10px 20px; border-radius: 6px; font-weight: bold; margin: 15px auto 0; display: block; text-align: center; max-width: 100px;',
      'portfolio-header': 'font-size: 24px; font-weight: bold; color: white; text-align: center; margin: 20px 0;',
      'gallery-items': 'font-size: 40px; text-align: center; margin: 25px 0; letter-spacing: 20px;',
      'project-title': 'font-size: 16px; color: rgba(255,255,255,0.9); text-align: center; margin: 15px 0;',
      'view-more-link': 'color: white; text-decoration: underline; text-align: center; font-size: 14px; margin-top: 20px;',
      'form-header': 'font-size: 22px; font-weight: bold; color: #333; text-align: center; margin: 20px 0;',
      'form-input': 'background: rgba(255,255,255,0.9); border: 1px solid #ddd; padding: 8px 12px; margin: 8px 20px; border-radius: 4px; font-size: 14px;',
      'form-textarea': 'background: rgba(255,255,255,0.9); border: 1px solid #ddd; padding: 8px 12px; margin: 8px 20px; border-radius: 4px; font-size: 14px; height: 60px; resize: none;',
      'form-submit': 'background: #3b82f6; color: white; padding: 10px 24px; border-radius: 6px; font-weight: bold; margin: 15px auto 0; display: block; border: none; cursor: pointer;'
    };

    design.elements.forEach((element, index) => {
      const el = document.createElement(element.type.includes('input') || element.type.includes('textarea') ? 
        (element.type.includes('textarea') ? 'textarea' : 'input') : 'div');
      
      if (element.type.includes('input')) {
        el.placeholder = element.content;
        el.type = 'text';
      } else if (element.type.includes('textarea')) {
        el.placeholder = element.content;
      } else {
        el.textContent = element.content;
      }
      
      el.style.cssText = elementStyles[element.style] || 'padding: 8px; text-align: center;';
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px) scale(0.8)';
      
      container.appendChild(el);
    });
  }

  animateElementsIn(container) {
    const elements = Array.from(container.children);
    
    if (window.anime) {
      anime({
        targets: elements,
        opacity: 1,
        translateY: 0,
        scale: 1,
        duration: 600,
        delay: anime.stagger(100),
        easing: 'easeOutBack'
      });
    } else {
      elements.forEach((el, index) => {
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0) scale(1)';
          el.style.transition = 'all 0.6s ease-out';
        }, index * 100);
      });
    }
  }

  async showInitialPreview() {
    const sparkle = document.createElement('div');
    sparkle.textContent = '✨';
    sparkle.style.cssText = `
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-size: 48px;
      opacity: 0;
      z-index: 5;
    `;
    
    this.container.appendChild(sparkle);
    
    if (window.anime) {
      anime({
        targets: sparkle,
        opacity: [0, 1, 0],
        scale: [0.5, 1.2, 0.8],
        duration: 2000,
        easing: 'easeInOutQuad',
        complete: () => sparkle.remove()
      });
    } else {
      sparkle.style.opacity = '1';
      sparkle.style.transform = 'translate(-50%, -50%) scale(1.2)';
      setTimeout(() => sparkle.remove(), 2000);
    }
    
    return new Promise(resolve => setTimeout(resolve, 1000));
  }

  async startAnimation() {
    console.log('DesignAnimationController.startAnimation called');
    if (this.isActive) return;
    this.isActive = true;
    
    console.log('Showing initial preview...');
    await this.showInitialPreview();
    
    console.log('Creating morphing component...');
    this.createMorphingComponent();
    
    // Show the component
    setTimeout(() => {
      console.log('Making component visible...');
      this.morphingComponent.style.opacity = '1';
      this.morphingComponent.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 100);
    
    // Start with first design
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('Morphing to first design...');
    await this.morphToDesign(0);
    this.currentDesignIndex = 0;
  }

  async nextDesign() {
    if (!this.isActive || !this.morphingComponent) return;
    
    this.currentDesignIndex = (this.currentDesignIndex + 1) % this.designs.length;
    await this.morphToDesign(this.currentDesignIndex);
  }

  stopAnimation() {
    this.isActive = false;
    if (this.morphingComponent) {
      if (window.anime) {
        anime({
          targets: this.morphingComponent,
          opacity: 0,
          scale: 0.8,
          duration: 400,
          easing: 'easeInQuad',
          complete: () => {
            if (this.morphingComponent) {
              this.morphingComponent.remove();
              this.morphingComponent = null;
            }
          }
        });
      } else {
        this.morphingComponent.style.opacity = '0';
        this.morphingComponent.style.transform = 'translate(-50%, -50%) scale(0.8)';
        setTimeout(() => {
          if (this.morphingComponent) {
            this.morphingComponent.remove();
            this.morphingComponent = null;
          }
        }, 400);
      }
    }
  }

  getCurrentPrompt() {
    return this.prompts[this.currentDesignIndex] || this.prompts[0];
  }
}

// Animation controller will be initialized by the main HTML file 