# Adaptive Webflow Scripts

External script hosting for Adaptive Security's Webflow site.

## Usage

**Head code:**
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/jakeschlegel/webflow-scripts@main/pages/sms/sms-page.css">
```

**Footer code:**
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script charset="utf-8" type="text/javascript" src="//js-na2.hsforms.net/forms/embed/v2.js"></script>
<script src="https://cdn.jsdelivr.net/gh/jakeschlegel/webflow-scripts@main/pages/sms/sms-page.js"></script>
```

## Cache Busting

Purge jsDelivr cache:
```
https://purge.jsdelivr.net/gh/jakeschlegel/webflow-scripts@main/pages/sms/sms-page.js
```
