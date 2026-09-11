# Haxovelo // Need for Speed Heat Car Garage & Community Hub

Official companion website for **Haxovelo** ([@HaxoveloOfficial](https://www.youtube.com/@HaxoveloOfficial)). Built with **Angular 19**, **TypeScript**, and **Tailwind CSS**.

---

## ⚡ Key Features

1. **Palm City 400+ Car Database**:
   - Filter by **Meta King**, **Race & Grip**, **Mountain Drift**, and **Off-Road Rally**.
   - Instant search by car model, brand, or engine swap.
   - Comprehensive telemetry: 0-60 MPH, Top Speed, 1/4 Mile, Horsepower, Torque.
   - Complete parts blueprint: Engine swap, forced induction, suspension, tires, and auxiliary parts.
   - In-game Live Tuning slider guides (Steering Sensitivity, Downforce, Traction Control, Drift Style).
   - Direct button links to watch build showcases on [@HaxoveloOfficial](https://www.youtube.com/@HaxoveloOfficial).

2. **Two-Way Community Messaging & Creator Reply Hub**:
   - Viewers can submit car build requests, tuning questions, and Heat 5 escape advice queries.
   - **Creator Reply Mode**: Click the **Creator Login** button in the header and enter your passkey (Default: `heat400`) to unlock in-app replies.
   - Reply directly to viewers under their questions, pin top questions, and manage messages.
   - All answered questions appear on the public Q&A wall with the official **Haxovelo Creator Reply** badge.

---

## 🏎️ How Your Database Works

### 1. Car Database on GitHub (`public/data/cars.json`)
The entire car garage is stored as a clean, human-readable JSON file right in your GitHub repository:
👉 `public/data/cars.json`

To add a new car, simply open that file on GitHub or in your editor and copy-paste an existing car entry with your new build specs. Once pushed, the site updates automatically!

### 2. Live Community Messages
Messages and replies are stored with local persistence by default. If you want a real-time cloud PostgreSQL database for mobile access:
- Sign up for a free project at [Supabase](https://supabase.com).
- Supabase gives you a free database and a web spreadsheet table editor on your phone/PC to view and reply to messages anywhere.

---

## 🚀 How to Run Locally

1. Open PowerShell or Terminal in this folder:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm start
   ```
3. Open your browser at `http://localhost:4200` to view the website.

---

## 📦 How to Deploy

### Option A: Deploy to Vercel (Recommended - 1 Click)
1. Push this project to your GitHub account (see instructions below).
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Set Build Command: `npm run build` and Output Directory: `dist/nfs-heat-garage/browser`.
5. Click **Deploy**!

### Option B: Deploy to GitHub Pages
1. Push this repository to GitHub.
2. In your GitHub repo, go to **Settings > Pages**.
3. Under **Source**, select **GitHub Actions**.
4. The included workflow `.github/workflows/deploy.yml` will automatically build and deploy your site on every push!

### Option C: Deploy to Netlify
- Drag and drop the `dist/nfs-heat-garage/browser` folder into [Netlify Drop](https://app.netlify.com/drop), or connect your GitHub repo using the included `netlify.toml`.

---

## 📤 Push to Your GitHub Repository

Run these commands in PowerShell:

```bash
git init
git add .
git commit -m "Initial commit: Haxovelo NFS Heat YouTube Car Hub"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

---

## 🛡️ Creator Credentials
- **Default Creator Passkey**: `heat400`
- To change it: Edit `ADMIN_PIN` in `src/app/services/community.service.ts`.
