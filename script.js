/* =========================
   🔹 ELEMENTS
========================= */
const menu = document.getElementById("mobileMenu");
const menuIcon = document.querySelector(".menu-icon");
const trackingInput = document.getElementById("trackingInput");
const errorMsg = document.getElementById("errorMsg");
const pageLoader = document.getElementById("pageLoader");

/* =========================
   ⏳ LOADER UTILITIES
========================= */
function showLoader() {
  if(pageLoader) {
    pageLoader.classList.remove("hide");
  }
}

function hideLoader() {
  if(pageLoader) {
    pageLoader.classList.add("hide");
  }
}

window.addEventListener('load', () => {
  setTimeout(() => {
    hideLoader();
  }, 400);
});

/* =========================
   📱 MOBILE MENU
========================= */
function toggleMenu(){
  menu.classList.toggle("active");
}

document.addEventListener("click", function(e){
  if(menu && menuIcon && !menu.contains(e.target) && !menuIcon.contains(e.target)){
    menu.classList.remove("active");
  }
});

document.querySelectorAll(".mobile-menu a, .mobile-menu button").forEach(item => {
  item.addEventListener("click", () => {
    menu.classList.remove("active");
  });
});

/* =========================
   🎯 FOCUS TRACKING
========================= */
function focusTracking(){
  if(trackingInput){
    trackingInput.scrollIntoView({ behavior: "smooth", block: "center" });
    trackingInput.focus();
  }
}

/* =========================
   📦 TRACK SHIPMENT
========================= */
function trackShipment(){
  if(!trackingInput || !errorMsg) return;

  const value = trackingInput.value.trim();
  errorMsg.textContent = "";

  if(!value){
    errorMsg.textContent = "Please enter a tracking number";
    return;
  }

  if(value === "XY987654321NG"){
    showLoader();
    setTimeout(() => {
      window.location.href = "shipment.html";
    }, 500);
  } else if(value === "EF123456789CA"){
    showLoader();
    setTimeout(() => {
      window.location.href = "shipment2.html";
    }, 500);
  } else if(value === "EF765432109US"){
    showLoader();
    setTimeout(() => {
      window.location.href = "shipment3.html";
    }, 500);
  } else {
    errorMsg.textContent = "Invalid tracking number. Please check and try again.";
  }
}

/* ENTER KEY */
if(trackingInput){
  trackingInput.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
      trackShipment();
    }
  });

  trackingInput.addEventListener("input", function(){
    errorMsg.textContent = "";
  });
}

/* =========================
   🔢 COUNTER ANIMATION
========================= */
function animateCounters(){
  const counters = document.querySelectorAll(".counter");

  counters.forEach(counter => {
    const target = +counter.getAttribute("data-target");
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime){
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const value = Math.floor(progress * target);

      counter.textContent = value;

      if(progress < 1){
        requestAnimationFrame(update);
      } else {
        if(target >= 1000){
          counter.textContent = (target / 1000).toFixed(0) + "k+";
        } else if(target === 99){
          counter.textContent = "99%";
        } else {
          counter.textContent = target + "+";
        }
      }
    }

    requestAnimationFrame(update);
  });
}

window.addEventListener("load", animateCounters);

/* =========================
   📊 LIVE STATS ANIMATION
========================= */
function animateStats() {
  const statsItems = document.querySelectorAll('.stats-item h3');

  statsItems.forEach((statElement, index) => {
    const targetValue = parseInt(statElement.textContent.replace(/[^\d]/g, ''));
    let currentValue = 0;
    const duration = 2000; // 2 seconds
    const increment = targetValue / (duration / 16); // 60fps

    const timer = setInterval(() => {
      currentValue += increment;
      if (currentValue >= targetValue) {
        currentValue = targetValue;
        clearInterval(timer);
      }

      // Format the number based on the index
      let displayValue;
      if (index === 0) { // Years
        displayValue = Math.floor(currentValue) + '+';
      } else if (index === 1) { // Clients
        displayValue = Math.floor(currentValue) + 'K+';
      } else { // Countries
        displayValue = Math.floor(currentValue);
      }

      statElement.textContent = displayValue;
    }, 16);
  });
}

