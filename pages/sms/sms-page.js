document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initTabBubbles();
  initEmailPopup();
});

function initNav() {
  const nav = document.querySelector('.nav');
  
  if (!nav) return;

  const variants = {
    transparent: 'w-variant-8dbf5685-50a2-d70b-21e9-7b09f79abdaf',
    dark: 'w-variant-dae12fc3-677a-b6a7-29de-4353621ede38'
  };

  function updateNav() {
    if (window.scrollY === 0) {
      nav.classList.remove(variants.dark);
      nav.classList.add(variants.transparent);
    } else {
      nav.classList.remove(variants.transparent);
      nav.classList.add(variants.dark);
    }
  }

  updateNav();
  window.addEventListener('scroll', updateNav);
}

function initTabBubbles() {
  const tabLinks = document.querySelectorAll('.product-tabs_link');
  let floatTween = null;

  const floatBubble = (bubble) => {
    if (floatTween) floatTween.kill();

    floatTween = gsap.to(bubble, {
      y: "random(-8, 8)",
      x: "random(-5, 5)",
      duration: "random(2, 3)",
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      yoyoEase: "sine.inOut",
      onRepeat: function() {
        this.vars.y = gsap.utils.random(-8, 8);
        this.vars.x = gsap.utils.random(-5, 5);
        this.vars.duration = gsap.utils.random(2, 3);
      }
    });
  };

  const activateBubble = (index) => {
    gsap.to('.sms-tab_bubble', {
      opacity: 0,
      y: 10,
      duration: 0.2,
      ease: "power2.in"
    });

    setTimeout(() => {
      const activePane = document.querySelectorAll('.w-tab-pane')[index];
      const bubble = activePane?.querySelector('.sms-tab_bubble');
      
      if (bubble) {
        gsap.fromTo(bubble, 
          { opacity: 0, y: 15 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.5, 
            ease: "power2.out",
            onComplete: () => floatBubble(bubble)
          }
        );
      }
    }, 50);
  };

  tabLinks.forEach((link, index) => {
    link.addEventListener('click', () => activateBubble(index));
  });

  activateBubble(0);
}

function initEmailPopup() {
  const popup = document.querySelector('.sms_popup');
  const emailInput = document.getElementById('source-2');
  const submitBtn = document.getElementById('email-populate-2');
  
  if (!popup || !emailInput || !submitBtn) return;
  
  let capturedEmail = '';

  if (typeof hbspt !== 'undefined') {
    hbspt.forms.create({
      portalId: "241914077",
      formId: "35614b11-d348-463c-a2d5-0308cb51487e",
      region: "na2",
      target: ".bx_book-demo_form-wrap",
      onFormReady: function($form) {
        if (capturedEmail) {
          const hsEmailField = $form.find('input[name="email"]');
          if (hsEmailField.length) {
            hsEmailField.val(capturedEmail).trigger('change');
          }
        }
      },
      onFormSubmit: function($form) {
        const hsForm = $form.closest('.hbspt-form')[0];
        const successMsg = document.querySelector('.form-success-message');
        
        gsap.to(hsForm, {
          opacity: 0,
          y: -10,
          duration: 0.25,
          ease: "power2.in",
          onComplete: () => {
            hsForm.style.display = 'none';
            
            if (successMsg) {
              gsap.set(successMsg, { display: 'block', opacity: 0, y: 10 });
              gsap.to(successMsg, {
                opacity: 1,
                y: 0,
                duration: 0.35,
                ease: "power2.out"
              });
            }
          }
        });
      },
      onFormSubmitted: function($form) {
        if (typeof optibaseSendConversionEvent === 'function') {
          optibaseSendConversionEvent('sat_hubspot_form_submit');
        }
      }
    });
  }

  const openPopup = () => {
    capturedEmail = emailInput.value.trim();
    if (!capturedEmail) return;
    
    const hsEmailField = document.querySelector('.bx_book-demo_form-wrap input[name="email"]');
    if (hsEmailField) {
      hsEmailField.value = capturedEmail;
      hsEmailField.dispatchEvent(new Event('input', { bubbles: true }));
    }

    gsap.set(popup, { display: 'flex' });
    gsap.to(popup, {
      opacity: 1,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const closePopup = () => {
    gsap.to(popup, {
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        gsap.set(popup, { display: 'none' });
        
        const successMsg = document.querySelector('.form-success-message');
        const hsForm = document.querySelector('.bx_book-demo_form-wrap .hbspt-form');
        
        if (successMsg) {
          gsap.set(successMsg, { display: 'none', opacity: 0 });
        }
        if (hsForm) {
          gsap.set(hsForm, { display: 'block', opacity: 1, y: 0 });
        }
      }
    });
  };

  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openPopup();
  });

  emailInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      openPopup();
    }
  });

  popup.addEventListener('click', (e) => {
    const closeBtn = e.target.closest('.sms_close');
    if (closeBtn) {
      closePopup();
      return;
    }

    const formWrapper = document.querySelector('.sms_popup-form-wrapper');
    if (!formWrapper.contains(e.target)) {
      closePopup();
    }
  });
}
