# 🎓 Career & Education Advisor - Sharing Guide

## 📱 Quick Access for Your Peers

### Option 1: Local Network (Same WiFi/LAN) - EASIEST
If your peers are on the same network (school/college WiFi, home network):

1. **Start the server on your computer:**
   ```bash
   node server.js
   ```

2. **Share this URL with your peers:**
   ```
   http://192.168.1.5:3000
   ```
   *(Replace with your actual IP shown when server starts)*

3. **Your peers can access it from:**
   - Mobile phones
   - Laptops
   - Tablets
   - Any device with a browser on the same network

### Option 2: Using ngrok (Access from Anywhere) 
Share with anyone in the world, even outside your network:

1. **Install ngrok:**
   - Download from: https://ngrok.com/download
   - Sign up for free account

2. **Start your local server:**
   ```bash
   node server.js
   ```

3. **In another terminal, run:**
   ```bash
   ngrok http 3000
   ```

4. **Share the public URL ngrok provides:**
   ```
   https://abc123.ngrok.io
   ```
   *(This URL works from anywhere in the world!)*

### Option 3: Deploy Online (Permanent & Free)

#### Deploy to Netlify (Easiest - No Server Needed)
1. **Go to:** https://app.netlify.com/drop
2. **Drag and drop the entire `career-advisor-prototype` folder**
3. **Get instant URL like:** `https://amazing-app-123.netlify.app`
4. **Share this URL with everyone!**

#### Deploy to Vercel
1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Follow prompts and get URL like:** `https://your-app.vercel.app`

#### Deploy to GitHub Pages
1. **Create GitHub repository**
2. **Push your code:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

3. **Enable GitHub Pages in repository settings**
4. **Access at:** `https://yourusername.github.io/repo-name`

### Option 4: Using Replit (Online IDE)
1. **Go to:** https://replit.com
2. **Create new Repl → HTML/CSS/JS**
3. **Upload all files**
4. **Click "Run"**
5. **Share the Replit URL**

## 🚀 Quick Start Commands

### For Local Network Sharing:
```bash
# Start server accessible to peers
node server.js

# Your peers can access at:
# http://YOUR_IP:3000
```

### Check Your IP Address:
```bash
# Windows
ipconfig

# Mac/Linux
ifconfig
```

## 📋 What Your Peers Need:
- ✅ Any modern web browser (Chrome, Firefox, Safari, Edge)
- ✅ Connected to same network (for local sharing)
- ✅ The URL you share with them
- ❌ No installation required
- ❌ No technical knowledge needed

## 🔧 Troubleshooting

### If peers can't access on local network:
1. **Check Windows Firewall:**
   - Open Windows Defender Firewall
   - Click "Allow an app"
   - Add Node.js

2. **Make sure you're using the network IP, not localhost:**
   - ❌ Wrong: `http://localhost:3000`
   - ✅ Right: `http://192.168.1.5:3000`

3. **Verify same network:**
   - Both devices must be on same WiFi/LAN

### For Mobile Access:
- Make sure mobile is on same WiFi (not mobile data)
- Type the URL carefully in browser
- Some phones may show security warning - it's safe to proceed

## 📱 Mobile-Specific Instructions

### For Android Users:
1. Open Chrome/Any Browser
2. Type: `http://192.168.1.5:3000`
3. Bookmark for easy access

### For iPhone/iPad Users:
1. Open Safari
2. Type: `http://192.168.1.5:3000`
3. Tap share icon → "Add to Home Screen" for app-like access

## 🌐 Best Practices for Sharing

### For Classroom/Lab Setting:
1. Deploy to Netlify/Vercel for permanent access
2. Create QR code of the URL
3. Display QR code on projector

### For Remote Peers:
1. Use ngrok for temporary sharing
2. Use Netlify/Vercel for permanent sharing
3. Share URL via WhatsApp/Email/Teams

## 📊 Features Available to Peers:
- ✅ Explore Courses by Stream
- ✅ Find Government Colleges
- ✅ Take Aptitude Test
- ✅ View Career Paths
- ✅ All data loads automatically
- ✅ Works on all devices

## 🔒 Security Note:
- Local network sharing is safe within trusted networks
- For public sharing, use Netlify/Vercel (they provide HTTPS)
- Don't share sensitive data through the app

## 💡 Pro Tips:
1. **Create a short URL:** Use bit.ly or tinyurl.com
2. **Make a QR Code:** Use qr-code-generator.com
3. **Test on your phone first** before sharing
4. **Keep server running** while peers are accessing

## 📞 Support:
If peers face issues, check:
1. Server is still running (don't close terminal)
2. They typed URL correctly
3. They're on correct network
4. Their browser is updated

---

## 🎯 Quick Reference Card for Peers:

### To Access the App:
```
1. Open your browser
2. Type: http://192.168.1.5:3000
3. Start exploring!

No download needed!
Works on any device!
```

Share this card with your peers! 📤
