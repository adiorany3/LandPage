# Vercel Speed Insights Setup

This document describes how Vercel Speed Insights has been integrated into this landing page project.

## Overview

Vercel Speed Insights is a web performance monitoring tool that helps you understand how your website performs in real-world conditions. It measures Core Web Vitals (CWV) and other important performance metrics from actual user visits.

## Implementation Details

### What Was Added

For this vanilla HTML/CSS/JavaScript landing page, Vercel Speed Insights was integrated using the HTML implementation method. Two scripts were added to the `index.html` file before the closing `</body>` tag:

```html
<!-- Vercel Speed Insights -->
<script>
  window.si = window.si || function () { (window.siq = window.siq || []).push(arguments); };
</script>
<script defer src="/_vercel/speed-insights/script.js"></script>
```

### How It Works

1. **Queue Function**: The first script creates a queue function (`window.si`) that collects Speed Insights commands before the main tracking script loads. This ensures commands aren't lost even if the script hasn't loaded yet.

2. **Tracking Script**: The second script (`/_vercel/speed-insights/script.js`) is loaded asynchronously with the `defer` attribute. This route is automatically created by Vercel when Speed Insights is enabled.

### Prerequisites

To use Speed Insights with this project:

1. **Vercel Account**: You need a Vercel account. [Sign up for free](https://vercel.com/signup) if you don't have one.

2. **Project on Vercel**: The project must be deployed to Vercel.

3. **Enable Speed Insights**: 
   - Go to your [Vercel Dashboard](https://vercel.com/dashboard)
   - Select your project
   - Click the **Speed Insights** tab
   - Click **Enable** to activate Speed Insights

### Next Deployment

Speed Insights will automatically be available after your next deployment to Vercel. The tracking script is served from the `/_vercel/speed-insights/` route, which is automatically configured.

> **Note**: Enabling Speed Insights adds new routes (scoped at `/_vercel/speed-insights/*`) after your next deployment.

## Viewing Your Data

Once deployed and after you have visitors to your site, you can view the performance metrics:

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Click the **Speed Insights** tab

After a few days of visitor traffic, you'll be able to see:
- Core Web Vitals (Largest Contentful Paint, First Input Delay, Cumulative Layout Shift)
- Performance metrics over time
- Real user monitoring (RUM) data
- Performance insights and recommendations

## Verification

To verify that Speed Insights is properly integrated:

1. Open the browser's Developer Tools (F12 or Cmd+Option+I)
2. Go to the Network tab
3. Look for `/_vercel/speed-insights/script.js` in the network requests
4. The script should load with a 200 status code

You should also see console messages indicating that Speed Insights is collecting data.

## Metrics Tracked

Vercel Speed Insights tracks:

- **Largest Contentful Paint (LCP)**: How quickly the largest visual element loads (target: < 2.5s)
- **First Input Delay (FID)**: How responsive the page is to user input (target: < 100ms)
- **Cumulative Layout Shift (CLS)**: How much the layout shifts unexpectedly (target: < 0.1)
- **First Contentful Paint (FCP)**: How quickly the first content paints
- **Navigation Timing**: Page load and rendering performance metrics

## Additional Configuration

For more advanced features, you can configure Speed Insights by modifying the `window.si` function. See the [Speed Insights documentation](https://vercel.com/docs/speed-insights/package) for advanced options like `beforeSend` callbacks.

## Resources

- [Vercel Speed Insights Documentation](https://vercel.com/docs/speed-insights)
- [Using Speed Insights Guide](https://vercel.com/docs/speed-insights/using-speed-insights)
- [Speed Insights Package Reference](https://vercel.com/docs/speed-insights/package)
- [Privacy and Compliance](https://vercel.com/docs/speed-insights/privacy-policy)
- [Troubleshooting Guide](https://vercel.com/docs/speed-insights/troubleshooting)

## Privacy Considerations

Speed Insights collects real user monitoring (RUM) data from your visitors. By default, it respects user privacy by:

- Not collecting personally identifiable information (PII)
- Respecting Do Not Track (DNT) signals
- Following GDPR and CCPA regulations

For more details, see the [Speed Insights Privacy and Compliance documentation](https://vercel.com/docs/speed-insights/privacy-policy).