// Trigger stats animation when about section comes into view
function initStatsAnimation() {
  const aboutSection = document.querySelector('#about');
  if (!aboutSection) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStats();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(aboutSection);
}

/* =========================
   ✨ SCROLL ANIMATION
========================= */

// Enhanced scroll animation observer
function initScrollAnimations() {
  const animateElements = document.querySelectorAll(
    '.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        // Optional: stop observing after animation
        // observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  animateElements.forEach(el => observer.observe(el));
}

// Fallback for older browsers
const fadeElements = document.querySelectorAll(".fade-in");

function revealOnScroll(){
  fadeElements.forEach(el => {
    const top = el.getBoundingClientRect().top;

    if(top < window.innerHeight - 80){
      el.classList.add("show");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
document.addEventListener("DOMContentLoaded", () => {
  initScrollAnimations();
  initStatsAnimation();
  revealOnScroll();
});

/* =========================
   🔘 BUTTON CLICK
========================= */
const btn = document.querySelector(".btn");

if(btn){
  btn.addEventListener("click", () => {
    alert("More services coming soon 🚀");
  });
}

// Show loader for internal page navigation
document.querySelectorAll('a').forEach(link => {
  const href = link.getAttribute('href');
  if (href && href.endsWith('.html')) {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      showLoader();
      setTimeout(() => {
        window.location.href = href;
      }, 250);
    });
  }
});

/* =========================
   🖱 SLIDER (DRAG + TOUCH)
========================= */
document.querySelectorAll('.slider').forEach(slider => {

  let isDown = false;
  let startX;
  let scrollLeft;

  // Mouse
  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener('mouseleave', () => isDown = false);
  slider.addEventListener('mouseup', () => isDown = false);

  slider.addEventListener('mousemove', (e) => {
    if(!isDown) return;
    e.preventDefault();

    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.5;

    slider.scrollLeft = scrollLeft - walk;
  });

  // Touch
  slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].pageX;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener('touchmove', (e) => {
    const x = e.touches[0].pageX;
    const walk = (x - startX) * 1.5;

    slider.scrollLeft = scrollLeft - walk;
  });

});

/* =========================
   🎠 CARD CAROUSEL
========================= */
let currentCardIndex = 0;
const cards = document.querySelectorAll(".cards .card");
const indicators = document.querySelectorAll(".indicator");
let carouselInterval;

function rotateCards() {
  if (cards.length === 0) return;

  // Remove active class from all cards and indicators
  cards.forEach(card => card.classList.remove("active"));
  indicators.forEach(ind => ind.classList.remove("active"));

  // Add active class to current card and indicator
  cards[currentCardIndex].classList.add("active");
  if (indicators[currentCardIndex]) {
    indicators[currentCardIndex].classList.add("active");
  }

  // Move to next card (loop back to 0 if at end)
  currentCardIndex = (currentCardIndex + 1) % cards.length;
}

function resetCarouselInterval() {
  clearInterval(carouselInterval);
  carouselInterval = setInterval(rotateCards, 5000);
}

function prevCard() {
  currentCardIndex = (currentCardIndex - 1 + cards.length) % cards.length;
  rotateCards();
  resetCarouselInterval();
}

function nextCard() {
  currentCardIndex = (currentCardIndex + 1) % cards.length;
  rotateCards();
  resetCarouselInterval();
}

function goToCard(index) {
  currentCardIndex = index;
  rotateCards();
  resetCarouselInterval();
}

// Start carousel rotation every 5 seconds
document.addEventListener('DOMContentLoaded', () => {
  if (cards.length > 0) {
    cards[0].classList.add("active");
    if (indicators[0]) {
      indicators[0].classList.add("active");
    }
  }
  carouselInterval = setInterval(rotateCards, 5000);
});

/* =========================
   � TESTIMONIALS CAROUSEL
========================= */
let currentTestimonialIndex = 0;
const testimonialCards = document.querySelectorAll(".testimonials-slider .testimonial-card");
const testimonialIndicators = document.querySelectorAll(".testimonials-indicators .indicator");
let testimonialInterval;

function rotateTestimonials() {
  if (testimonialCards.length === 0) return;

  // Remove active class from all testimonials and indicators
  testimonialCards.forEach(card => card.classList.remove("active"));
  testimonialIndicators.forEach(ind => ind.classList.remove("active"));

  // Add active class to current testimonial and indicator
  testimonialCards[currentTestimonialIndex].classList.add("active");
  if (testimonialIndicators[currentTestimonialIndex]) {
    testimonialIndicators[currentTestimonialIndex].classList.add("active");
  }

  // Move to next testimonial (loop back to 0 if at end)
  currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonialCards.length;
}

function resetTestimonialInterval() {
  clearInterval(testimonialInterval);
  testimonialInterval = setInterval(rotateTestimonials, 6000); // Slightly slower than services
}

function prevTestimonial() {
  currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonialCards.length) % testimonialCards.length;
  rotateTestimonials();
  resetTestimonialInterval();
}

function nextTestimonial() {
  currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonialCards.length;
  rotateTestimonials();
  resetTestimonialInterval();
}

function goToTestimonial(index) {
  currentTestimonialIndex = index;
  rotateTestimonials();
  resetTestimonialInterval();
}

// Initialize testimonials carousel
document.addEventListener('DOMContentLoaded', () => {
  if (testimonialCards.length > 0) {
    testimonialCards[0].classList.add("active");
    if (testimonialIndicators[0]) {
      testimonialIndicators[0].classList.add("active");
    }
  }
  testimonialInterval = setInterval(rotateTestimonials, 6000);
});

/* =========================
   �🚀 SERVICES DATA
========================= */
const services = {
  air: {
    title: "Air Freight",
    image: "images/service-air.jpeg",
    heading: "Efficient Air Freight Solutions",
    text: "We provide fast, secure and global air logistics with real-time tracking and priority handling.",
    badge: "Air Logistics"
  },
  ocean: {
    title: "Ocean Freight",
    image: "images/service-sea.jpeg",
    heading: "Global Ocean Freight",
    text: "Cost-effective international shipping with full container and bulk cargo support.",
    badge: "Sea Transport"
  },
  land: {
    title: "Land Freight",
    image: "images/service-road.jpeg",
    heading: "Reliable Road Transport",
    text: "Flexible and fast delivery using modern trucking across cities and borders.",
    badge: "Road Logistics"
  },
  train: {
    title: "Train Freight",
    image: "images/service-train.jpeg",
    heading: "Efficient Rail Logistics",
    text: "Eco-friendly and large-scale cargo movement through rail networks.",
    badge: "Rail Transport"
  },
  warehouse: {
    title: "Smart Warehouse",
    image: "images/service-warehouse.jpeg",
    heading: "Modern Storage Solutions",
    text: "Secure, automated warehousing with inventory tracking and distribution support.",
    badge: "Storage"
  }
};

/* =========================
   🔄 SWITCH SERVICE
========================= */
function switchService(type, btn, isUserClick = true){

  const content = document.getElementById("contentBox");
  const hero = document.getElementById("hero");
  const sidebar = document.querySelector(".sidebar");
  const item = services[type];

  if(!item) return;

  if(content){
    content.style.opacity = "0";
  }

  setTimeout(() => {

    document.getElementById("serviceTitle").innerText = item.title;
    document.getElementById("serviceImage").src = item.image;
    document.getElementById("serviceHeading").innerText = item.heading;
    document.getElementById("serviceText").innerText = item.text;
    document.getElementById("serviceBadge").innerText = item.badge;

    if(hero){
      hero.style.background = `
        var(--gradient-main),
        url('${item.image}') center/cover no-repeat
      `;
      hero.style.backgroundBlendMode = "overlay";
    }

    if(content){
      content.style.opacity = "1";
    }

  }, 180);

  document.querySelectorAll(".sidebar button").forEach(b => {
    b.classList.remove("active");
  });

  if(btn){
    btn.classList.add("active");
    
    // Only scroll to button on user click (not auto-switch)
    if(isUserClick && sidebar && window.innerWidth <= 900){
      setTimeout(() => {
        btn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }, 200);
    }
  }
}

/* =========================
   🔁 AUTO SWITCH SERVICES
========================= */
const serviceKeys = Object.keys(services);
let currentIndex = 0;
let autoInterval;

function startAutoSwitch(){
  autoInterval = setInterval(() => {

    currentIndex = (currentIndex + 1) % serviceKeys.length;

    const type = serviceKeys[currentIndex];
    const btns = document.querySelectorAll(".sidebar button");

    switchService(type, btns[currentIndex], false);

  }, 4000);
}

function stopAutoSwitch(){
  clearInterval(autoInterval);
}

document.querySelectorAll(".sidebar button").forEach((btn, index) => {
  btn.addEventListener("click", () => {
    currentIndex = index;
    stopAutoSwitch();
    startAutoSwitch();
  });
});

window.addEventListener("load", startAutoSwitch);

/* =========================
   🔗 QUICK LINKS MODAL
========================= */
document.addEventListener('DOMContentLoaded', function() {
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');
  const modalHeader = document.getElementById('modalHeader');
  const modalBody = document.getElementById('modalBody');
  const quickLinks = document.querySelectorAll('.quick-link');

  if (!modalOverlay || !modalClose || !modalHeader || !modalBody || quickLinks.length === 0) return;

  // Content for each quick link
  const linkContent = {
    'About Us': `
      <h3>World's Leading Contract Logistics Provider</h3>
      <p>Welcome to PrimeGates Logistics, a leading courier and logistics company with a reputation for excellence. We've been in business for over a decade, and we're committed to providing the highest quality service to all of our customers. From small businesses to large corporations, we have the expertise and resources to meet your every need. We are proud of our track record of success and are always looking for ways to improve our services.</p>
      <p>Our team of dedicated professionals is committed to delivering the highest quality service, and we're constantly innovating to meet the wide range of needs of our customers. We are proud to offer competitive rates and flexible options to meet the unique needs of our customers. Thank you for choosing us as your trusted logistics partner.</p>
      
      <h4 style="margin-top: 20px; color: var(--red);">Our Excellence</h4>
      <p><strong>23+</strong> Years Experience</p>
      <p><strong>18k</strong> Satisfied Clients</p>
      <p><strong>15k</strong> Completed Deliveries</p>
      <p>We have 3000+ IT solution advisors, trust score 4.7 (2,300 reviews).</p>
      
      <h4 style="margin-top: 20px; color: var(--red);">WHY WE STAND OUT</h4>
      <p><strong>Fast Business Growth & Success:</strong> With our fast and reliable courier services, we help your business grow effectively and efficiently. We understand that time is money, and we'll work hard to ensure your packages are delivered on time, every time.</p>
      <p><strong>Trusted Franchise:</strong> We have a proven track record of success, and our franchisees enjoy a high level of satisfaction.</p>
      <p><strong>Highly Recommended:</strong> We are highly recommended by our customers for our fast and reliable service.</p>
      
      <h4 style="margin-top: 20px; color: var(--red);">WHY WE ARE THE BEST</h4>
      <p>Choose Us to Protect Your Shipment. We Deliver Not Only Your Shipment But Also a Smile. Happy Clients with Trust Score 4.7/5 (Based on 2,300 reviews).</p>
    `,
    'FAQs': `
      <div class="faq-accordion">
        <div class="faq-item">
          <button class="faq-header" data-faq="how-we-work">
            <span class="faq-title">How Do We Work?</span>
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-content">
            <p>We are world class shipment and logistics company, we are into transportation of cargo and document across the globe. We have been rated as one of the best in logistics and shipment for the last five years now. We are also into warehousing. Our facilities are very massive and spacious to contain your cargo and parcels with maximum security both foreign and local.</p>
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-header" data-faq="services">
            <span class="faq-title">What Service Do We Offer?</span>
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-content">
            <p>Here at Global Gate Logistics, we are into Courier Services, Ocean Transportation, Air Transportation, Train Transportation, Road Transportation, Warehousing and consultancy. Each service is tailored to meet your specific logistics needs with maximum efficiency and reliability.</p>
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-header" data-faq="reliability">
            <span class="faq-title">How Reliable Are We?</span>
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-content">
            <p>We are 97% reliable and competent in delivering across the globe. Our services are simple, fast, and completely secure. We have been into logistics for many years now and our clients can attest to this. Our track record speaks for itself with thousands of successful deliveries every month.</p>
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-header" data-faq="payment">
            <span class="faq-title">Method of Payment?</span>
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-content">
            <p>We accept wired transfer to our company account or specified agent account, depending on your country and region. We support multiple payment methods including bank transfers, credit cards, and online payment platforms to make transactions convenient for you.</p>
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-header" data-faq="charges">
            <span class="faq-title">Any Extra Charges on Delivery?</span>
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-content">
            <p>On delivery to your doorstep, no additional charges are required. The price you're quoted is the final price you'll pay. We believe in transparent pricing with no hidden costs or surprise fees.</p>
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-header" data-faq="tracking">
            <span class="faq-title">How Your Package Tracking Done?</span>
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-content">
            <p>Our advanced real-time tracking system allows you to monitor your shipment every step of the way. Once your package is dispatched, you receive a unique tracking number and can access our online tracking portal 24/7 to view the exact location, status, and estimated delivery time of your package.</p>
            <p style="margin-top: 15px;">You can track your shipment through:</p>
            <p style="margin-top: 10px; padding-left: 20px;"><strong>• Online Portal:</strong> Visit our website and enter your tracking number to get real-time updates<br>
            <strong>• Mobile App:</strong> Download our mobile application for instant notifications and tracking on the go<br>
            <strong>• Email Updates:</strong> Receive automatic email notifications at each stage of your delivery<br>
            <strong>• SMS Alerts:</strong> Get instant SMS updates about your shipment status<br>
            <strong>• Customer Support:</strong> Call our support team for detailed information about your specific package</p>
            <p style="margin-top: 15px;">Our tracking system is integrated with GPS technology, ensuring accuracy and transparency throughout the entire delivery process. You'll know exactly where your package is at all times.</p>
          </div>
        </div>
      </div>
    `,
    'Privacy Policy': `
      <p>This Privacy Policy explains what Personal Information we collect, how we use and share that information, and your choices concerning our information practices. This Privacy Policy is incorporated into and forms part of our Terms of Service.</p>
      
      <h4 style="color: var(--red);">1. PERSONAL INFORMATION WE COLLECT</h4>
      <p>We collect information that alone or in combination with other information in our possession could be used to identify you ("Personal Information") as follows:</p>
      
      <p><strong>Personal Information You Provide:</strong> We collect categories of Personal Information from you when you sign up, register for an account, or contact us. This may include your name, email address, phone number, company name, and position at your company.</p>
      
      <p><strong>Financial Information:</strong> Our payment processors will collect the financial information necessary to process your payments, such as your payment card number and authentication details. We store only a tokenized version and do not maintain payment card information on our servers.</p>
      
      <p><strong>Internet Activity Information:</strong> When you visit and interact with our Service, we monitor page visits, peak hours, browser types, geographical information, and navigation patterns. Log Information includes your IP address, browser type, date and time of request, and how you interacted with our site.</p>
      
      <p><strong>Cookies:</strong> We use cookies to operate and administer our site, gather usage data, and improve your experience. Some cookies expire after a certain time, while others persist until a defined expiration date.</p>
      
      <p><strong>Analytics:</strong> We use Google Analytics to help analyze how users use our site. Google Analytics uses cookies to help us enhance your experience.</p>
      
      <h4 style="color: var(--red);">2. HOW WE USE PERSONAL INFORMATION</h4>
      <p>We use Personal Information for the following purposes:</p>
      <p>• To provide the Service and help deliver notifications across multiple channels<br>
      • To respond to your inquiries, comments, feedback, or questions<br>
      • To send administrative information regarding the Service and changes to our terms<br>
      • To analyze how you interact with our Service and provide and improve content and functionality<br>
      • To develop new products and services<br>
      • To administer and protect our business and prevent fraud<br>
      • To comply with legal obligations and legal process</p>
      
      <h4 style="color: var(--red);">3. SHARING AND DISCLOSURE OF PERSONAL INFORMATION</h4>
      <p>PrimeGates Logistics does not sell your Personal Information. We may share Personal Information with:</p>
      <p>• Vendors and Service Providers who assist us with business operations<br>
      • Business partners in case of mergers, acquisitions, or transactions<br>
      • When required by law or to protect rights and property<br>
      • Our affiliates and subsidiaries</p>
      
      <h4 style="color: var(--red);">4. DATA RETENTION</h4>
      <p>We keep Personal Data for as long as necessary for the purposes described in this Privacy Policy, while we have a legitimate business need, or as required by law.</p>
    `,
    'Refund Policy': `
      <p>At PrimeGates Logistics, we are committed to ensuring your satisfaction with every aspect of our services. If for any reason you are not completely satisfied with your shipment, we offer a straightforward refund and return policy.</p>
      
      <h4 style="color: var(--red);">REFUND POLICY</h4>
      <p><strong>1. Damaged or Lost Shipments:</strong> In the rare event that your shipment is damaged or lost during transit, we will provide a full refund or arrange for a replacement shipment at no additional cost to you. Please notify us within 24 hours of receiving your shipment.</p>
      
      <p><strong>2. Service Failures:</strong> If we fail to meet our service commitments, we will issue a refund for the affected portion of your shipping charges.</p>
      
      <h4 style="color: var(--red);">RETURN POLICY</h4>
      <p><strong>1. Product Returns:</strong> If you need to return a product, please contact our customer service team. We accept returns for unused and undamaged products within a specified period of delivery. You may be responsible for return shipping costs unless the return is due to our error.</p>
      
      <p><strong>2. Incorrect Shipments:</strong> If you receive an incorrect shipment, please notify us immediately. We will arrange for the return of the incorrect item and ship the correct item to you as soon as possible, at no additional cost.</p>
      
      <h4 style="color: var(--red);">CONDITIONS FOR REFUNDS AND RETURNS</h4>
      <p><strong>1. Proof of Purchase:</strong> You must provide proof of purchase, such as a receipt or order confirmation.</p>
      
      <p><strong>2. Original Packaging:</strong> Returned items must be in their original packaging and in the same condition as received.</p>
      
      <p><strong>3. Timely Notification:</strong> Please notify us of any issues as soon as possible.</p>
      
      <p><strong>4. Exclusions:</strong> Some items may be excluded from our refund and return policy due to safety regulations or other restrictions.</p>
      
      <p>At PrimeGates Logistics, your satisfaction is our top priority. If you have any questions about our refund and return policy, please contact us. Our customer service team is here to assist you.</p>
      
      <h4 style="color: var(--red);">CANCELLED BOOKINGS</h4>
      <p><strong>If the vehicle has not left our Operating Centre:</strong> A full refund will be processed.</p>
      
      <p><strong>If the vehicle has left the Operating Centre:</strong> A charge will be made commensurate with the time spent and distance travelled up to the point of cancellation.</p>
      
      <p><strong>If the vehicle attends the collection point:</strong> A charge will be made for time spent and distance travelled.</p>
      
      <p><strong>Once collection has been made:</strong> A charge will be made for time spent and distance travelled to return items.</p>
    `,
    'Terms & Conditions': `
      <h4 style="color: var(--red);">DEFINITIONS</h4>
      <p><strong>You:</strong> The customer who asks us to provide a delivery service, including any employee, agent or subcontractor acting on your behalf.</p>
      <p><strong>We/Us:</strong> PrimeGates Logistics.</p>
      <p><strong>Consignment:</strong> Any item or items we carry for you from one address to another, including any packaging.</p>
      <p><strong>Dangerous Goods:</strong> Anything that could put the health and safety of other people at risk, including explosives and radioactive material.</p>
      
      <h4 style="color: var(--red);">GENERAL POINTS</h4>
      <p>1. These are the terms under which we trade with you and they override any previous agreement between us. They cannot be changed or varied unless one of our directors agrees in writing.</p>
      
      <p>2. We are not a common carrier and reserve the right at our absolute discretion to subcontract any part of a delivery, refuse to accept any consignment, or refuse dangerous goods.</p>
      
      <p>3. When you ask us to make a delivery, you are deemed to have accepted these terms.</p>
      
      <p>4. Our liability to you is limited as explained below.</p>
      
      <p>5. English law governs this agreement between you and us.</p>
      
      <h4 style="color: var(--red);">OUR RIGHTS AND OBLIGATIONS</h4>
      <p><strong>Delivery Methods:</strong> We can use any method or route to deliver your consignment, including using subcontractors or agents. We will use reasonable endeavours to deliver within the time you request.</p>
      
      <p><strong>Proof of Delivery:</strong> We will take all reasonable steps to obtain proof of delivery, which will be conclusive evidence that the consignment was delivered complete and in good order unless marked otherwise.</p>
      
      <p><strong>Delivery Attempts:</strong> We will make one attempt to deliver. If unsuccessful, we will contact you to arrange either a second attempt, delivery to an alternative address, or return of the consignment.</p>
      
      <p><strong>Liability Limits:</strong> Up to £10,000 per vehicle for same day delivery, £100 per consignment for next day delivery, and £100 per consignment for international delivery.</p>
      
      <h4 style="color: var(--red);">LIABILITY EXCLUSIONS</h4>
      <p>We will not be liable for loss or damage caused by:</p>
      <p>• War, terrorism, riot, strike, lockout or similar actions<br>
      • Natural disasters such as floods or extreme weather<br>
      • Consignment seizure by public authorities<br>
      • Incorrect or insufficient address information<br>
      • Incorrect or insufficient packaging<br>
      • Natural wastage of perishable items<br>
      • Traffic congestion or delay<br>
      • Any other event beyond our control</p>
      
      <p>We cannot accept liability for: cash, notes, vouchers, credit cards, stamps, deeds, passports, jewellery, precious stones, watches, precious metals, works of art, antiques, or similar valuable articles.</p>
      
      <h4 style="color: var(--red);">YOUR RIGHTS AND OBLIGATIONS</h4>
      <p><strong>Your Responsibilities:</strong> You must ensure the goods are not dangerous, properly addressed, and correctly packaged. You must make insurance arrangements as needed and pay invoices in full within 30 days.</p>
      
      <p><strong>Claims:</strong> You must notify us in writing within 7 days of delivery for shortage or damage, and within 14 days for loss. We require written evidence to establish the value of loss or damage.</p>
      
      <p><strong>Payment Terms:</strong> You will pay invoices in full and without deduction within 30 days. Any queries must be raised within 21 days of invoice date.</p>
      
      <p><strong>Staff Engagement:</strong> If you engage any of our employees within 3 months of them leaving us, you will accept a charge equal to their last 3 months gross earnings.</p>
    `,
    'Disclaimer': `
      <p>The following are terms of a legal agreement between you and PrimeGates Logistics. By accessing, browsing and/or using this website, you acknowledge that you have read, understood, and agreed to be bound by these terms and to comply with all applicable laws and regulations.</p>
      
      <h4 style="color: var(--red);">WEBSITE INFORMATION DISCLAIMER</h4>
      <p>Information on this Website may contain technical inaccuracies or typographical errors. Information may be changed or updated without notice. PrimeGates Logistics may make improvements and/or changes in the products and services described at any time without notice.</p>
      
      <p>PrimeGates Logistics assumes no responsibility regarding the accuracy of the information provided, and use of such information is at the recipient's own risk.</p>
      
      <h4 style="color: var(--red);">INTELLECTUAL PROPERTY</h4>
      <p>This Website may contain other proprietary notices and copyright information, the terms of which must be observed and followed. By furnishing information, PrimeGates Logistics does not grant any licenses to any copyrights, patents, or any other intellectual property rights.</p>
      
      <h4 style="color: var(--red);">CONFIDENTIAL INFORMATION</h4>
      <p>PrimeGates Logistics does not want to receive confidential or proprietary information through our Website. Any information sent to us will be deemed NOT to be confidential. However, we will not release your name or publicize the fact that you submitted materials to us unless: (a) we obtain your permission; (b) we notify you that the materials will be published with your name; or (c) we are required to do so by law.</p>
      
      <h4 style="color: var(--red);">LIMITATION OF LIABILITY</h4>
      <p>PrimeGates Logistics provides its services on an "as-is" and "as-available" basis. We make no representations or warranties, express or implied, regarding the accuracy, completeness, or reliability of any information provided through our services.</p>
      
      <p>In no event shall PrimeGates Logistics be liable for any indirect, incidental, special, or consequential damages arising from your use of our services, even if we have been advised of the possibility of such damages.</p>
      
      <h4 style="color: var(--red);">EXTERNAL LINKS</h4>
      <p>Our website may contain links to third-party websites. We are not responsible for the content, accuracy, or practices of these external sites.</p>
      
      <h4 style="color: var(--red);">INDEMNIFICATION</h4>
      <p>You agree to indemnify and hold harmless PrimeGates Logistics from any claims, damages, or losses arising from your use of our services or violation of these terms.</p>
      
      <h4 style="color: var(--red);">CHANGES TO SERVICES</h4>
      <p>We reserve the right to modify or discontinue our services at any time without notice or liability to you. If you do not agree to these terms, do not use this website.</p>
    `
  };

  // Open modal when quick link is clicked
  quickLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const linkName = this.getAttribute('data-link');
      modalHeader.textContent = linkName;
      modalBody.innerHTML = linkContent[linkName] || '<p>Content not available.</p>';
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      // Initialize FAQ accordion if FAQs
      if (linkName === 'FAQs') {
        setTimeout(() => initializeFAQAccordion(), 0);
      }
    });
  });

  // Close modal
  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', function(e) {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) closeModal();
  });

  // FAQ Accordion
  function initializeFAQAccordion() {
    const faqHeaders = document.querySelectorAll('.faq-header');
    faqHeaders.forEach(header => {
      header.addEventListener('click', function() {
        const faqItem = this.closest('.faq-item');
        const faqContent = faqItem.querySelector('.faq-content');
        const faqIcon = this.querySelector('.faq-icon');
        
        document.querySelectorAll('.faq-item').forEach(item => {
          if (item !== faqItem && item.classList.contains('active')) {
            item.classList.remove('active');
            item.querySelector('.faq-content').style.maxHeight = '0px';
            item.querySelector('.faq-icon').textContent = '+';
          }
        });
        
        faqItem.classList.toggle('active');
        if (faqItem.classList.contains('active')) {
          // Temporarily set to a large value to measure the content
          faqContent.style.maxHeight = '1000px';
          // Measure after browser reflow
          setTimeout(() => {
            const scrollHeight = faqContent.scrollHeight;
            faqContent.style.maxHeight = scrollHeight + 'px';
          }, 0);
          faqIcon.textContent = '−';
        } else {
          faqContent.style.maxHeight = '0px';
          faqIcon.textContent = '+';
        }
      });
    });
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});
