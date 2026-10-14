# SE2020 MERN Item Manager - Practice Project

මෙය Lab Test එකට කලින් පුහුණු වීමට හදපු sample project එකක්. Lecturer දෙන actual project එකට මෙය සමාන විය හැකි නමුත් එකම project එක බවට සහතිකයක් නැහැ.

## අවශ්‍ය දේ
- Node.js සහ npm
- MongoDB Atlas account (database save කිරීම සඳහා)
- VS Code

## Folder structure
- `backend/` - Express API සහ MongoDB connection
- `frontend/` - React website

## 1. Backend සකස් කිරීම
VS Code එකෙන් `backend` folder එක open කරලා terminal එකක:

```bash
npm install
```

`backend/.env.example` file එක copy කරලා `.env` නමින් save කරන්න. `.env` file එක ඇතුළේ `MONGODB_URI` value එකට ඔයාගේ MongoDB Atlas connection string එක දාන්න.

```env
PORT=5000
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@YOUR-CLUSTER.mongodb.net/se2020_items?retryWrites=true&w=majority
```

`USERNAME`, `PASSWORD`, `YOUR-CLUSTER` වෙනුවට Atlas එකෙන් ලැබෙන නිවැරදි values දාන්න. සැබෑ password එක GitHub එකට upload කරන්න එපා.

Backend run කරන්න:

```bash
npm run dev
```

Terminal එකේ `API server running on port 5000` සහ database connected message එකක් පෙනිය යුතුයි. MongoDB URI එක සකස් කර නැත්නම් backend එක database error එකක් දක්වයි.

## 2. Frontend සකස් කිරීම
අලුත් terminal එකක් open කරලා `frontend` folder එකට යන්න:

```bash
npm install
npm run dev
```

Browser එකේ terminal එක පෙන්වන address එක open කරන්න (සාමාන්‍යයෙන් http://localhost:5173).

## 3. Item එකක් පරීක්ෂා කිරීම
- Item name එක දාන්න.
- Category එක දාන්න.
- Price එක දාන්න.
- Add Item ඔබන්න.
- Edit මගින් item එක වෙනස් කරන්න.
- Delete මගින් item එක ඉවත් කරන්න.

## Troubleshooting
- `npm` හඳුනාගන්නේ නැත්නම් terminal එක close/open කරලා බලන්න.
- Port එක භාවිතයේ නම් error message එක බලන්න.
- MongoDB connection error නම් Atlas URI, database user/password, Network Access settings පරීක්ෂා කරන්න.
- MongoDB URI එක හෝ password එක කාටවත් share කරන්න එපා.
- Backend run command එක `npm run dev`; project එකේ `package.json` scripts වෙනස් නම් ඒවා බලන්න.

## Lab Test practice checklist
- [ ] Project folders හඳුනාගන්න
- [ ] `npm install` run කරන්න
- [ ] Frontend සහ backend වෙන වෙනම run කරන්න
- [ ] New field එකක් form එකට, API/model එකට එකතු කරන්න
- [ ] MongoDB Atlas connection සකස් කරන්න
- [ ] GitHub public repository එකකට upload කරන්න (`.env` upload නොකරන්න)
- [ ] Deployment පසු frontend API URL එක update කරන්න
